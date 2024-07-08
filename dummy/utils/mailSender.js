const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email,title,body)=>{
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:"Shopping store",
            to:`${email}`,
            subject:`${title}`,

            html:`${body}`

        })
        console.log(info);
        return info;

    }
    catch(error){
        console.log(error.message);

    }
}

module.exports = mailSender;
//This is a Node.js function called mailSender that sends an email using the Nodemailer library.
//dotenv is a library that loads environment variables from a .env file. In this case, it's used to load email credentials from the environment variables.