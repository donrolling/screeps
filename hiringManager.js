let creepFactory = require('creepFactory');

let hiringManager = {
    hire: (taskQuota, spawner) => {
        // don't do anything if we're already processing a new hire
        if (spawner.spawning) {
            return;
        }
        // foreach task in the quota
        for (let q in taskQuota) {
            // get the creeps doing those tasks
            let taskCreeps = _.filter(Game.creeps, (creep) => creep.memory.task === q.task);
            // figure out how many to create
            let diff = q.quota;
            if (taskCreeps) {
                diff = q.quota - taskCreeps.length;
            }
            // create them
            for (let index = 0; index < diff; index++) {
                creepFactory.create(spawner, q.task);
            }

        }
    }
};

module.exports = hiringManager;