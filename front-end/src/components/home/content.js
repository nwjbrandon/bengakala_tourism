import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  segment: {
    margin: '0',
    paddingTop: '60px',
    paddingBottom: '45px',
  },
  container: {
    boxSizing: 'border-box',
    maxWidth: '1290px',
    marginLeft: '100px',
    marginRight: '100px',
    position: 'relative',
  },
  articleStyle: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'inherit',
    textSizeAdjust: '100%',
  }
});

const contentHeader = {
  margin: '0',
  fontSize: '28px',
  color: '#3b444f',
  fontWeight: '100',
  textAlign: 'center',
  paddingTop: '0',
  lineHeight: '1.3',
  marginTop: '0',
  position: 'relative',
  textSizeAdjust: '100%',
};
const separator ={
  backgroundColor: '#f8304b',
  display: 'block',
  width: '85px',
  height: '2px',
  margin: '0 auto',
  marginBottom: '30px',
  marginTop: '15px',
  verticalAlign: 'baseline',
  opacity: '1',
};
const contentNarrative={
  boxSizing: 'border-box',
  color: '#2C3643',
  display: 'block',
  fontSize: '18px',
  fontWeight: '100',
  marginTop: '25px',
  marginBottom: '25px',
  textSizeAdjust: '100%',
  lineHeight: '28px',
  textAlign: 'center',
};

const myTitlestyle={
  boxSizing: 'inherit',
  fontSize: '20px',
  diplay: 'block',
  fontWeight: '600',
  lineHeight: '30px',
  marginBlockEnd: '10px',
  marginBlockStart: '25px',
  marginBottom: '10px',
  marginTop: '25px',
  textAlign: 'left',
  textRendering: 'optimizelegibility',
  textSizeAdjust: '100%',
};

const myTextstyle = {
  boxSizing: 'border-box',
  color: 'rgb(44,54,67)',
  display: 'block',
  fontSize: '16px',
  lineHeight: '26px',
};

// For testing
const textArray = [
  {
    title : "Island of the Gods" ,
    text: "The rich and diverse culture of Bali plays out at all levels of life, from the exquisite flower-petal offerings placed everywhere, to the processions of joyfully garbed locals shutting down major roads as they march to one of the myriad temple ceremonies, to the otherworldly traditional music and dance performed island-wide. Almost everything has spiritual meaning. The middle of Bali is dominated by the dramatic volcanoes of the central mountains and hillside temples such as Pura Luhur Batukau (one of the islands estimated 10,000 temples), while the tallest peak, Gunung Agung, is the islands spiritual centre."
  },
  {
    title : "One Island, Many Destinations",
    text: "On Bali you can lose yourself in the chaos of Kuta or sybaritic pleasures of Seminyak and Kerobokan, surf wild beaches in the south or just hang out on Nusa Lembongan. You can go family-friendly in Sanur or savour a lavish getaway on the Bukit Peninsula. Ubud is the heart of Bali, a place where the culture of the island is most accessible, and it shares the islands most beautiful rice fields and ancient monuments with east and west Bali. North and west Bali are thinly populated but have the kind of diving and surfing that make any journey worthwhile."
  },
  {
    title : "Bali's Essence",
    text: "Yes, Bali has beaches, surfing, diving and resorts great and small, but its the essence of Bali – and the Balinese – that makes it so much more than just a fun-in-the-sun retreat. It is possible to take the cliché of the smiling Balinese too far, but in reality, the inhabitants of this small island are indeed a generous, genuinely warm people. Theres also a fun, sly sense of humour. Upon seeing a bald tourist, many locals exclaim 'bung ujan', which means today's rain is cancelled – it's their way of saying that the hairless head is like a clear sky."
  },
];

class Content extends Component {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const { stories, mission, classes } = this.props;
    return(
      <div className={classes.root}>
        <div className={classes.segment}>
          <div className={classes.container}>
            <article className={classes.articleStyle}>
              <h2 style={contentHeader}> Welcome to Bengkala Village </h2>
              <div style={separator} />
              <div style={contentNarrative}>
                <p>{ mission }</p>
              </div>
              <div>
                {
                  stories.map(text => (
                      <div key={text.title}>
                        <h2 style={myTitlestyle}>
                          {text.title}
                        </h2>
                        <p style={myTextstyle}>
                          {text.text}
                        </p>
                      </div>
                  ))
                }
              </div>
            </article>
          </div>
        </div>
      </div>

    );
  }
}

export default withStyles(styles)(Content)
