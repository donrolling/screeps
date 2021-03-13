let pathUtility = require("utility.path");
let taskStatus = require('task.status');

let deliverTask = {
    work: (creep, type) => {
        // var target = pathUtility.findController(creep);
        // console.log(target);
        if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return creep.store.getUsedCapacity() === 0
            ? taskStatus.complete
            : taskStatus.working;
    }
};

module.exports = deliverTask;