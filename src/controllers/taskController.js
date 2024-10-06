const { logTaskCompletion } = require('../utils/logger');

async function task(user_id) {
  const timestamp = Date.now();
  console.log(`${user_id} - task completed at ${timestamp}`);
  await logTaskCompletion(user_id, timestamp); // Log to a file
}

module.exports = {
  async processTask(req, res) {
    const { user_id } = req.body;

    try {
      await task(user_id);
      res.status(200).json({ message: 'Task completed successfully' });
    } catch (error) {
      console.error('Error processing task:', error);
      res.status(500).json({ error: 'Task processing failed' });
    }
  },
};
