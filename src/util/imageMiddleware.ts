import express from 'express';
import { Request, Response, NextFunction } from 'express';
const fs = require('fs/promises');
const path = require('path');

// /api/images?filename=argentina&width=200&height=200
async function imageMiddleware(req: Request, res: Response, next: NextFunction, fileName: string): Promise<void> { 
        try {
            console.log(path.join(__dirname, '../../public/assets/img/full', fileName + '.jpg'));
            const data = await fs.readFile(path.join(__dirname, '../../public/assets/img/full', fileName + '.jpg'));
            res.setHeader('Content-Type', 'image/jpeg');
            res.end(data);
        } catch (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/plain'});
            res.end('File not found');
        }
        next();
}


export default imageMiddleware