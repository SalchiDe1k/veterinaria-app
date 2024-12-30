import express from 'express';
import cors from 'cors';
import routes from './infrastructure/routes';
import { JsonMiddleware } from './infrastructure/middlewares/jsonMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(JsonMiddleware);

routes.forEach(route => {
    app.use(route.path, route.router);
});

export { app };