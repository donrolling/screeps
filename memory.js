var memory = {
    cleanup: function () {
        for (var creep in Memory.creeps) {

            if (Game.creeps[creep]) {
                continue; // Ignore when creep is found alive
            }

            console.log('deleting creep ' + creep);
            delete Memory.creeps[creep];
        }
    },

    reset: function () {
        for (var creep in Memory.creeps) {

            if (!Game.creeps[creep]) {
                continue; // Ignore when creep is not found
            }

            var memory = JSON.stringify(Memory.creeps[creep]);
            console.log('memory: ' + memory);
            if (memory === '{}') {
                console.log('creep does not have memory');
                Memory.creeps[creep] = { role: 'builder', workid: 1 };
            } else {
                console.log('creep has memory');
            }
        }
    }
}

module.exports = memory;