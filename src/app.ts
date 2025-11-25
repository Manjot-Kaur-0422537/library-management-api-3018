import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import booksRoutes from './api/v1/routes/books.routes';
import authorsRoutes from './api/v1/routes/authors.routes';
import borrowRoutes from './api/v1/routes/borrow.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './api/v1/docs/swagger.json';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/authors', authorsRoutes);
app.use('/api/v1/borrow', borrowRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_req, res) => res.json({ message: 'Library Management API - v1' }));

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
