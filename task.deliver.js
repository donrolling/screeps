let pathUtility = require("utility.path");
let taskStatus = require('task.status');

let deliverTask = {
    work: (creep, type) => {
        let usedCapacity = creep.store.getUsedCapacity();
        let readyForNextTask = usedCapacity === 0;
        if (readyForNextTask) {
            return taskStatus.complete;
        }
        // var target = pathUtility.findController(creep);
        // console.log(target);
        if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return taskStatus.working;
    }
};

module.exports = deliverTask;