let creepFactory = require('../factories/creepFactory');

let hiringManager = {
    hire: (taskQuota, spawner) => {
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