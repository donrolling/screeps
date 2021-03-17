let pathUtility = require('utility.path');
let tasks = require('task.tasks');
let taskStatus = require('task.status');
let errorTypes = require('types.error');
let resourceTypes = require('types.resource');

let harvestTask = {
    work: function (creep) {
        // todo: later, sources may vary
        var source = pathUtility.findEnergyInRoom(creep);
        if (creep.harvest(source) == errorTypes.NotInRange) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        if (creep.memory.task === tasks.mine) {
            //console.log('miner drops resource');
            creep.drop(resourceTypes.Energy);
        }
        // let capacity = creep.store.getCapacity();
        // let usedCapacity = creep.store.getUsedCapacity();
        return creep.store.getFreeCapacity() === 0 ? taskStatus.complete : taskStatus.working;
    }
};

module.exports = harvestTask;