const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    version: '1.0.0',
    title: '클론프로젝트 API모음',
    description: '근데 배포할때는 못해봤어서 문제임',
  },
  host: 'hi-prac.shop:3000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoints',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'cookie', // can be "header", "query" or "cookie"
      name: process.env.COOKIE_NAME, // name of the header, query parameter or cookie
      description: 'yes',
    },
  },
};
// 최-종
const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);