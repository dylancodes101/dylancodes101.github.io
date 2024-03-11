const { spawn } = require('child_process');

// Spawn a Python process
const pythonProcess = spawn('python', ['main.py']);

// Send data to Python process
pythonProcess.stdin.write('Hello from Node.js!\n');
pythonProcess.stdin.end();

// Listen for output from Python process
pythonProcess.stdout.on('data', (data) => {
    console.log(`Received from Python: ${data}`);
});

// Handle errors
pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python: ${data}`);
});

// Handle process exit
pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
});
