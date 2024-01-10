/*const mongoose=require("mongoose");

//creating a database
mongoose.connect('mongodb://127.0.0.1:27017/photography',).then(()=>{
    console.log('connection successful');
}).catch((error)=>{
    console.log(error);
})*/

const mongoose=require("mongoose");
const DB='mongodb+srv://bhanjasrijoyee2003:j0yee@cluster1.8ew2vo6.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((error)=>{
    console.log(`no connection`);
})