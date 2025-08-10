// src/start-up/swagger.ts
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import swaggerDocument from '../routes/swagger.json';

export function setupSwagger(app: Express): void {
  app.use('/admin/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

