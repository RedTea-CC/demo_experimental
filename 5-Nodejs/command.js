const { exec } = require('child_process');

// PowerShell 命令
const command = 'Stop-Process -Name "notepad" -Force';

// 执行 PowerShell 命令
exec(`powershell.exe -Command "${command}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});