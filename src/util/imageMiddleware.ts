import express from 'express';
import { Request, Response, NextFunction } from 'express';
const fs = require('fs/promises');
const path = require('path');
const sharp = require("sharp");

// /api/images?filename=argentina&width=200&height=200
interface CustomRequest extends Request {
    data?: Buffer;
}

const middleware = {

    async readImage(req: CustomRequest, res: Response, next: NextFunction): Promise<void> { 
        try {
            //console.log(path.join(__dirname, '../../public/assets/img/full', req.query.filename + '.jpg'));
            //req.data = await fs.readFile(path.join(__dirname, '../../public/assets/img/full', req.query.filename + '.jpg'));
            req.data = path.join(__dirname, '../../public/assets/img/full', req.query.filename + '.jpg');        
        } catch (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/plain'});
            res.end('File not found');
        }
        next();
    },

    async resizeImage(req: CustomRequest, res: Response, next: NextFunction) {
        try {
           const fileName = req.data
           const fileWidth = parseInt(req.query.width as string);
           const fileHeight = parseInt(req.query.height as string);
           console.log(req.data, fileWidth, fileHeight); 
           await sharp(fileName)
                .resize({
                width: fileWidth,
                height: fileHeight
                })
                .toFile(`${fileName}_thumbs.jpg`);
                res.setHeader('Content-Type', 'image/jpeg');
                res.end(req.data);
        } catch (error) {
            console.log(error);
        }
        next();
    },

}

export default middleware;
