import express, { Request, Response, NextFunction } from 'express';
import imageMiddleware from './util/imageMiddleware';
const app = express();
const port = 3000;

let fileName: string = '';
let width: string = '';
let height: string = '';

app.get('/api/images', (req, res, next) => {
    fileName = req.query.filename as string || 'empty';
    let width = req.query.width as string || 'empty';
    let height = req.query.height as string || 'empty';
    next();
});

const mw = (req: Request, res: Response, next: NextFunction) => {
    imageMiddleware(req, res, next, fileName);
}

app.use(mw);


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;