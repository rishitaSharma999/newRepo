const crypto=require('crypto')
const axios = require('axios');
// const { passwordUpdated } = require("../mail/templates/passwordUpdate")
//const Profile = require("../models/Profile")
require("dotenv").config()

// Signup Controller for Registering USers

exports.paymentController1 = async (req, res) => {
    try {

        let merchantTransactionId = req.body.transactionId

        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:4000/api/v1/status?id=${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: req.body.phone,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        }


        const payload = JSON.stringify(data)
        const payloadMain = Buffer.from(payload).toString('base64')
        const keyIndex = 1
        const string = payloadMain + '/pg/v1/pay' + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;


        // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const prod_URL = " https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        }

        let response= await axios(options)
        .then(function (response) {

            console.log(response.data)
            return res.json(response.data)

        }).catch(function (error) {
            console.log(error)
        })




    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Login controller for authenticating users
exports.paymentController2 = async (req, res) => {
  
    const merchantTransactionId = req.query.id
    const merchantId = process.env.MERCHANT_ID


    const keyIndex = 1
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + process.env.SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;


    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    }


    axios.request(options)
    .then(function (response) {
        if (response.data.success === true) {
            //const url = 'http://localhost:5175/success'
            //return res.redirect(url)
           // return res.json({ message: 'Payment successful' });
           res.redirect('http://localhost:5175/success');
        } else {
            //const url = 'http://localhost:5175/fail'
            //return res.redirect(url)
            //return res.json({ message: 'Payment failed' });
            res.redirect('http://localhost:5175/fail');
        }

    }).catch(function (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    })

  
}