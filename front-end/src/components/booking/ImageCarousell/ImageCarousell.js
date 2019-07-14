import React from 'react';

import ItemsCarousel from 'react-items-carousel';

import API from '../../../api';
import Chevron from './chevrons';
import ImageItem from './ImageItem'

const ImageCarousell = (props) => {

    const children = props.data.map(i => <ImageItem {...i} />)

    const changeActiveItem = (activeItemIndex) => setActiveItemIndex(activeItemIndex);

    const [activeItemIndex, setActiveItemIndex] = React.useState(0);

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
        setWindowWidth(window.innerWidth);
    }, []);


    const numofCards = windowWidth > 1100 ? 4 : (windowWidth > 800 ? 3 : (windowWidth > 600 ? 2 : 1));



    return (
        <div style={{ margin: 10, paddingLeft: "2%", paddingRight: "2%", paddingBottom: "2%" }}>
            <h3 style={{ fontSize: '2em' }}>Explore Our Homes!</h3>

            <ItemsCarousel
                // Placeholder configurations
                enablePlaceholder
                numberOfPlaceholderItems={5}
                minimumPlaceholderTime={1000}
                placeholderItem={<div style={{ height: 300, background: '#900' }}>Placeholder</div>}

                numberOfCards={numofCards}
                gutter={12}
                showSlither={true}
                firstAndLastGutter={true}
                freeScrolling={false}

                requestToChangeActive={changeActiveItem}
                activeItemIndex={activeItemIndex}
                activePosition={'center'}

                chevronWidth={24}
                rightChevron={[
                    (<Chevron direction="left" />),

                ]}
                leftChevron={[(<Chevron direction="right" />)]}
                outsideChevron={false}
            >
                {children}
            </ItemsCarousel>

        </div>

    );
}

export default ImageCarousell;