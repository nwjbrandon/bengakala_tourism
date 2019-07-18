import React from 'react'

const Button = (props) => {

    const [fade, setFade] = React.useState(false);

    const onMouseEnter = () => {
        setFade(true);
    };

    const onMouseLeave = () => {
        setFade(false);
    };

    const fadeStyle = !fade ? {
        background: "#EF5350",
        color: "#212121"
    } : {
            background: "#FFFFFF",
            color: "#000000"
        };

    const fadeStyleT = !fade ? {
        color: "#FFFFFF"
    } : {
            color: "#000000"
        };
    return (

        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                margin: 10,
                width: "40vh",
                height: 'auto',
                boxShadow: "3px 3px 5px grey",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: "center",
                ...fadeStyle
            }}
        >

            <h3 style={{ fontFamily: "Montserrat, sans-serif", ...fadeStyleT, marginTop: 'auto', marginBottom: 'auto' }}>Explore Our Homes</h3>
            {/*<div style={{
                borderRadius: "10px",
                background: "#21212190",
                
                padding: "10%"
            }}
            >
                
        </div>*/}
        </div >

    );
}

export default Button;