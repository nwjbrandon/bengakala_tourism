import _ from 'lodash';
import sendEmail from '../../emailSender/emailSender'

const send = [
    async (req, res) => {
        const emailData = req.body;
        await sendEmail(emailData);
        res.json({
            data: 'success',
        });
    }
];
export default {
    send: send
};
