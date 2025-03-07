const fs = require("fs");

const stream = fs.createReadStream("./src/content/subfolder/result.txt", {
  highWaterMark: 20,
  encoding: "utf8",
});

stream.on("data", (result) => console.log(result));
