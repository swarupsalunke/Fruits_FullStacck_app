const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '181823',
    database: 'fruits'
})

db.connect((err) => {

    if (err) {
        console.log("database connection problem🔥")
        return
    }


    console.log("database has been successfully connected 🛺")

})




app.get('/', (req, res) => {

    db.query(`select * from fruits_details`, (err, result) => {

        if (err) return res.status(400).json({ message: err })


        res.status(200).json(result)
    })

})


app.get('/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM fruits_details WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(400).json({ message: err });
    
    if (result.length === 0) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(result[0]); 
  });
});

app.post('/', (req, res) => {

    const { name, pic, price } = req.body

   db.query(
  "INSERT INTO fruits_details (name, pic, price) VALUES (?, ?, ?)",
  [name, pic, price],
  (err, result) => {
    if (err) return res.status(400).json({ message: err });

    res.status(201).json({ message: "added" });
  }
);

})


app.put('/:id', (req, res) => {
    const { name, pic, price } = req.body
    const { id } = req.params

    const sql = `
      UPDATE fruits_details 
      SET name = ?, pic = ?, price = ?
      WHERE id = ?
    `;

    db.query(sql, [name, pic, price, id], (err, result) => {
        if (err) return res.status(400).json({ message: err })

        res.status(200).json({ message: "updated successfully 🔥" })
    });
});



app.delete('/:id',(req,res)=>{
    const {id} = req.params

    db.query(`delete from fruits_details where id = ${id}`,(err,result)=>{
        if (err) return res.status(400).json({ message: err })

            res.status(200).json({message:"record deleted succeessfully 😐"})
    })
})





app.listen(port, () => {
    console.log(`we are running at ${port}`)
})