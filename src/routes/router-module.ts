import { Router } from 'express';
import { RegisterRoutes as RegisterAdminRoutes } from '../routes/routes';
import swaggerAdminDocument from '../routes/swagger.json';
import swaggerUi from 'swagger-ui-express';

const router = Router();

// Swagger UI
router.use('/admin/docs', swaggerUi.serve, swaggerUi.setup(swaggerAdminDocument));

const adminRouter = Router();
RegisterAdminRoutes(adminRouter);
router.use('/admin', adminRouter);

export default router;
