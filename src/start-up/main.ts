// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import routes from '../routes/router-module';
import { setupSwagger } from './swagger';

dotenv.config();

const main = express();

main.use(express.json());
main.use('/api', routes);

setupSwagger(main); // <-- Gọi để mount swagger UI

export default main;
