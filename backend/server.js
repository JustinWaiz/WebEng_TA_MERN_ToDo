// Entry point that initializes the database connection and starts the HTTP server
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start listening once the connection succeeds
mongoose
  .connect(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    // Abort the process if the database connection fails
    console.error("Mongo connection error", err);
    process.exit(1);
  });
