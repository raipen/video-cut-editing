import { spawn } from 'child_process';
import checkFfmpegInstalled from './checkFfmpegInstalled.js';

if (!(await checkFfmpegInstalled())) {
    console.log('ffmpeg is not installed');
    process.exit(1);
}
