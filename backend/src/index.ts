import express from "express"


const app = express();

app.use(express.json());

app.listen(6969,()=>{
    console.log("Running");
});