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

const Modal = ({
                   firstName,
                   lastName,
                   email,
                   phone,
                   country,
                   dateFrom,
                   dateTo,
                   breakfast,
                   lunch,
                   dinner,
                   males,
                   females,
                   cars,
                   van,
                   motorbikes,
                   checkedIn,
                   uuid,
                   onCloseModal,
                   confirmedCheckIn,
                   deleteCheckIn,
                   openModal = false,
               }) => (
  <Dialog
    open={openModal}
    onClose={onCloseModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    scroll="paper"
  >
      Customer Order
      <Card>
          <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                  Customer Name: {lastName}, {firstName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  FirstName: {firstName} LastName: {lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  Email: {email} Phone: {phone} Country: {country}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  Date From: {dateFrom} Date To: {dateTo}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  Males: {males} Female: {females}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  Breakfast: {breakfast ? "Yes": "No"}&nbsp;
                  Lunch: {lunch ? "Yes": "No"}&nbsp;
                  Dinner: {dinner ? "Yes": "No"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                  Cars: {cars} Vans: {van} Motorbikes: {motorbikes}
              </Typography>
          </CardContent>
          <CardActions>
              {
                  checkedIn ?
                      <Button value={uuid} onClick={deleteCheckIn} color="secondary">
                          Delete
                      </Button>
                      :
                      <Button value={uuid} onClick={confirmedCheckIn} color="primary">
                          Checked In
                      </Button>
              }
              <Button onClick={onCloseModal} color="primary">
                  Close
              </Button>
          </CardActions>
      </Card>
  </Dialog>
);

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
