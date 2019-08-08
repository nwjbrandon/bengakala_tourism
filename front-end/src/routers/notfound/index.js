import React from 'react'
import Navbar from "../../components/navBar/navbar";
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

class Notfound extends React.Component {
  render() {
    return (
      <div>

        <Navbar />
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            <Typography variant="h1" align="center" style={{ paddingTop: 40 }}>
              404
              </Typography>
            <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
              Page Not Found
              </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Notfound
