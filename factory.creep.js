let tasks = require('task.tasks');
let nameLength = 15;

let creepFactory = {
    create: function (spawner, task) {
        let name = this.createName(nameLength);
        let attributes = this.getAttributesByTask(task);
        if (!attributes) {
            return;
        }
        spawner.spawnCreep(attributes, name, { memory: { task: task } });
        var canCreate = spawner.spawnCreep(attributes, name, { memory: { task: task, dryRun: true } });
        if (canCreate === 0) {
            var spawning = spawner.spawning;
            if (!spawning) {
                console.log(`Creating ${name} - ${task}.`, attributes);
                spawner.spawnCreep(attributes, name, { memory: { task: task } });
            }
        } else {
            console.log(`Can't create ${name} - ${task}.`, attributes, canCreate);
        }
    },

    // constant	value	description
    // OK	0	
    // The operation has been scheduled successfully.

    // ERR_NOT_OWNER	-1	
    // You are not the owner of this spawn.

    // ERR_NAME_EXISTS	-3	
    // There is a creep with the same name already.

    // ERR_BUSY	-4	
    // The spawn is already in process of spawning another creep.

    // ERR_NOT_ENOUGH_ENERGY	-6	
    // The spawn and its extensions contain not enough energy to create a creep with the given body.

    // ERR_INVALID_ARGS	-10	
    // Body is not properly described or name was not provided.

    // ERR_RCL_NOT_ENOUGH	-14	
    // Your Room Controller level is insufficient to use this spawn.

    createName: function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    getAttributesByTask: function (task) {
        if (task == tasks.mine) {
            return [WORK, WORK, WORK, MOVE, MOVE];
        }
        if (task == tasks.energyTransport) {
            //return [CARRY, CARRY, MOVE, MOVE];
        }
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