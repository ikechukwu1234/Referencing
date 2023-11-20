import express, { Application } from "express";
import "./Db/db";
import { mainApp } from "./mainApp";

const port: number = 5500;

const app: Application = express();
mainApp(app);

app.set("view engine", "ejs")

const server = app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

process.on("uncaughtException", (error: Error) => {
  console.log("stop here: uncaughtException");
  console.log(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("stop here: unhandledRejection");
  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});
// const LocalUrl = "mongodb://0.0.0.0:27017/workingonreference";

// const app = express();
// app.use(express.json());
// app.use("/api/v1", userRoute)
// mongoose.connect(LocalUrl)
// .then(() => {
//     console.log("connected to database");
// })
// .catch(() => {
//     console.error("could not connect");
// });

// app.listen(port, () =>{
//     console.log("i am listening from", port)
// })
