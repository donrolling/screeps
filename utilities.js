var utilities = {
    findController: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTROLLER);
            }
        });
        if (targets.length > 0) {
            return targets[0];
        }
    },

    findConstructionSite: function (creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets && targets.length > 0) {
            return targets[0];
        }
    }
}

module.exports = utilities;