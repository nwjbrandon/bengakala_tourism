import React from 'react'

const ImageItem = (props) => {

    return (
        <div
            style={{
                backgroundImage: `url(${props.imgUrl})`,
                maxHeight: "100%",
                maxWidth: "100%",
                height: 500,
                borderRadius: 10,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
            }}
        >
            <div
                style={{
                    background: "#21212190",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    textAlign: "center"
                }}
            ><h3
                style={{
                    color: "white",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}
            >{props.title}</h3>
            </div>
        </div >
    );
}

export default ImageItem;