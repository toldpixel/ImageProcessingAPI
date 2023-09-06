import express, { Request, Response, NextFunction } from 'express';
import middleware from './util/imageMiddleware';

const app = express();
const port = 3000;



app.get('/api/images', (req, res, next) => {
    next();
});

const mw1 = async (req: Request, res: Response, next: NextFunction) => {
    if(await middleware.readParams(req, res, next)) {
        mw3(req, res, next);
    }
    middleware.readParams(req, res, next);
}

const mw2 = (req: Request, res: Response, next: NextFunction) => {
    middleware.resizeImage(req, res, next);
}

const mw3 = (req: Request, res: Response, next: NextFunction) => {
    middleware.sendImage(req, res, next);
}

app.use(mw1);
app.use(mw2);
app.use(mw3);


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;