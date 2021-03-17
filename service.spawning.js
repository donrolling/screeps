let creepFactory = require('factory.creep');
let tasks = require('task.tasks');

let spawningService = {
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
        //figure out which one to spawn
        let creepMap = creepQuota.map(a => {
            let count = _.sum(Game.creeps, (c) => {
                return c.memory.task === a.spawnTask
            });
            let diff = a.quota - count;
            return { spawnTask: a.spawnTask, count: count, diff: diff };
        }).filter(a => a.diff > 0);
        if (!creepMap) {
            return;
        }
        // find the one with the biggest diff
        let length = creepMap.length;
        // this sorts ascending, so just grab the last one
        let highest = creepMap.sort((a, b) =>
            (a.diff > b.diff)
                ? 1
                : (
                    (b.diff > a.diff)
                        ? -1
                        : 0
                )
        )[length - 1];
        if (highest && highest.diff > 0) {
            console.log(
                'Should Spawn a ' + highest.spawnTask,
                JSON.stringify(highest),
                JSON.stringify(creepMap)
            );
            creepFactory.create(spawner, highest.spawnTask);
        }
    }
};

module.exports = spawningService;