import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = platform() === 'win32';

const serverDir = path.join(__dirname, 'server');
const activateScript = isWindows
  ? `${serverDir}\\env\\Scripts\\activate`
  : `source ${serverDir}/env/bin/activate`;
const pythonScript = path.join(serverDir, 'app.py');

const command = isWindows
  ? `cmd /c "${activateScript} && python ${pythonScript}"`
  : `${activateScript} && python ${pythonScript}`;

  const backendProcess = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});

backendProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});
backendProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});
