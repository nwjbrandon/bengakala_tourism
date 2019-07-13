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
                    borderBottomRightRadius: 10
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