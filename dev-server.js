const liveServer = require("live-server");
const fs = require("fs");
const { exec } = require("child_process");

var params = {
  port: 12345,
  host: "localhost",
  open: false,
  cors: true,
};

const updateIndex = () =>
  exec("npm run build", (err, val) => {
    if (err) console.error(err);
    else console.log(val);
  });

fs.watch(".", (type, file) => {
  if (type != "change" && file !== "index.js") updateIndex();
});

updateIndex();
liveServer.start(params);
