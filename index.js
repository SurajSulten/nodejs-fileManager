import readline from "readline";
import { stdin as input, stdout as output } from "process";
import fs from "fs";
import path from "path";
import { exec, execSync } from "child_process";
import os from "os";
// import { showCurrentDirectory, showInvalidInput } from "./utils";

const outputStream = fs.createWriteStream("./output.txt");
const rl = readline.createInterface({ input, output });
function showInvalidInput() {
  console.log('Invalid input');
}
function showCurrentDirectory() {
  console.log(process.cwd());
}

const username = process.argv[2].split("=")[1];
const homeDirectory = os.homedir();
// console.log("EOL ", os.arch());

process.chdir(homeDirectory);

console.log(`Welcome to the File Manager, ${username}!`);
showCurrentDirectory();

rl.on("line", (line) => {
  const args = line.split(" ");
  const command = args[0];
  const firstArgument = args[1];

  switch (command) {
    case "up":
      process.chdir("../");
      break;
    case "cd":
      try {
        if (!firstArgument) {
          showInvalidInput();
          break;
        }
        process.chdir(firstArgument);
      } catch (error) {
        console.error("Operation failed");
      }
      break;
    case "cat":
      if (!firstArgument) {
        showInvalidInput();
        break;
      }
      break;

    default:
      showInvalidInput();
      break;
  }

  showCurrentDirectory();
});

// rl.question(Welcome to the File Manager, ${username}!, (answer) => {
//     // TODO: Log the answer in a database
//     // console.log(Welcome to the File Manager, Username!);

//     // rl.close();
// });

rl.on("close", () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
});

// rl.close();
