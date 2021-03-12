const creepFactory = require("./creepFactory");

let pathUtility = {
    findEnergyInRoom: function (creep) {
        return this.findInRoomByType(creep, FIND_SOURCES);
    },

    findController: function (creep) {
        return this.findStructureInRoomByType(creep, STRUCTURE_CONTROLLER);
    },

    findConstructionSite: function (creep) {
        return this.findInRoomByType(creep, FIND_CONSTRUCTION_SITES);
    },

    findInRoomByType: function (creep, type) {
        var targets = creep.room.find(type);
        if (targets && targets.length > 0) {
            var closest = creep.pos.findClosestByRange(targets);
            return closest;
        }
    },

    findStructureInRoomByType: function (creep, type) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == type);
            }
        });
        if (targets && targets.length > 0) {
            var closest = creep.pos.findClosestByRange(targets);
            return closest;
        }
    }
};

module.exports = pathUtility;