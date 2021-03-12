let creepFactory = require('creepFactory');
let tasks = require('tasks');

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

    hire: function (creepQuota, spawner) {
        // don't do anything if we're already processing a new hire
        let shouldDoWork = this.doWork();
        if (!shouldDoWork) {
            return;
        }
        if (spawner.spawning) {
            console.log('not spawing now');
            return;
        }
        // figure out how many to create
        let count = _.sum(Game.creeps, (c) => {
            return (
                c.memory.task === tasks.harvest
                || c.memory.task === tasks.deliver
            )
        });
        let diff = creepQuota.quota - count;
        // create them
        for (let index = 0; index < diff; index++) {
            creepFactory.create(spawner, creepQuota.spawnTask);
        }
    }
};

module.exports = hiringManager;