import express from "express";
import cors from "cors";
import fs from "fs";
import mysql from "mysql";
import { faker } from "@faker-js/faker";
import dotenv from 'dotenv'
dotenv.config()

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// app.get("/api", (req, res, next) => {

//     res.send(fs.readFileSync("./data.json", "utf8"));

// });

// app.post("/api", (req, res) => {
//     const date = req.body.clickedDate;
//     const habit = req.body.input;

//     const data = fs.readFileSync("./data.json", "utf8");
//     const dataObj = JSON.parse(data);

//     if (dataObj[date]) {
//     dataObj[date].push(habit);
//     } else {
//     dataObj[date] = [habit];
//     }

//     fs.writeFileSync("./data.json", JSON.stringify(dataObj, null, 2), 'utf8')

//     console.log("dataObj:", dataObj);
//     res.end();
// });

// const port = +(process.env.PORT || 8443);
// app.listen(port, () => {
//     console.log(`Express Server started on port ${port}`);
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "VisonZ_Practice",
});

// const sql = mysql.format("SELECT * FROM user", []);

const values = [];
for (let i = 0; i < 50; i++) {
  values.push([
    faker.address.streetAddress(),
    faker.address.city(),
    faker.address.country(),
    i+1
  ]);
}

const sql = mysql.format(
  "INSERT INTO user_address (street_address, city, country, user_id) VALUES ?",
  [values]
);

console.log('result of sql', sql);

connection.query(sql, (err, results) => {
  if (err) throw err;
    console.log('results', results);
//   results.forEach((result: any) => {
//     console.log("result.username", result.username);
//   });

  connection.end();
});
