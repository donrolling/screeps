let pathUtility = require('../utilities/pathUtility');
let taskStatus = require('taskStatus');

let harvestTask = {
    work: (creep) => {
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
            creep.moveTo(source);
        }
        return taskStatus.working;
    }
};

module.exports = harvestTask;