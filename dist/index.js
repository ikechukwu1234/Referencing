"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./Db/db");
const mainApp_1 = require("./mainApp");
const port = 5500;
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
app.set("view engine", "ejs");
const server = app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
process.on("uncaughtException", (error) => {
    console.log("stop here: uncaughtException");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
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
