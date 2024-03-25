import { spawn } from 'child_process';
import fs from 'fs';

export const checkFfmpegInstalled = async () => {
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn('ffmpeg', ['-version']);
        ffmpeg.on('error', (err) => {
            reject(err);
        });
        ffmpeg.on('close', (code) => {
            if (code === 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

export const fileExists = async (path) => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

export const getCSVData = async (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const lines = data.split('\n');
                const [header, ...rows] = lines;
                const keys = header.split(',');
                const result = rows.map((row) => {
                    const values = row.split(',');
                    return keys.reduce((acc, key, i) => {
                        acc[key] = values[i];
                        return acc;
                    }, {});
                });
                resolve(result);
            }
        });
    });
};

export const validateCSV = async (csvData) => {
    return csvData.every((row) => {
        return row.hasOwnProperty('video') && row.hasOwnProperty('start') && row.hasOwnProperty('end');
    });
};
