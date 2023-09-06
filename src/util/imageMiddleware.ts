import express from 'express';
import { Request, Response, NextFunction } from 'express';
const fs = require('fs/promises');
const path = require('path');
const sharp = require("sharp");

// /api/images?filename=argentina&width=200&height=200
interface CustomRequest extends Request {
    data?: Buffer;
    filename?: string;
    width?: string;
    height?: string;
    filepath?: string;
}

async function fileExists(filename: string): Promise<boolean> {
    let check: boolean = true;
    try {
        await fs.access(`public/assets/img/thumbs/${filename}_thumbs.jpg`, fs.constants.F_OK);
    } catch (err: NodeJS.ErrnoException | unknown ) {
        if(err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
            console.error('File does not exist');
            check = false;
            return check;
        } else {
            console.error('Error in File Check:', err);
        }
    }
    return check;
}


const middleware = {

    async readParams(req: CustomRequest, res: Response, next: NextFunction): Promise<boolean> { 
        try {

            const filename = req.query.filename as string | undefined;
            const filepath = path.join(__dirname, '../../public/assets/img/full', req.query.filename as string | undefined + '.jpg');
            const width = req.query.width as string | undefined;
            const height = req.query.height as string | undefined;
            const defaultWidth = '200';
            const defaultHeight = '200';
            
            if(!filename) {
               throw new Error('No filename given'); 
            }

            req.filename = filename;
            req.filepath = filepath as string;
            req.width = width || defaultWidth; 
            req.height = height || defaultHeight;

            if(await fileExists(filename)) {
                console.log("File exists!");
                return true;
            }
  
            next();
        } catch (err) {
            console.log("Error in readParams" + err);
            res.writeHead(404, { 'Content-Type': 'text/plain'});
            res.end('File not found');
        }
        return false;
    },

    async resizeImage(req: CustomRequest, res: Response, next: NextFunction) {
        try {
           console.log(req.filename, req.width, req.height, req.filepath); 
           await sharp(req.filepath)
                .resize({
                width: parseInt(req.width as string),
                height: parseInt(req.height as string)
                })
                .toFile(`public/assets/img/thumbs/${req.filename}_thumbs.jpg`);
        } catch (error) {
            console.log("Error in resize Image:" + error);
        }
        next();
    },

    async sendImage(req: CustomRequest, res: Response, next: NextFunction): Promise<void> { 
        try {
            console.log("read file from harddrive");
            req.data = await fs.readFile(path.join(__dirname, '../../public/assets/img/thumbs', req.filename + '_thumbs.jpg'));
            res.setHeader('Content-Type', 'image/jpeg');
            res.end(req.data);
        } catch (err) {
            console.log("Error in sendImage:" + err);
            res.writeHead(404, { 'Content-Type': 'text/plain'});
            res.end('File not found');
        }
    },

}

export default middleware;
