import dotenv from "dotenv";

dotenv.config();

export default {
  ENV: {
    PORT: process.env.PORT || 3000,
    MONGODB_URI:
      process.env.MONGODB_URI || "mongodb://localhost:27017/punto-venta",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    CLOUD_NAME: process.env.CLOUD_NAME || "djnryx9yh",
    API_KEY: process.env.API_KEY || "611152753948721",
    API_SECRET: process.env.API_SECRET || "aYv7WX9nesakm0uO-S9iDn9epEw",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "77734827",
  },
};
