let memoryService = {
    // could build a list of creeps to rehire
    cleanUpMemory: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    // hopefully won't need this...had an issue early on where I had to reset creep brains
    resetMemory: function (creepName) {
        var memory = JSON.stringify(Memory.creeps[creepName]);
        console.log('memory: ' + memory);
        if (memory === '{}') {
            console.log('creep does not have memory');
            Memory.creeps[creepName] = { role: 'builder', workid: 1 }
        } else {
            console.log('creep has memory');
        }
    }
}

module.exports = memoryService;