import fs from 'fs';

export function encodeFileToBase64(file) {

    const bitmap = fs.readFileSync(file);

    const base64String = Buffer.from(bitmap).toString('base64');
    return base64String;
}

export function encodeFileToWebBase64(file) {

    const bitmap = fs.readFileSync(file);

    const base64String = Buffer.from(bitmap).toString('base64');

    const webBase64String = `data:image/jpeg;charset=utf-8;base64,${base64String}`
    return webBase64String;
}