//This is a Node.js backend code using the Express.js framework.
const cors = require("cors");
const express= require("express");
const app = express();


const userRoutes = require("../dummy/routes/User");
const contactRoutes = require("../dummy/routes/Contact");
const paymentRoutes=require("../dummy/routes/Payment")

const database = require("../dummy/config/database");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;


database.dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(
    cors({
        origin:["http://localhost:5175","https://new-repo-front.vercel.app"],
        credentials:true
    })
)

//To overcome this restriction, CORS allows servers to specify which origins are allowed to make requests to their resources. This is done by including specific headers in the server's response.
//CORS is a security feature implemented in web browsers to prevent web pages from making requests to a different origin (domain, protocol, or port) than the one the web page was loaded from. This is a security restriction to prevent malicious scripts from making unauthorized requests on behalf of the user.


app.use("/api/v1/auth",userRoutes);
app.use("/api/v1",contactRoutes);
app.use("/api/v1",paymentRoutes);



app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running"
    });
});


app.listen(PORT,()=>{
    console.log("App is running at port 4000")
})

//A cookie parser is a middleware function that parses cookies sent in the request headers and makes them available as an object in the request object.

//JSON: javascript object notation
//Node.js is not a framework, but rather a runtime environment that allows developers to execute JavaScript code on the server-side.







