let pathUtility = {
    // todo: should find nearest
    findEnergyInRoom: () => {
        var sources = creep.room.find(FIND_SOURCES);
        var closest = creep.pos.findClosestByRange(sources);
        return closest;
        //creep.room.find(FIND_SOURCES)[0];
    }
};

module.exports = pathUtility;