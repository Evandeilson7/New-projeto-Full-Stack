// swagger.js
import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/server.js', './src/routes/maquinaRoutes.js'] // ✅ CORRIGIDO

const doc = {
  info: {
    title: 'API de Máquinas (Compass)',
    description: 'Documentação automática gerada com swagger-autogen',
    version: '1.0.0'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Ambiente local (Compass)' }
  ],
  tags: [
    { name: 'Máquinas', description: 'Operações CRUD de cadastro de máquinas' }
  ]
}

const swaggerAutogenInstance = swaggerAutogen({ openapi: '3.0.0' })
swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  console.log('Documentação Swagger gerada: swagger_output.json')
})
