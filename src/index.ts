import express, { Request, Response, NextFunction } from 'express';
import middleware from './util/imageMiddleware';

const app = express();
const port = 3000;



app.get('/api/images', (req, res, next) => {
    next();
});

const mw1 = async (req: Request, res: Response, next: NextFunction) => {
    console.log("next middleware called in mw1");
    middleware.readParams(req, res, next);
}

const mw2 = (req: Request, res: Response, next: NextFunction) => {
    console.log("next middleware called in mw2");
    middleware.resizeImage(req, res, next);
}

const mw3 = (req: Request, res: Response, next: NextFunction) => {
    console.log("next middleware called in mw3");
    middleware.sendImage(req, res, next);
}

app.use(mw1);
app.use(mw2);
app.use(mw3);


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;