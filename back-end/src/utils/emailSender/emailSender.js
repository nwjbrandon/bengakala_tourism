import path from 'path';
import Email from 'email-templates';
import { USEREMAIL, USERPASS } from '../../secret/emailSecret'


//Sends Email to customer
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
            console.log("Response", res)
        })
        .catch((err) => {
            console.log("Error", err)
        });
}