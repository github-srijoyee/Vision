const express=require("express");
const path=require("path");
const hbs=require("hbs");
require("./db/conn");
const User=require("./models/usermessage")
const app=express();
const port=process.env.PORT||8001;
const nodemailer = require("nodemailer");

//setting the path
const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialpath=path.join(__dirname,"../templates/partials");

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'outlook', etc.
    auth: {
        user: 'vision8356038@gmail.com',
        pass: 'lbah lcbp qbba ozki'
    }
});
//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
//app.get(path,callback)
app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/contact",async(req,res)=>{
try{
//res.send(req.body);
const userData=new User(req.body);
await userData.save();
      // Sending Email
      const mailOptions = {
        from: 'vision8356038@gmail.com',
        to: req.body.email, // Assuming email is in the request body
        subject: 'Welcome to Vision!',
        text: `Hello, ${req.body.name}! Thank you for joining our platform. Best wishes from team Vision.` // Assuming there's a 'name' field in the request body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

res.status(201).render("index");
}catch(error){
    res.status(500).send(error);
}
})
//server create
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})