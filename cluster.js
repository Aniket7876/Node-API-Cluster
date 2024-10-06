const cluster = require("cluster");
const http = require("http");
const app = require("./src/app");

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
 
  const numWorkers = 2;
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork(); 
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer(app);

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} started on port 3000`);
  });
}
