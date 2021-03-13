let pathUtility = require('utility.path');
let taskStatus = require('task.status');

let harvestTask = {
    work: function (creep) {
        // let capacity = creep.store.getCapacity();
        // let usedCapacity = creep.store.getUsedCapacity();
        let freeCapacity = creep.store.getFreeCapacity();
        let readyForNextTask = freeCapacity === 0;
        if (readyForNextTask) {
            return taskStatus.complete;
        }
        // todo: later, sources may vary
        var source = pathUtility.findEnergyInRoom(creep);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        return taskStatus.working;
    }
};

module.exports = harvestTask;