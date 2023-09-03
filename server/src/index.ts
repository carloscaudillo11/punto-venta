import app from "./app";
import config from "./config";
import connectDB from "./database";

connectDB();
app.listen(config.ENV.PORT);
console.log(`Listening on port http://localhost:${config.ENV.PORT}`);
