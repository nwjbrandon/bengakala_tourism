import React from 'react'
import color from '@material-ui/core/colors/deepOrange';

const ImageItem = (props) => {

    return (
        <div
            style={{
                backgroundImage: `url(${props.src})`,
                maxHeight: "100%",
                maxWidth: "100%",
                height: 300,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
            }}
        >
            <div style={{
                height: "100%",
                width: "100%",
                background: "#21212190",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: "10%"
            }}
            >
                <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "white", }}>{props.date}</h3>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "3em", marginTop: 0, color: "white" }}>{props.title}</h3>
            </div>
        </div >
    );
}

export default ImageItem;