var utilities = require('utilities');

var roleBuilder = {
	/** @param {Creep} creep **/
	run: function (creep) {
		var capacity = creep.store.getCapacity();
		var usedCapacity = creep.store.getUsedCapacity();
		var build = creep.memory.workid === 2;
		if (build) {
			var target = utilities.findConstructionSite(creep);
			if (target) {
				if (creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.say('build');
					creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
			if (usedCapacity === 0) {
				creep.memory.workid = 1;
				creep.say('harvest');
			}
		} else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.say('harvest');
				creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
			if (usedCapacity === capacity) {
				creep.memory.workid = 2;
				creep.say('build');
			}
		}
	}
};

module.exports = roleBuilder;