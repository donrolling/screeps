let tasks = require('../tasks/tasks');
let taskStatus = require('../tasks/taskStatus');
let harvestTask = require('../tasks/harvestTask');
let deliverTask = require('../tasks/deliverTask');
let buildTask = require('../tasks/buildTask');

let announcements = {
    on: true,
    counter: 0,
    for: 5,
    wait: 10
};

let foreman = {
    assignWork: (spawner) => {
        this.fireSlackers();
        this.announceAssess();
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            let status = this.performWork(creep, spawner);
            if (status === taskStatus.complete) {
                this.reassignTask(creep);
            }
        }
    },

    performWork: (creep, spawner) => {
        this.announce(creep);
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

    announce: (creep) => {
        if (this.announcements.on) {
            creep.say(creep.memory.task);
        }
    },

    announceAssess: () => {
        if (this.announcements.on) {
            this.announcements.counter++;
            if (this.announcements.for >= this.announcements.counter) {
                this.announcements.on = false;
                this.announcements.counter = 0;
            }
        } else {
            this.announcements.counter++;
            if (this.announcements.wait >= this.announcements.counter) {
                this.announcements.on = true;
                this.announcements.counter = 0;
            }
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
    },

    // hopefully won't need this...had an issue early on where I had to reset creep brains
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
};

module.exports = foreman;