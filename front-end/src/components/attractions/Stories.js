import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import { GridListTile } from '@material-ui/core';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        paddingTop: "1%",
        paddingLeft: "5%",
        paddingRight: "5%",
        background: "#FFFFFF00",
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        height: '400px'
    },
    gridListTile: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        height: '400px'
    },
    title: {
        color: "white",
    },
    h1titletag: {
        color: "white",
    },

    Storytitle: {
        color: "white",
        textAlign: "centre",
        marginBottom: "40px",
        fontSize: "50px",
        background: "#00000099",
        borderRadius: "5px",
        padding: "10px"
    },

    Storyh1titletag: {
        textAlign: "center",
        /* font-size: 1em; */
        marginBottom: "10px",
        font: "20px arial, sans-serif",
        color: "white",
        textShadow: "0 1px 2px rgba(black,.15)",
    },

    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
}));


function getModalStyle() {
    return {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };
}




export default function SingleLineGridList(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [dataID, setDataID] = useState("");

    const [modalStyle] = React.useState(getModalStyle);



    const cardRow = Object.keys(props.data).map(keyVal =>
        props.data[keyVal].map((item, index) => (
            <GridListTile className={classes.gridListTile}>
                <img style={{ height: "400px" }} src={item.imgUrl} alt={keyVal} />
                <GridListTileBar
                    title={keyVal}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                    actionIcon={
                        <Button onClick={() => {
                            setDataID(keyVal);
                            setOpen(true);
                        }
                        } size="small" className={classes.title}>
                            Read More
                        </Button>
                    }
                />
            </GridListTile>

        ))
    );



    return (
        <div className={classes.root}>
            <div className={classes.Storytitle}><h1 className={classes.Storyh1titletag}>Come Listen to Our Stories!!</h1></div>

            <GridList cellHeight="auto" className={classes.gridList} cols={4}>
                {cardRow}
            </GridList>

            {open ? <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <Typography variant="h6" id="story_title">
                        {dataID}
                    </Typography>
                    <Typography variant="subtitle1" id="story_description">
                        {props.data[dataID][0].text}
                    </Typography>
                </div>
            </Modal> : null}
        </div>
    );
}