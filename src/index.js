const fs = require("fs");
const path = require("path");

(function init() {
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf-8"));
  const mobileDevices = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/mobile_devices.json"), "utf-8"));
  const iotDevices = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/iot_devices.json"), "utf-8"));

  console.log(new Date().toISOString());
  console.log(count(users, mobileDevices, iotDevices));
  console.log(new Date().toISOString());
})();

function count(users, mobileDevices, iotDevices) {

  const user = users.map(u => {
    return { name: u.name.split(' ', 1), nameId: u.id };
  });

  const mobile = mobileDevices.map(m => {
    return { mobileId: m.id, userId: m.user };
  });

  const iot = iotDevices.map(i => {
    return { iotId: i.id, mobileId: i.mobile };
  });

  const iotWithUsers = [];

  for (let i = 0; i < iot.length; i++) {
    for (let j = 0; j < mobile.length; j++) {
      for (let k = 0; k < user.length; k++) {
        if (iot[i].mobileId === mobile[j].mobileId && mobile[j].userId === user[k].nameId) {
          iotWithUsers.push({ iotId: iot[i].iotId, iotMobileId: iot[i].mobileId, mobileId: mobile[j].mobileId, mobileUserId: mobile[j].userId, userId: user[k].nameId, name: user[k].name })
        }
      }
    }
  }

  const names = [];
  iotWithUsers.map(i => {
    names.push(i.name.toString());
    return names;
  });

  countNames = {};

  names.forEach(name => {
    countNames[name] = (countNames[name] || 0) + 1
  });

  return countNames;
}