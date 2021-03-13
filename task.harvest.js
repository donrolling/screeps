let pathUtility = require('utility.path');
let taskStatus = require('task.status');

let harvestTask = {
    work: function (creep) {
        // todo: later, sources may vary
        var source = pathUtility.findEnergyInRoom(creep);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        // let capacity = creep.store.getCapacity();
        // let usedCapacity = creep.store.getUsedCapacity();
        return creep.store.getFreeCapacity() === 0 ? taskStatus.complete : taskStatus.working;
    }
};

module.exports = harvestTask;