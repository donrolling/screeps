let taskStatus = require('taskStatus');

let buildTask = {
    work: (creep, type) => {
        let usedCapacity = creep.store.getUsedCapacity();
        let readyForNextTask = usedCapacity === 0;
        if (readyForNextTask) {
            return taskStatus.complete;
        }
        var target = pathUtility.findInRoomByType(creep, constructionSites);
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return taskStatus.working;
    }
};

module.exports = buildTask;