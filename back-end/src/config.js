const config = {
  mySQL: {
    host: 'localhost',
    user: 'bengkala',
    password: 'bengkala',
    database: 'bengkala',
  },
  express: {
    portNumber: process.env.PORT || 3002,
    modeType: process.env.NODE_ENV || 'development',
    domainName: process.env.NODE_ENV === 'development' ? 'localhost' : 'www.bengkalatourism.com',
  },
  swaggerOptions: {
    swaggerDefinition: {
      info: {
        description: 'Bengkala Tourism Website',
        title: 'Swagger Docs',
        version: '1.0.0',
      },
      host: `${process.env.NODE_ENV === 'development' ? 'localhost' : 'www.bengkalatourism.com' }:${ process.env.PORT || 3002 }`,
      basePath: '/api',
      produces: [
        'application/json',
        'application/xml'
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        }
      }
    },
    basedir: __dirname,
    files: ['./api/**/*.js']
  },
}

export default config;
