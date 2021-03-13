let taskStatus = require('task.status');

let buildTask = {
    work: (creep, type) => {
        var target = pathUtility.findInRoomByType(creep, constructionSites);
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return creep.store.getUsedCapacity() === 0
            ? taskStatus.complete
            : taskStatus.working;
    }
};

module.exports = buildTask;