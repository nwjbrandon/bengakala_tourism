import React from 'react'
import left from '../../../assets/img/arrow-left.png';

import right from '../../../assets/img/arrow-right.png';

const chevron = (props) => {

    return (
        <React.Fragment>
            {
                props.direction === "right" ?
                    <img style={{ height: 50, width: 50 }} src={left} alt="LEFT" />
                    :
                    <img style={{ height: 50, width: 50 }} src={right} alt="RIGHT" />

            }
        </React.Fragment>
    );
}

export default chevron;