const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const logFilePath = path.join(__dirname, '../../log/task.log');
const appendFileAsync = promisify(fs.appendFile);

async function logTaskCompletion(user_id, timestamp) {
  const logMessage = `${user_id} - task completed at ${new Date(timestamp).toISOString()}\n`;
  await appendFileAsync(logFilePath, logMessage);
}

module.exports = { logTaskCompletion };
