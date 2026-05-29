import jwt from "jsonwebtoken";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.type !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
};

export { verifyToken, verifyAdmin };
