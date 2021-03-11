let taskStatus = require('taskStatus');

let buildTask = {
    work: (creep, spawner) => {
        return taskStatus.complete;
    }
};

module.exports = buildTask;