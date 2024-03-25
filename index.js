import { spawn } from 'child_process';
import { cleanOutputDir, deleteFile, checkFfmpegInstalled, fileExists, getCSVData, validateCSV, cutVideo, recordOutputPath, mergeVideos, createOutputDir } from './utils.js';

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

try{
    await cleanOutputDir('dist');
    await deleteFile('output.txt');
    await deleteFile('output.mp4');
} catch (e) {
    console.log('Failed to clean output directory');
}
await createOutputDir('dist');

const csvData = await getCSVData(csvPath);
await validateCSV(csvData);

const outputDirs = await Promise.all(csvData.map(async (row) => {
    return await cutVideo(row.video, row.start, row.end, row.video.replace("assets", "dist"));
}));

await recordOutputPath(outputDirs);

await mergeVideos('output.mp4');

console.log('Video has been cut and merged successfully');
