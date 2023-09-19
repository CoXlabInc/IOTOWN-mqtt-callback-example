// -*- mode: js; js-indent-level: 2; indent-tabs-mode:nil; -*-
if (process.argv.length != 6) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} [URL] [username] [password] [group ID]`);
  process.exit(1);
}

const mqtt = require("mqtt");
var option = {
  username: process.argv[3],
  password: process.argv[4],
  rejectUnauthorized: false
};

const client = mqtt.connect(process.argv[2], option);

client.on("connect", () => {
  client.subscribe(`iotown/rx/${process.argv[5]}/device/+/data`, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`[${topic}] ${message}`);
});
