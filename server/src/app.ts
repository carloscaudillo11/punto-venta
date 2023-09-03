import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes";
import ordersRouter from "./routes/orders.routes";
import productsRouter from "./routes/products.routes";
import providersRoutes from "./routes/providers.routes";
import billsRoutes from "./routes/bills.routes";
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

app.use(AuthRoutes);
app.use(productsRouter);
app.use(providersRoutes);
app.use(ordersRouter);
app.use(billsRoutes);

export default app;
