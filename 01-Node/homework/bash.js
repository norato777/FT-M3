//console.log(Object.keys(process));

//process.stdout.write("prompt > ");
//
//process.stdin.on("data", function (data) {
//  var cmd = data.toString().trim();
//  process.stdout.write("You typed: " + cmd);
//  process.stdout.write("\nprompt > ");
//});

//const commands = require("./commands");

//process.stdout.write("prompt > ");
//
//process.stdin.on("data", function (data) {
//  var cmd = data.toString().trim();
//  if (cmd === "date") {
//    process.stdout.write(Date());
//  }
//  if (cmd === "pwd") {
//    process.stdout.write(process.cwd());
//  }
//  process.stdout.write("\nprompt > ");
//});

//====>

const commands = require("./commands");

function write(data) {
  process.stdout.write(data);
}

function done() {
  process.stdout.write("\nprompt > ");
}

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {
  var [cmd, ...args] = data.toString().trim().split(" ");

  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](args, write, done);
  } else {
    process.stdout.write(`Command ${cmd} not found.\n`);
    process.stdout.write("\nprompt > ");
  }
});
