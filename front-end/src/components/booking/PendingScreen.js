import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';


const PendingScreen = (props) => {

    return (
        <div>
            <p>Thank you!</p>
            <p>Your payment is being processed, confirmation email will be sent to {props.email} as soon as your transaction status changes</p>
        </div>
    );

}

export default PendingScreen