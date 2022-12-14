const fs = require("fs");

function date(_, write, done) {
  write(Date());
  done();
}
function pwd(_, write, done) {
  write(process.cwd());
  done();
}
function ls(_, write, done) {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    files.forEach(function (file, i) {
      write((i !== 0 ? "\n" : "") + file.toString());
    });
    done();
  });
}

function echo(args, write, done) {
  write(args.join(" "));
  done();
}

function cat(args, write, done) {
  logFile(args[0], write, done);
}

function head(args, write, done) {
  logFile(args[0], write, done, Number(args[1] || 5));
}

function tail(args, write, done) {
  logFile(args[0], write, done, Number(args[1] || 5) * -1);
}

function logFile(path, write, done, writeLines) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) throw err;
    let lines = data.split("\n");
    if (writeLines > 0) {
      lines = lines.slice(0, writeLines);
    } else if (writeLines < 0) {
      lines = lines.slice(writeLines);
    }

    lines.forEach((line, i) => {
      write((i !== 0 ? "\n" : "") + line);
    });
    done();
  });
}

function curl(args, write, done) {
  const request = require("request");
  request(args[0], (err, res, body) => {
    if (err) throw err;
    write(body);
    done();
  });
}

module.exports = {
  date,
  pwd,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
};
