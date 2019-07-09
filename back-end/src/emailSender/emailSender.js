import nodemailer from 'nodemailer';

export default async function main(emailContent) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bengkalaproject2019@gmail.com',
            pass: 'Bengkala2019'
        }
    });

    const emailBody = emailContent.bodyText + JSON.stringify(emailContent.personalDetails) + JSON.stringify(emailContent.tripDetails);


    const mailOptions = {
        from: 'bengkalaproject2019@gmail.com',
        to: emailContent.toEmail,
        subject: emailContent.subject,
        text: emailBody,
    };

    await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

}