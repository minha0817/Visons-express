import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res, next) => {
    
    res.send(fs.readFileSync("./data.json", "utf8"));

});

app.post("/api", (req, res) => {
    const date = req.body.clickedDate;
    const habit = req.body.input;

    const data = fs.readFileSync("./data.json", "utf8");
    const dataObj = JSON.parse(data);

    if (dataObj[date]) {
    dataObj[date].push(habit);
    } else {
    dataObj[date] = [habit];
    }

    fs.writeFileSync("./data.json", JSON.stringify(dataObj, null, 2), 'utf8')

    console.log("dataObj:", dataObj);
    res.end();
});

const port = +(process.env.PORT || 8443);
app.listen(port, () => {
    console.log(`Express Server started on port ${port}`);
});
