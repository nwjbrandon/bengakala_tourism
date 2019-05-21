const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'REST API for my App',
    version: '1.0.0',
    description: 'This is the REST API for my product',
  },
  host: 'localhost:3001',
  basePath: '/api',
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/**/*.yaml'],
};
export default swaggerJSDoc(options);
