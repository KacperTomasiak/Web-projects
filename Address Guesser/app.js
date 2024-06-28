import * as fs from "fs";
import { fork } from "child_process";
import devnull from "dev-null";
import logUpdate from "log-update";
import os from "os";

let processes = [];
let tries = 0;
let hits = 0;
const threads = os.cpus().length * 2;
let time = 0;

fs.writeFileSync("wallet.txt", "");

const countTime = () => {
  const days = Math.floor(time / (24 * 60 * 60));
  const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

for (let i = 0; i < threads; i++) {
  processes[i] = fork("process.js", [], { detatched: false, stdio: "pipe" });
  processes[i].stdout.on("data", (data) => {
    if (data == "+") {
      hits++;
      tries++;
    } 
    if (data == "-") {
      tries++;
    }
    if (data == "*") {
      processes.forEach((process) => {
        process.kill("SIGTERM");
      });
      clearInterval(interval);

      let info = fs
      .readFileSync("wallet.txt", { encoding: "utf-8" })
      .toLowerCase()
      .split(" / ");
      
      console.log(`Address: ${info[0]}`);
      console.log(`Private Key: ${info[1]}`);
      console.log(`Seed phrase: ${info[2]}`);
    }
  }).pipe(devnull());
}

process.on("SIGTERM", () => {
  processes.forEach((process) => {
    process.kill("SIGTERM");
  });
});

let interval = setInterval(() => {
  time += 0.01;
  logUpdate(`Speed: ${(tries / time).toFixed(2)} addresses/s | Tries: ${tries} and Hits: ${hits} | ${countTime(time)}`);
}, 10);
