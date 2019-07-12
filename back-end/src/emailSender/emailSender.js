const Email = require('email-templates');
const path = require('path');

import { USEREMAIL, USERPASS } from '../../src/secret/emailSecret'

export default async function main(emailContent) {


    const email = await new Email({
        juice: true,
        juiceResources: {
            preserveImportant: true,
            webResources: {
                relativeTo: path.join(__dirname, 'build')
            }
        },
        message: {
            from: USEREMAIL
        },
        send: true,
        transport: {
            service: 'gmail',
            auth: {
                user: USEREMAIL,
                pass: USERPASS
            }
        },
        preview: false
        // htmlToText: false 
    });


    await email
        .send({
            template: path.join(__dirname, 'emails', 'template'),
            message: {
                to: emailContent.toEmail
            },
            locals: {
                ...emailContent
            }
        })
        .then(res => {
            console.log("RESPONDE", res)
        })
        .catch((err) => {
            console.log("Error BRO", err)
        });

}


// main(
//     {
//         toEmail: "paulroopson.pradeep@gmail.com",
//         grossAmount: 100,
//         personalDetails: {
//             firstName: "NAmaswi",
//             lastName: "Avlani",
//             email: "paulroopson.pradeep@gmail.com",
//             country: "Singapore",
//         },
//         tripDetails: {
//             checkIn: "tmro",
//             checkOut: "dayafter",
//             breakfast: false,
//             lunch: false,
//             dinner: false,
//             numberMales: 0,
//             numberFemales: 0,
//             numberVans: 0,
//             numberCars: 0,
//             numberBikes: 0
//         },
//         grossAmount: 100,
//         cost: {
//             accomodation: 100000,
//             van: 50000,
//             car: 50000,
//             bike: 50000,
//             breakfast: 20000,
//             lunch: 20000,
//             dinner: 20000
//         },
//         price: {
//             accommodation: 100000,
//             van: 50000,
//             car: 50000,
//             bike: 50000,
//             breakfast: 20000,
//             lunch: 20000,
//             dinner: 20000
//         },
//     }
// );
