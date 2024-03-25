import { spawn } from 'child_process';
import { checkFfmpegInstalled, fileExists, getCSVData, validateCSV } from './utils.js';

if (!(await checkFfmpegInstalled())) {
    console.log('ffmpeg is not installed');
    process.exit(1);
}

const csvPath = process.argv[2];
if (!csvPath) {
    console.log('Please provide a path to a CSV file');
    process.exit(1);
}

if(!(await fileExists(csvPath))) {
    console.log('CSV file does not exist');
    process.exit(1);
}

const csvData = await getCSVData(csvPath);
await validateCSV(csvData);

