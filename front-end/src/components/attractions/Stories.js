import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './tileData';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));



export default function SingleLineGridList() {
    const classes = useStyles();
    
    const data = {
        "Funny Random Meme Dump":
          [{ imgUrl: "https://i.imgur.com/WfkZGD7.jpg", text: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia." }],
        "Napping with my human":
          [{ imgUrl: "https://i.imgur.com/BMQIj5o.jpg", text: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest." }]
      };

    const exampleData = [
        {
            img: image,
            title: 'Image',
            author: 'author',
        },
    
    ];

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {tileData.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton aria-label={`star ${tile.title}`}>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>
                            }
                        />
                        <Button size="small" color="primary">
                            Read More
            </Button>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}