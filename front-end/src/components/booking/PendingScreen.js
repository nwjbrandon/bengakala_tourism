import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';


const PendingScreen = (props) => {

    return (
        <div>
            <h3 style={{ color: "white", fontSize: "2em" }}>Thank you for choosing us !</h3>
            <h4 style={{ color: "white", fontSize: "1.5em" }}>Your payment is being processed, confirmation email will be sent to {props.email} as soon as your transaction status changes</h4>
        </div>
    );

}

export default PendingScreen