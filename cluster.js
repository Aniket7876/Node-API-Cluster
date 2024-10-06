const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length; // Get the number of CPU cores
const app = require("./src/app"); // Import your Express app

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers (specifying how many workers you want)
  const numWorkers = 2; // Set the number of workers you want
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork(); // Fork a worker for each specified count
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  const server = http.createServer(app);

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} started on port 3000`);
  });
}
