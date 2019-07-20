import React from 'react'

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
                width: "80%",
                background: "#21212190",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: "10%"
            }}
            >
                <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "white", marginTop: 0, }}>{props.date}</h3>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 30, marginTop: 0, color: "white" }}>{props.title}</h3>
            </div>
        </div >
    );
}

export default ImageItem;