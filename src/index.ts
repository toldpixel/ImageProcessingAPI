import express, { Request, Response, NextFunction } from 'express';
import middleware from './util/imageMiddleware';

const app = express();
const port = 3000;



app.get('/api/images', (req, res, next) => {
    next();
});

const mw1 = (req: Request, res: Response, next: NextFunction) => {
     middleware.readImage(req, res, next);
}

const mw2 = (req: Request, res: Response, next: NextFunction) => {
    middleware.resizeImage(req, res, next);
}

app.use(mw1);
app.use(mw2);


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;