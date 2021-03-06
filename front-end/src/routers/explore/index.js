import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    CardMedia,
    Card,
    CardActionArea,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/navBar/navbar";
import 'react-animated-slider/build/horizontal.css';
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";
import _head from 'lodash/head';
import Youtube from '../../components/explore/youtube';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import _debounce from "lodash/debounce";
import { Element } from 'react-scroll';
import SEO from "../../components/seo";
import { seoTags } from "../../assets/data/seo";
import bg from '../../assets/img/bgimg4.jpg'
const bg2 = 'https://i.postimg.cc/qvDk6Ts0/IMG-8551.jpg'
const styles = () => ({
    root: {
        flexGrow: 1,
        paddingTop: '100px',
        paddingBottom: 50,
        marginTop: 0,
        width: "100%",
        minHeight: "100vh",
        height: "auto",
        margin: 0,
        backgroundImage: `url(${bg2})`,
        maxWidth: "100%",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
    },
    paper: {
        paddingLeft: 10,
        paddingRight: 10,

    },
    media: {
        height: 0,
        paddingTop: '56.26%' // 16:9
    },
    card: {
        width: "100%",
    },
});

class TutorialPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            videoID: '',
            thumbnailUrl: '',
            createdAt: '',
            text: '',
            loaded: false,
            playing: 0,
            value: '',
            filteredData: [],
            searching: false,

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const { onMount } = this.props;

        onMount();
    }



    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        const { loaded } = this.state;
        if (!loaded) {
            this.setState({ ..._head(data), loaded: true })
        }
    }

    setDisplayedVideos = _debounce(value => {
        const { data, } = this.props;
        let filteredData = data.filter(
            (datum) => {
                if (value.length <= 1) {
                    return null;
                }
                return datum.title.toLowerCase().indexOf(value) !== -1 ||
                    datum.text.toLowerCase().indexOf(value) !== -1;
            });
        this.setState({
            filteredData,
            searching: false,
        });
    }, 1000);

    handleChange = e => {
        this.setState({ value: e.target.value, searching: true, });
        let input = e.target.value.toLowerCase();
        this.setDisplayedVideos(input);
    };


    render() {

        const { data, classes } = this.props;
        const { title, text, videoID, thumbnailUrl, playing, value, filteredData, searching } = this.state;
        return (
            <div className={classes.root}>
                <SEO
                    title={seoTags.explore.title}
                    description={seoTags.explore.description}
                    keywords={seoTags.explore.keywords}
                />
                <Navbar />
                <div className={classes.paper}>
                    <Grid justify="center" container spacing={3} style={{ paddingBottom: 20 }}>
                        <Grid item xs={8} sm={6} md={4}>
                            <TextField
                                style={{
                                    background: "white",
                                    borderColor: "white",
                                    borderRadius: "10px"
                                }}
                                placeholder="Explore Our Village!"
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={value}
                                onChange={this.handleChange}
                                InputProps={{
                                    endAdornment: <SearchIcon />
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid style={{
                            padding: 0,
                            width: "100%",
                            margin: 0,
                        }}
                            item xs={12} sm={12} md={9}>
                            <div>
                                {videoID ?
                                    <Grid container justify="center">

                                        <div style={{
                                            backgroundColor: "#21212180",
                                            padding: "0px",
                                            height: "50%",
                                            width: "80%",
                                        }}>
                                            <Youtube videoHeight={this.state.videoHeight} youtubeId={videoID} />
                                        </div>
                                    </Grid>
                                    :
                                    <Grid container justify="center">
                                        <Typography variant="h4" style={{ paddingBottom: 0 }}>
                                            Cannot Load Video
                                  </Typography>
                                    </Grid>
                                }

                                <div style={{ background: "#21212150", paddingTop: 20, borderBottom: "1px solid grey", textAlign: "center" }}>
                                    <h1 variant="h4" style={{ fontFamily: "Montserrat, sans-serif", color: "white", paddingBottom: 10 }}>
                                        {title}
                                    </h1>
                                </div>
                                <Grid container justify="center" style={{ background: "#21212150", paddingBottom: 30, textAlign: 'justify' }}>
                                    <Grid item xs={12} sm={10}>
                                        {
                                            text ? text.split("\n").map((i, key) => (
                                                <Typography variant="h6" style={{ fontFamily: "Montserrat, sans-serif", color: "white", marginTop: '10px', marginBottom: '10px', paddingLeft: 10 }} key={key}>{i}</Typography>
                                            )) : <div />
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div style={{ background: '#DDDDDD' }}>
                                <Typography variant="body1" style={{ paddingBottom: 5, paddingTop: 15, paddingLeft: 10 }}>
                                    Now Playing:
                          </Typography>
                                <Grid container style={{ paddingBottom: 15, paddingTop: 5, paddingLeft: 10 }}>
                                    <Grid item xs={12} md={10}>
                                        <Grid container>
                                            <Grid item xs={2} md={4}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={thumbnailUrl}
                                                    title={title}
                                                />
                                            </Grid>
                                            <Grid item xs={10} md={8} style={{ paddingLeft: 10 }}>
                                                <Typography gutterBottom variant="body1" component="h2">
                                                    {title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Element name="test7" className="element" id="containerElement" style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: "40vh",
                                    overflowY: 'scroll',
                                    marginBottom: '100px',
                                }}>
                                    {
                                        value.length <= 1 ?
                                            data.map((datum, index) => (
                                                <Card style={{ paddingTop: 5, paddingBottom: 5, minHeight: 50 }}>
                                                    <CardActionArea onClick={() => this.setState({ ...datum, playing: index })}>
                                                        <Grid container key={index}>
                                                            <Grid item xs={12} md={10}>
                                                                <Grid container>
                                                                    <Grid item xs={1} md={1}>
                                                                        <Grid container justify="center" style={{ paddingTop: 10, }}>
                                                                            {index === playing ? <PlayArrowIcon /> : <div />}
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={2} md={4}>
                                                                        <CardMedia
                                                                            className={classes.media}
                                                                            image={datum.thumbnailUrl}
                                                                            title={datum.title}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={9} md={7} style={{ paddingLeft: 10 }}>
                                                                        <Typography gutterBottom variant="body1" component="h2">
                                                                            {datum.title}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </CardActionArea>
                                                </Card>
                                            )) :
                                            filteredData.length === 0 ?
                                                <div>
                                                    <Grid justify="center" container>
                                                        {
                                                            searching ? "Please Wait" : "No Results Found"
                                                        }
                                                    </Grid>
                                                </div>
                                                :
                                                filteredData.map((datum, index) => (
                                                    <Card style={{ paddingTop: 5, paddingBottom: 5 }}>
                                                        <CardActionArea onClick={() => this.setState({ ...datum, playing: index })}>
                                                            <Grid container key={index}>
                                                                <Grid item xs={12} md={10}>
                                                                    <Grid container>
                                                                        <Grid item xs={1} md={1}>
                                                                            <Grid container justify="center" style={{ paddingTop: 20, }}>
                                                                                {index === playing ? <PlayArrowIcon /> : <div />}
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={2} md={4}>
                                                                            <CardMedia
                                                                                className={classes.media}
                                                                                image={datum.thumbnailUrl}
                                                                                title={datum.title}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={9} md={7} style={{ paddingLeft: 10 }}>
                                                                            <Typography gutterBottom variant="body1" component="h2">
                                                                                {datum.title}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </CardActionArea>
                                                    </Card>
                                                ))
                                    }
                                </Element>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <SuccessToast />
                <ErrorToast />
            </div>
        )
    }
}

export default withStyles(styles)(TutorialPage)
