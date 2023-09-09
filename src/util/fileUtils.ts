const fs = require('fs/promises');

//check if filename already exists in thumbs folder
export async function fileExistsInThumbs(filename: string, width: string, height: string): Promise<boolean> {
    let check: boolean = true;
    let filepath: string = `${filename}${width}x${height}_thumbs` + '.jpg';
    try {
        await fs.access(`public/assets/img/thumbs/${filepath}`, fs.constants.F_OK);
    } catch (err: NodeJS.ErrnoException | unknown ) {
        if(err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
            check = false;
        } else {
            console.error('Error in File Check:', err);
        }
    }
    return check;
}

//check if filename already exists in full folder
export async function fileExistsInFull(filename: string): Promise<boolean> {
    let check: boolean = true;
    let filepath: string = `${filename}` + '.jpg';
    try {
        await fs.access(`public/assets/img/full/${filepath}`, fs.constants.F_OK);
    } catch (err: NodeJS.ErrnoException | unknown ) {
        if(err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
            check = false;
        } else {
            console.error('Error in File Check:', err);
        }
    }
    return check;
}