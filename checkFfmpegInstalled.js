import { spawn } from 'child_process';

export default async () => {
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
