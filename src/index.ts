import express from "express";

import testController from "./controller/testController";

const app = express();
app.listen(8000, ()=>{
    console.log("server start")
})

app.use("/test", testController)