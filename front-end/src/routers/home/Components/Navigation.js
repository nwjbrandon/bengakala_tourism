import React, { Component } from 'react';

import '../css/Navigation.css';

class Navigation extends Component {
  render () {
    const sections =['Home', 'Stories', 'Booking', 'Translation'];
    const navlinks = sections.map( section => {
        return(
            <li><a href={'#' + section}>{section}</a></li>
        )
    });
    
    return (
        <nav>
          <h2 className="Logo">{this.props.Logo}</h2>

          <ul>
            {navlinks}
          </ul>
        </nav>

    );
  }
}

export default Navigation;
