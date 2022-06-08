import bodyParser from "body-parser";
import express from "express";
import testController from "./controller/testController";

const port = 8000;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log("server start");
})

app.use("/test", testController);