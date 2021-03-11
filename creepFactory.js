let tasks = require('tasks');
let nameLength = 15;

let creepFactory = {
    create: (spawner, task) => {
        let name = this.createName(nameLength);
        let attributes = this.getAttributesByTask(task);
        spawner.spawnCreep(attributes, name, { memory: { task: task } });
        var canCreate = spawner.spawnCreep(attributes, name, { memory: { task: task, dryRun: true } });
        if (canCreate === 0) {
            var spawning = spawner.spawning;
            if (!spawning) {
                console.log(`Creating ${name} - ${task}.`, attributes);
                spawner.spawnCreep(attributes, name, { memory: { task: task } });
            }
        }
    },

    createName: (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    getAttributesByTask: (task) => {
        if (task == tasks.harvest) {
            return [WORK, CARRY, MOVE];
        }
        if (task == tasks.deliver) {
            return [WORK, CARRY, MOVE];
        }
        if (task == tasks.build) {
            return [WORK, CARRY, MOVE];
        }
    }
};

module.exports = creepFactory;