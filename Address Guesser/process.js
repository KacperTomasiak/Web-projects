import * as fs from "fs";
import { ethers } from "ethers";

const address = "0x1294d100B7B7163e86A13213F434164010D190e7";
let words = fs
  .readFileSync("bip39.txt", { encoding: "utf-8", flag: "r" })
  .replace(/(\r)/gm, "")
  .toLowerCase()
  .split("\n");

const generateSeed = (words) => {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  
  let possibleSeed = ["rival", "grass", "start", "squeeze", "success", "craft", "surround",
  "series", "yard", ["test", "taxi"], `${randomWord}`, "wealth"];

  let seed = [];

  for (let i = 0; i < possibleSeed.length; i++) {
    if (typeof possibleSeed[i] == "string") {
      seed.push(possibleSeed[i]);
    } else {
      seed.push(
        possibleSeed[i][Math.floor(Math.random() * possibleSeed[i].length)]
      );
    }
  }

  return seed.join(" ");
};

const checkAddress = async () => {
  try {
    let seed = generateSeed(words);
    let wallet = ethers.Wallet.fromPhrase(seed);
    process.stdout.write("+");
    if (wallet.address == address) {
      process.stdout.write("*");
      fs.writeFileSync(
        "wallet.txt",
        wallet.address + " / " + wallet.privateKey + " / " + seed
      );
    }
  } catch (exception) {}
  process.stdout.write("-");
};

setInterval(checkAddress, 0);