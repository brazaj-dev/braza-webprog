import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // Validate required fields
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !firstName.trim()) {
      return res.status(400).json({ message: "First name is required" });
    }
    if (!lastName || !lastName.trim()) {
      return res.status(400).json({ message: "Last name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!username || !username.trim()) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res.status(400).json({ message: `${field} already exists` });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password (set type to viewer by default for signups)
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      type: req.body.type || "viewer", // Default to viewer for normal signups
    });

    console.log(`✅ User created successfully: ${user.email}`);

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // Check if the password is being updated
    if (req.body.password) {
      // Hash the new password
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update the user with the new data
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    console.log(`✅ User updated successfully: ${user.email}`);

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(`✅ User deleted successfully: ${user.email}`);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, username, identifier } = req.body;
    const loginValue = identifier?.trim() || email?.trim() || username?.trim();

    if (!loginValue) {
      return res.status(400).json({ message: "Email or username is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: loginValue }, { username: loginValue }],
    });

    if (!user) {
      console.warn(`❌ Login failed: User not found for ${loginValue}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is active
    if (!user.isActive) {
      console.warn(`❌ Login failed: User inactive ${user.email}`);
      return res
        .status(403)
        .json({ message: "Your account is inactive. Please contact support." });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn(`❌ Login failed: Invalid password for ${user.email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token - works for admin and viewer
    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    console.log(`✅ Login successful: ${user.email}`);

    res.json({
      message: "Login successful",
      token,
      type: user.type,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export { getUsers, createUser, updateUser, deleteUser, loginUser };
