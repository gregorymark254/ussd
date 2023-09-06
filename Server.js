const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Africastalking = require('africastalking');

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/" , (req,res) => {
    res.json("Africas talking API")
})

// Set up Africastalking
const africastalking = Africastalking({
    apiKey: '76de3d0bea7052101bf97e8bfac823d93780f80308b8f8b4be09be63271d9966',
    username: 'sandbox'
});

app.post('/', (req, res) => {
    // Read the variables sent via POST from our API
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. My account
        2. My phone number`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Choose account information you want to view
        1. Account number`;
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Your phone number is ${phoneNumber}`;
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END Your account number is ${accountNumber}`;
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response)
});


// Define the callback URL handler function
const callbackHandler = (req, res) => {
    // Handle the callback data
    const callbackData = req.body;
    console.log(callbackData);

    res.send('OK');
}

// Set up the callback URL endpoint
app.post('/', callbackHandler);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
