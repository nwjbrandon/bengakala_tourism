import React from 'react';
import Button from './Button'

const Buttons = (props) => {


    return (
        <div
            style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Button />
            <Button />

        </div>
    );
}

export default Buttons;