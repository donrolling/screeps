let resourceTypes = require('types.resource');
let structureTypes = require('types.structure');
let findTypes = require('types.find');

let pathUtility = {
    findEnergyInRoom: function (creep) {
        return this.findInRoomByType(creep, findTypes.Sources);
    },

    findController: function (creep) {
        return creep.room.controller;
    },

    findExtension: function (creep) {
        var targets = creep.room.find(findTypes.Structures, {
            filter: (structure) => {
                if (structure.structureType != structureTypes.Extension) {
                    return;
                }
                if (structure.energy === structure.energyCapacity) {
                    return;
                }
                return structure;
            }
        });
        if (targets && targets.length > 0) {
            return targets[0];
        }
        return null;
    },

    findSpawner: function (creep) {
        return this.findStructureInRoomByType(creep, structureTypes.Spawn);
    },

    findConstructionSite: function (creep) {
        return this.findInRoomByType(creep, findTypes.ConstructionSites);
        // var targets = creep.room.find(findTypes.ConstructionSites);
        // if (targets && targets.length > 0) {
        //     var closest = creep.pos.findClosestByRange(targets);
        //     return closest;
        // }
    },

    findStorage: function (creep) {
        return creep.pos.findClosestByRange(findTypes.Structures, {
            filter: (structure) => structure.structureType == structureTypes.Storage
        });
    },

    findInRoomByType: function (creep, type) {
        var targets = creep.room.find(type);
        if (targets && targets.length > 0) {
            var closest = creep.pos.findClosestByRange(targets);
            return closest;
        }
    },

    findStructureInRoomByType: function (creep, type) {
        var targets = creep.room.find(findTypes.Structures, {
            filter: (structure) => {
                return structure.structureType === type;
            }
        });
        if (targets && targets.length > 0) {
            var closest = creep.pos.findClosestByRange(targets);
            return closest;
        }
        return null;
    }
};

module.exports = pathUtility;