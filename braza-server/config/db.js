import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/braza";

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);

    // If the failure appears to be an SRV/DNS lookup refusal, try forcing a public DNS resolver
    // and retry once. This helps on networks whose DNS blocks SRV queries.
    const isSrvError = /querySrv|ENODATA|EAI_AGAIN|ECONNREFUSED/.test(
      error.message || "",
    );
    if (isSrvError && mongoUri.startsWith("mongodb+srv://")) {
      try {
        console.warn("SRV lookup failed — retrying using Google DNS (8.8.8.8)");
        // Use Google DNS for subsequent lookups in this process
        dns.setServers(["8.8.8.8"]);
        const retryConn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 5000,
        });
        console.log(
          `MongoDB Connected after DNS retry: ${retryConn.connection.host}`,
        );
        return;
      } catch (retryErr) {
        console.error(`Retry with Google DNS failed: ${retryErr.message}`);
      }

      // If the simple DNS server switch didn't work, try a DNS-over-HTTPS SRV lookup
      // and build a non-SRV connection string from the returned targets.
      try {
        console.warn(
          "Attempting DNS-over-HTTPS SRV lookup to build standard URI...",
        );
        // Extract authority and DB info from the mongodb+srv URI
        const match = mongoUri.match(
          /^mongodb\+srv:\/\/([^/]+)\/?([^?]*)\??(.*)$/,
        );
        if (match) {
          const authority = match[1]; 
          const dbName = match[2] || "";
          const query = match[3] ? `?${match[3]}` : "";
          const atIndex = authority.lastIndexOf("@");
          const authPart = atIndex > -1 ? authority.slice(0, atIndex) : "";
          const hostPart =
            atIndex > -1 ? authority.slice(atIndex + 1) : authority;

          const dohUrl = `https://dns.google/resolve?name=_mongodb._tcp.${hostPart}&type=SRV`;
          const res = await fetch(dohUrl);
          if (res.ok) {
            const data = await res.json();
            const answers = data.Answer || data.answer || [];
            const hosts = answers
              .map((a) => {
                const parts = a.data.split(" ");
                const port = parts[2];
                const target = parts[3];
                return `${target.replace(/\.$/, "")}:${port}`;
              })
              .filter(Boolean);

            if (hosts.length) {
              const authPrefix = authPart ? `${authPart}@` : "";
              const standardUri = `mongodb://${authPrefix}${hosts.join(",")}/${dbName}${query}`;
              try {
                console.warn(
                  `Trying standard URI built from DOH: ${standardUri.replace(/:.+@/, ":REDACTED@")}`,
                );
                const dohConn = await mongoose.connect(standardUri, {
                  serverSelectionTimeoutMS: 5000,
                });
                console.log(
                  `MongoDB Connected with DOH-built URI: ${dohConn.connection.host}`,
                );
                return;
              } catch (dohErr) {
                console.error(
                  `Connection with DOH-built URI failed: ${dohErr.message}`,
                );
              }
            }
          }
        }
      } catch (dohError) {
        console.error(`DOH SRV lookup attempt failed: ${dohError.message}`);
      }
    }
  }

  // Only try in-memory fallback in development (package is a devDependency)
  if (process.env.NODE_ENV !== "production") {
    try {
      console.warn("Falling back to in-memory MongoDB for development.");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      const conn = await mongoose.connect(mongoServer.getUri());
      console.log(`MongoDB Connected (in-memory): ${conn.connection.host}`);
      return;
    } catch (memoryError) {
      console.error(`In-memory MongoDB startup failed: ${memoryError.message}`);
    }
  }

  throw new Error(
    "Failed to connect to MongoDB. Please check your MONGO_URI environment variable.",
  );
};

export default connectDB;
