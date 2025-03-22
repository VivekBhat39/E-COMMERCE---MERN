let mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    mobile: { type: String },
    password: { type: String },
    address: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    }
});


// Create Model
const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;



// {
  
//     "firstName": "vicky",
//     "lastName": "Bhat",
//     "email": "vky@gmail.com",
//     "mobile": "12313",
//     "password": "vky@gmail.com",
//     "address": {
//             "companyName": "iGAP",
//             "address": "Kalamba",
//             "city": "Kop",
//             "state": "MH",
//             "zip": 416007
//         }
    
//     }