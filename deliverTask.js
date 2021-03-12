let pathUtility = require("pathUtility");
let taskStatus = require('taskStatus');

let deliverTask = {
    work: (creep, type) => {
        let usedCapacity = creep.store.getUsedCapacity();
        let readyForNextTask = usedCapacity === 0;
        if (readyForNextTask) {
            return taskStatus.complete;
        }
        var target = pathUtility.findController(creep);
        console.log(target);
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return taskStatus.working;
    }
};

module.exports = deliverTask;