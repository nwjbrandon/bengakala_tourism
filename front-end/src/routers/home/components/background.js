import React, {Component} from 'react';
import Bg from '../pictures/bgimg.jpg'

const bgStyles = {
  backgroundImage: `url(${Bg})`,
  margin: 'none auto',
  height: '90vh',
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
const captionWrap ={
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
//  position: 'relative',
};
const topCaption = {
  color: '#fff',
  fontSize: '20px',
  letterSpacing: '-.02rem',
  lineHeight: '1'
}

class Background extends Component {
  render() {
    return (

        <div style={bgStyles} >
          <div style={captionWrap}>
            <div>
              <h1 style={topCaption}>Bali, Indonesia</h1>
            </div>
            <h2 style={bgCaption}>Bengkala Village</h2>
          </div>
        </div>


    );
  }
};

export default Background;
