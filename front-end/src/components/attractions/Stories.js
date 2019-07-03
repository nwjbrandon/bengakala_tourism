import React, {PureComponent} from "react";
import {
  Button,
  Typography,
  Modal,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea
} from "@material-ui/core";
import PropTypes from "prop-types";

const storie = {
margin: "0",
height: "auto",
overflow: "scroll",
whiteSpace: "nowrap",
display: "inline-block",
padding: "5px",
overflowX: "hidden",
overflowY: "hidden"
};
const desc = {
whiteSpace:"normal",
maxHeight: "80px",
overflow:"hidden",
};
class Stories extends React.Component {

  openModal = () => {
    const { description, handleOpenModal, imgSrc, title } = this.props;
    handleOpenModal({ description, imgSrc, title });
  };

  render = () => (

    <React.Fragment>
    <li style={storie}>
      <Card raised= "true" style={{height:"400px", maxWidth:"350px"}}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
      {this.props.title}
      </Typography>
        <div align="center" style={{paddingTop:"5px", marginTop:"10px"}}>
<img src={this.props.imgSrc} title={this.props.title} style={{maxHeight:"200px"}}/></div>
          <Typography style={desc} variant="body2" color="textSecondary" component="p">
          {this.props.description}
          </Typography>
        </CardContent>
      <CardActions>
        <Button style ={{bottom: "10px"}} size="small" color="primary" onClick={this.openModal}>
          Read More
        </Button>
      </CardActions>
    </Card>
    </li>
    </React.Fragment>
  );
}

Stories.propTypes = {
  description: PropTypes.string.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Stories;
