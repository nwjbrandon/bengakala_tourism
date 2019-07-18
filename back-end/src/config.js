const config = {
  mySQL: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'bengkala',
    password: 'bengkala',
    database: 'bengkala',
  },
  express: {
    portNumber: process.env.PORT || 3001,
    modeType: process.env.NODE_ENV || 'development',
    domainName: process.env.NODE_ENV === 'development' ? 'localhost' : 'bengkalatourism.com',
  },
};

export default config;
