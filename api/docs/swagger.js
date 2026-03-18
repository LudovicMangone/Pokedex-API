import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Pokedex API',
      version: '1.0.0',
      description: 'Une API complète pour gérer ses Pokémons, ses équipes et voter pour ses favoris.',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Serveur local',
      },
    ],
  },
  apis: ['./routers/*.js'], 
};

export const swaggerSpec = swaggerJSDoc(options);