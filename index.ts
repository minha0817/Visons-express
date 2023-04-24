import express from "express";
import cors from "cors";
import mysql from "mysql";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "VisonZ_Practice",
});

app.get("/", (req,res) => {
    res.send("helllo")
})

app.get("/api/:date", (req, res) => {
    const date = req.params.date;
    console.log('date', date);
    //format을 써준 이유는????
    const sql = mysql.format(`SELECT habit FROM habitlist WHERE date = ${date}`, [])
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log(`get ${date} results`, results)

        const habitList: any = [];
        results.map((result: any) => {
            habitList.push(result.habit)
        })
        console.log('habitList', habitList);
        res.send(habitList);
    })
})

app.get("/api", (req, res, next) => {

    const sql = mysql.format("SELECT * FROM habitlist", [])
    console.log('its working11');
    connection.query(sql, (err, results) => {
        console.log('its working22');
        if(err) throw err;
        res.send(results);
        // connection.end(); 얘가 있으면 Cannot enqueue Quit after invoking quit. 이런 에러가 남
    })

});

app.post("/api", (req, res) => {
    const date = req.body.clickedDate;
    const habit = req.body.input;
    console.log('date', date);
    console.log('habit', habit);

    const values = [[habit, date]];
    const sql = mysql.format("INSERT INTO habitlist (habit, date) VALUES ?", [values]);

    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log('post results', results);
        // connection.end();
    } )

    res.end();
});

const port = +(process.env.PORT || 8443);

app.listen(port, () => {
  console.log(`Express Server started on port ${port}`);
});

// connection.query(sql, (err, results) => {
//   if (err) throw err;
//   console.log('out results', results);
//   results.forEach((result: any) => {
//     console.log("in results", results);
//   });

//   connection.end();
// });
