let users = require("./users.json");
let usersObj = users.reduce(function (acc, currentValue, currentIndex, arr){

    acc[currentValue.userId] = currentValue;
    return acc;


}, {});

module.exports = usersObj;