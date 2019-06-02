import React, {Component} from 'react';

import '../css/Header.css';

class Header extends Component {
  render() {
    return (

        <div className="HomepageImage">
          <h1>{this.props.title}</h1>
        </div>


    );
  }
};

export default Header;
