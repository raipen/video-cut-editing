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
                const lines = data.trim().split('\n');
                const [header, ...rows] = lines;
                const keys = header.split(',');
                const result = rows.map((row) => {
                    const values = row.split(',');
                    return keys.reduce((acc, key, i) => {
                        acc[key] = values[i].trim();
                        return acc;
                    }, {});
                });
                resolve(result);
            }
        });
    });
};

export const validateCSV = async (csvData) => {
    return (await Promise.all(csvData.map(async (row,index) => {
        if(!row.hasOwnProperty('video') || !row.hasOwnProperty('start') || !row.hasOwnProperty('end')) throw new Error(`Row ${index+1} is missing required fields`);
        if(!row.video || !row.start || !row.end) throw new Error(`Row ${index+1} is missing required fields`);
        if(!(await fileExists(row.video))) throw new Error(`Row ${index+1} video file does not exist`);
        const timeRegex = /^(\d{2}):(\d{2}):(\d{2}).(\d{3})$/;
        if(!timeRegex.test(row.start) || !timeRegex.test(row.end)) throw new Error(`Row ${index+1} start or end time is not in the correct format`);
        return true;
    }))).every((x) => x);
};
