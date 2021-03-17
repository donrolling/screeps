let taskStatus = require('task.status');
let errorTypes = require('types.error');
let resourceTypes = require('types.resource');
let structureTypes = require('types.structure');

let deliverTask = {
    work: (creep, type, controller, spawn, extension) => {
        if (type === structureTypes.Controller) {
            if (creep.upgradeController(controller, resourceTypes.Energy) == errorTypes.NotInRange) {
                creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return creep.store.getUsedCapacity() === 0
                ? taskStatus.complete
                : taskStatus.working;
        } else if (type === structureTypes.Spawn) {
            if (creep.transfer(spawn, resourceTypes.Energy) == errorTypes.NotInRange) {
                creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return creep.store.getUsedCapacity() === 0
                ? taskStatus.complete
                : taskStatus.working;
        } else if (type === structureTypes.Extension) {
            if (creep.transfer(extension, resourceTypes.Energy) == errorTypes.NotInRange) {
                creep.moveTo(extension, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            // todo: figure out completion
            return taskStatus.complete;
            // return extension.energy === extension.energyCapacity
            //     ? taskStatus.complete
            //     : taskStatus.working;
        }
    }
};

module.exports = deliverTask;