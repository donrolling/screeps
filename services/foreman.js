let tasks = require('../tasks/tasks');
let taskStatus = require('../tasks/taskStatus');
let harvestTask = require('../tasks/harvestTask');
let deliverTask = require('../tasks/deliverTask');
let buildTask = require('../tasks/buildTask');

let foreman = {
    assignWork: (spawner) => {
        this.fireSlackers();
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            let status = this.performWork(creep, spawner);
            if (status === taskStatus.complete) {
                this.reassignTask(creep);
            }
        }
    },

    performWork: (creep, spawner) => {
        if (creep.memory.task === tasks.harvest) {
            return harvestTask.work(creep);
        }
        if (creep.memory.task === tasks.deliver) {
            // todo: later, delivery can be done to many sources
            return deliverTask.work(creep, spawner);
        }
        if (creep.memory.task === tasks.build) {
            return buildTask.work(creep);
        }
    },

    reassignTask: (creep) => {
        if (creep.memory.task === tasks.harvest) {
            // todo: for now all harvesters become delivery guys
            creep.memory.task = tasks.deliver;
        }
        if (creep.memory.task === tasks.deliver) {
            creep.memory.task = tasks.harvest;
        }
        if (creep.memory.task === tasks.build) {
            creep.memory.task = tasks.harvest;
        }
    },

    // could build a list of creeps to rehire
    fireSlackers: () => {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
};

module.exports = foreman;