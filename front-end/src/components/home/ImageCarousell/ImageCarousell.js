import React from 'react';

import ItemsCarousel from 'react-items-carousel';

import API from '../../../api';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

const ImageCarousell = (props) => {

    const [attractions, setAttractions] = React.useState([]);



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
            console.log(result.data.stories)

            const children = result.data.stories.map((i, index) => {
                return {
                    original: i.imgUrl,
                    thumbnail: i.imgUrl
                }

            })

            setAttractions(children);

        };

        fetchData();
    }, []);





    const numofCards = windowWidth > 1100 ? 3 : (windowWidth > 800 ? 2 : (windowWidth > 600 ? 1 : 1));



    return (
        <div style={{ textAlign: "center", margin: 10, paddingLeft: "2%", paddingRight: "2%", paddingBottom: "2%" }}>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: '2em' }}>See our attractions!</h3>

            {attractions.length !== 0 ?
                <ImageGallery showNav={true} showPlayButton={true} autoPlay={true} lazyLoad={true} items={attractions} />
                :

                <div>No data to display</div>


            }


        </div >

    );
}

export default ImageCarousell;