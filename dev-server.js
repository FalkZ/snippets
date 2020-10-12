const liveServer = require("live-server");
const fs = require("fs");
const { exec } = require("child_process");

var params = {
  port: 12345,
  host: "localhost",
  open: false,
  cors: true,
};

fs.watch(".", (type, file) => {
  console.log(type, file);
  if (type != "change" && file !== "index.js")
    exec("npm run build", (err, val) => {
      if (err) console.error(err);
      else console.log(val);
    });
});

liveServer.start(params);
