import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { fileExistsInThumbs, fileExistsInFull } from './fileUtils';

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

class NoFilenameError extends Error {
    constructor() {
        super('No Filename given');
        this.name = 'NoFilenameError';
    }
}

class NoFileExistsError extends Error {
    constructor() {
        super('No File Exists');
        this.name = 'NoFileExistsError';
    }
}


// Get all params and checks if image already in thumbs folder if yes then serve image from local storage
// otherwise resize an image and save it to local storage (default 200 x 200)
const middleware = {

    async readParams(req: CustomRequest, res: Response, next: NextFunction) { 
        try {
            const filename = req.query.filename as string | undefined;
            const width = req.query.width as string | undefined;
            const height = req.query.height as string | undefined;
            const defaultWidth = '200';
            const defaultHeight = '200';
            
            if(!filename) {
                throw new NoFilenameError();
            } 

            req.filename = filename;
            req.width = width || defaultWidth; 
            req.height = height || defaultHeight;
            const filepath = path.join(__dirname, '../../public/assets/img/full', req.filename as string | undefined + '.jpg'); 
            req.filepath = filepath as string;
           
            if(await fileExistsInThumbs(req.filename, req.width, req.height)) {
                this.sendImage(req, res, next);
            } else {
                if(await fileExistsInFull(req.filename)) {
                    next();
                } else {
                    throw new NoFileExistsError();
                }
            }

        } catch (err) {
            if((err as NoFilenameError).name === 'NoFilenameError') {
                res.status(404).send('No filename');
                return
            } else if((err as NoFileExistsError).name === 'NoFileExistsError') {
                res.status(404).send('File doesnt Exist');
                return
            }
            console.log(err);
            return
        }
    },

    async resizeImage(req: CustomRequest, res: Response, next: NextFunction) {
        try { 
           await sharp(req.filepath)
                .resize({
                width: parseInt(req.width as string),
                height: parseInt(req.height as string)
                })
                .toFile(`public/assets/img/thumbs/${req.filename}` + `${req.width}`+ 'x' + `${req.height}` + '_thumbs.jpg');
        } catch (error) {
            console.log("Error in resize Image:" + error);
            res.status(404).send('Failed to resize image');
            return
        }
        next();
    },

    async sendImage(req: CustomRequest, res: Response, next: NextFunction): Promise<void> { 
        try {
            req.data = await fs.readFile(path.join(__dirname, '../../public/assets/img/thumbs', req.filename + `${req.width}`+ 'x' + `${req.height}` + '_thumbs.jpg'));
            res.setHeader('Content-Type', 'image/jpeg');
            res.status(200).end(req.data);
        } catch (err) {
            console.log("Error in sendImage:" + err);
            res.status(404).send('Failed to send image');
            return
        }
    },

}

export {middleware, fileExistsInFull, fileExistsInThumbs};
