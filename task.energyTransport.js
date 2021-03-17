let taskStatus = require('task.status');
let errorTypes = require('types.error');
let resourceTypes = require('types.resource');
let structureTypes = require('types.structure');

let energyTransportTask = {
    work: (creep) => {
        const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (!target) {
            return taskStatus.working;
        }
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            return taskStatus.working;
        }
        if (creep.store.getFreeCapacity() === 0) {
            return taskStatus.complete;
        }
        return taskStatus.working;
    }
};

module.exports = energyTransportTask;