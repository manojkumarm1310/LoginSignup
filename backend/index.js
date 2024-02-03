import Express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors"; 
import dotenv from "dotenv";

dotenv.config();
const app=Express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:  true}));
app.use(Express.json());


const urlmysql=`mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
const db = mysql.createConnection(urlmysql);
console.log(process.env.MYSQLDATABASE);
console.log(process.env.MYSQLUSER);
console.log(process.env.MYSQLHOST);
console.log(process.env.MYSQLPASSWORD);
console.log(process.env.MYSQLPORT);
const PORT=process.env.PORT;
// host:"localhost",
// user:"root",
// password:"",
// database:"signup"
// const mysqlconnect="mysql://root:516Ae5D5D3dhE26H5DDD3A-HH3163aG6@roundhouse.proxy.rlwy.net:31992/railway";
// const db=mysql.createConnection(mysqlconnect);

db.connect((err)=>
{
    if(!err)
    {
        console.log("Database is connected");
    }
    else 
    {
        console.log(err);
    }
})

db.ping((err) => {
    if (err) {
      console.log('Connection is not alive');
    } else {
      console.log('Connection is alive');
    }
  });

const currentLoginprofile={
    email:"",
    password:""
}
app.post("/signup",(req,res)=>
{
    console.log("connected");
    const sql="INSERT INTO signup(`name`,`email`,`password`,`confirmpassword`,`age`,`gender`,`DOB`,`MobileNumber`) VALUES (?)";
    const val=[req.body.name,req.body.email,req.body.password,req.body.confirmpassword,0,"-","-","-"];
   
    db.query(sql,[val],(err,data)=>
    {
        
        if(err)
        {
            console.log("Signup-post: "+err);
            return res.json(err);
        
        }
        return res.json(data);
    })
})

app.get("/signup",(req,res)=>
{
    const sql="SELECT email FROM signup";
    db.query(sql,[req.body.email],(err,data)=>
    {
        if(err)
        {
            console.log("Signup-get: "+err);
            return res.status(500).json({Error:err})
        }
        return res.send(data);
    })
})
app.post("/login",(req,res)=>
{
    const sql="SELECT * FROM signup WHERE `email`=? AND `password`=?";
    currentLoginprofile.email=req.body.email;
    currentLoginprofile.password=req.body.password;
    db.query(sql,[req.body.email,req.body.password],(err,data)=>
    {
        if(err) {
            console.log("Login-post: "+err);
            return res.json({Error:err});
            }
            if(data.length > 0) {
            return res.status(200).json({status:"Success"});
            } else {
            return res.status(200).json({status:"Failed"});
            }
    })
})
app.post("/profile",(req,res)=>
{
    const sql="UPDATE signup SET `age`=?, `gender`=?,`DOB`=? ,`MobileNumber`=? WHERE `email`=? AND `password`=?";
    const values=[req.body.age,req.body.gender,req.body.DOB,req.body.MobileNumber,currentLoginprofile.email,currentLoginprofile.password];
    db.query(sql,values,(err,data)=>
    {
        if(err)
        {
            console.log("Profile-post: "+err);
            return res.status(500).json({Error:err});
        }
        return res.status(200).json(data);
    })
})
app.post("/changepassword",(req,res)=>
{
    const sql="UPDATE signup SET `password`=?,`confirmpassword`=? WHERE `email`=?";
    const values=[req.body.password,req.body.confirmpassword,req.body.email];
    db.query(sql,values,(err,data)=>
    {
        if(err)
        {
            console.log("changepassword-post: "+err)
            return res.status(500).json({Error:err});
        }
        return res.status(200).json(data);
    })

})
app.get("/changepassword",(req,res)=>
{
    const sql="SELECT email FROM signup";
    db.query(sql,[req.body.email],(err,data)=>
    {
        if(err)
        {
            console.log("changepassword-get: "+err);
            return res.status(500).json({Error:err})
        }
        return res.send(data);
    })
})
app.get("/login",(req,res)=>
{
    const sql="SELECT email FROM signup";
    db.query(sql,[req.body.email],(err,data)=>
    {
        if(err)
        {
            console.log("login-get: "+err);
            return res.status(500).json({Error:err})
        }
        return res.send(data);
    })
})


app.listen(PORT,()=>
{
    console.log(`server is connected with localhost:/${PORT}`)
})