let taskStatus = require('taskStatus');

let deliverTask = {
    work: (creep, spawner) => {
        //let capacity = creep.store.getCapacity();
        let usedCapacity = creep.store.getUsedCapacity();
        let readyForNextTask = usedCapacity === 0;
        if (readyForNextTask) {
            return taskStatus.complete;
        }
        if (spawner.energy >= spawner.energyCapacity) {
            // todo: figure out what I should do in this case
            return taskStatus.working;
        }
        if (creep.transfer(spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawner, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return taskStatus.working;
    }
};

module.exports = deliverTask;