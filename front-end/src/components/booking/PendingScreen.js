import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';


const PendingScreen = (props) => {

    return (
        <div>
            <p>Thank you!</p>
            <p>Your payment is still being processed, confirmation emails will be sent to {props.email} as your transaction status changes</p>
        </div>
    );

}

export default PendingScreen