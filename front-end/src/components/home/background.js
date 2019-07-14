import React, { Component } from 'react';
import Navbar from '../navBar/navbar'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Background extends Component {
  render() {
    const { mission } = this.props;
    const bgStyles = {
      backgroundImage: `url(${mission.imgUrl})`,
      margin: 'none auto',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      maxWidth: '100%',
      boxSizing: 'inherit',
    };
    const captionWrap = {
      maxWidth: '500px',
      margin: '0 auto',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    };
    const bgCaption = {
      color: '#fff',
      fontSize: '60px',
      margin: '0',
    };
    const topCaption = {
      color: '#fff',
      fontSize: '20px',
      letterSpacing: '-.02rem',
      lineHeight: '1'
    };
    const banner = {
      color: '#fff',
      fontSize: '40px',
      letterSpacing: '-.02rem',
      lineHeight: '1'
    };
    return (

      <div style={bgStyles} >
        <Navbar />
        <div style={captionWrap}>
          <div>
            <h1 style={topCaption}>Bali, Indonesia</h1>
          </div>
          <h2 style={bgCaption}>Bengkala</h2>
          <p style={banner}>Explore Kolok and many more!</p>
          <Button
              variant="contained"
              size="medium"
              color="primary"
              component={Link}
              to="/booking"
              style={{
                marginBottom: 50,
                backgroundColor: 'teal',
              }}
          >
            Book Now!</Button>
        </div>
      </div>


    );
  }
}

export default Background;
