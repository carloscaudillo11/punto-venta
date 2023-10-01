import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import ordersRouter from "./routes/orders.routes";
import productsRouter from "./routes/products.routes";
import providersRoutes from "./routes/providers.routes";
import reportsRoutes from "./routes/reports.routes";
import menuRoutes from "./routes/menu.routes";
import providerOrdersRoutes from "./routes/providerOrders.routes";
import transactionRoutes from "./routes/transactions.routes";
import { Express } from "express";

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(authRoutes);
app.use(menuRoutes);
app.use(productsRouter);
app.use(providersRoutes);
app.use(providerOrdersRoutes);
app.use(ordersRouter);
app.use(reportsRoutes);
app.use(transactionRoutes);

export default app;
