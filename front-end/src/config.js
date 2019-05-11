module.exports = {
  react: {
    portNumber: process.env.REACT_APP_PORT || 3001,
    modeType: process.env.REACT_APP_NODE_ENV || 'development',
    domainName: process.env.REACT_APP_NODE_ENV === 'development' ? 'localhost' : 'www.bengkalatourism.com',
  },
}
