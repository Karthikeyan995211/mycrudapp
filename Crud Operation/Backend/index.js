const express=require('express')
const moment =require('moment')
const mysql = require('mysql')
const cors=require('cors')
const bodyparser=require('body-parser')
//const fileupload=require('express-fileupload')
const port = 8080

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
//app.use(fileupload())

/*app.get('/', (req, res)=>{
    res.send('Hello Worldddd')
})*/


const db = mysql.createConnection({
 
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "emp",
 
})
db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  app.get("/users", (req, res) => {
    const sqlGet = "SELECT * FROM student";
    db.query(sqlGet, (error, result)=>{
      
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send(result);
      }
    });
  });


  app.post("/users", (req, res) => {
     
    
    const {firstName, lastName, location, email, dob, education, about}=req.body
    const sqlInsert = "INSERT INTO student (FirstName, LastName, Location, Email, DOB, Education, About) VALUES (?,?,?,?,?,?, ?)";
    
    db.query(sqlInsert, [firstName, lastName, location, email, dob, education, about], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    });
  });

  app.delete("/remove/:id", (req, res) => {
    const {id}=req.params;
    const sqlRemove = "DELETE FROM student WHERE ID = ?";
    db.query(sqlRemove, id, (error, result) => {
      if (error) {
        console.log(error);
      }else {
        res.send(result);
      }
    });
  });

  app.put("/users/:id", (req, res) => {
    const {id}=req.params;
    const {firstName, lastName, location, email, dob, education, about}=req.body
    const sqlUpdate = "UPDATE student SET FirstName = ?, LastName = ?, Location = ?, Email = ?, DOB = ?, Education = ?, About = ? WHERE id = ?";
    db.query(sqlUpdate, [firstName, lastName, location, email, dob, education, about, id], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    });
  });

 

app.listen(port,()=>{
    console.log(`App Running in the ${port}`)
})