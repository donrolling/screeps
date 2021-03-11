var utilities = require('utilities');

var roleHarvester = {
    run: function (creep) {
        var capacity = creep.store.getCapacity();
        var usedCapacity = creep.store.getUsedCapacity();
        var collect = creep.memory.workid === 1;
        if (collect) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.say('harvest');
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            if (usedCapacity === capacity) {
                creep.memory.workid = 2;
            }
        } else {
            var target = utilities.findController(creep);
            if (target) {
                creep.memory.workid = 2;
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('deliver');
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            if (usedCapacity === 0) {
                creep.memory.workid = 1;
            }
        }
    }
};

module.exports = roleHarvester;