// Middleware to validate JWT and attach user id to the request
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    // Store the user id on the request for later handlers
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
