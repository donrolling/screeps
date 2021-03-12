let creepFactory = require('creepFactory');

let hiringManager = {
    schedule: {
        counter: 0,
        wait: 10
    },

    doWork: function () {
        let result = false;
        if (this.schedule.counter >= this.schedule.wait) {
            result = true;
            this.schedule.counter = 0;
        } else {
            this.schedule.counter++;
        }
        return result;
    },

    hire: function (taskQuota, spawner) {
        // don't do anything if we're already processing a new hire
        let shouldDoWork = this.doWork();
        if (!shouldDoWork) {
            return;
        }
        if (spawner.spawning) {
            console.log('not spawing now');
            return;
        }
        // foreach task in the quota
        for (let index = 0; index < taskQuota.length; index++) {
            let q = taskQuota[index];
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