import React from 'react';

import ItemsCarousel from 'react-items-carousel';

import API from '../../../api';
import Chevron from './chevrons';
import ImageItem from './ImageItem'

const ImageCarousell = (props) => {

    const [attractions, setAttractions] = React.useState([]);

    const children = attractions.map(i => <ImageItem {...i} />)

    const changeActiveItem = (activeItemIndex) => setActiveItemIndex(activeItemIndex);

    const [activeItemIndex, setActiveItemIndex] = React.useState(0);

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
        setWindowWidth(window.innerWidth);
    }, []);


    React.useEffect(() => {
        const fetchData = async () => {
            const result = await API.get('/home/info');
            console.log(result.data)


            setAttractions([...result.data.stories]);

        };

        fetchData();
    }, []);



    const numofCards = windowWidth > 1100 ? 3 : (windowWidth > 800 ? 2 : (windowWidth > 600 ? 1 : 1));



    return (
        <div style={{ margin: 10, paddingLeft: "2%", paddingRight: "2%", paddingBottom: "2%" }}>
            <h3 style={{ fontSize: '2em' }}>Our Attractions</h3>

            {children.length !== 0 ?
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


                :

                <div>No data to display</div>


            }


        </div >

    );
}

export default ImageCarousell;