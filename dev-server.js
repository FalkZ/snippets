var liveServer = require("live-server");
const { writeIndex } = require("create-index");
const fs = require("fs");

var params = {
  port: 12345,
  host: "localhost",
  open: false,
};

fs.watch(".", (type, file) => {
  console.log(type, file);
  if (file !== "index.js") writeIndex(["."]);
});

liveServer.start(params);
