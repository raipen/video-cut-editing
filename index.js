import { spawn } from 'child_process';
import { checkFfmpegInstalled } from './utils.js';

if (!(await checkFfmpegInstalled())) {
    console.log('ffmpeg is not installed');
    process.exit(1);
}
