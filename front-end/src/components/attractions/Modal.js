import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  Card,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";

const Modal = ({ text, imgUrl, onCloseModal, openModal, title }) => (
  <Dialog
    open={openModal}
    onClose={onCloseModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    scroll="paper"
  >
      <Card>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
      {title}
      </Typography>
        <div align="center" style={{paddingTop:"5px", marginTop:"10px"}}>
<img src={imgUrl} title={title} alt={title} style={{maxHeight:"200px"}}/></div>
          <Typography variant="body2" color="textSecondary" component="p">
          {text}
          </Typography>
        </CardContent>
    <CardActions>
      <Button onClick={onCloseModal} color="primary">
        Close
      </Button>
    </CardActions>
    </Card>
  </Dialog>
);

Modal.propTypes = {
  description: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
