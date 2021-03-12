let tasks = require('tasks');
let taskStatus = require('taskStatus');
let harvestTask = require('harvestTask');
let deliverTask = require('deliverTask');
let buildTask = require('buildTask');

let foreman = {
    announcementSchedule: {
        on: true,
        counter: 0,
        for: 5,
        wait: 50
    },

    assignWork: function (spawner) {
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

    performWork: function (creep, spawner) {
        this.announce(creep);
        console.log(creep.memory.task);
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

    announce: function (creep) {
        if (this.announcementSchedule.on) {
            creep.say(creep.memory.task);
        }
    },

    announceAssess: function () {
        if (this.announcementSchedule.on) {
            this.announcementSchedule.counter++;
            if (this.announcementSchedule.for >= this.announcementSchedule.counter) {
                this.announcementSchedule.on = false;
                this.announcementSchedule.counter = 0;
            }
        } else {
            this.announcementSchedule.counter++;
            if (this.announcementSchedule.wait >= this.announcementSchedule.counter) {
                this.announcementSchedule.on = true;
                this.announcementSchedule.counter = 0;
            }
        }
    },

    reassignTask: function (creep) {
        if (creep.memory.task === tasks.harvest) {
            // todo: for now all harvesters become delivery guys
            creep.memory.task = tasks.deliver;
        } else if (creep.memory.task === tasks.deliver) {
            creep.memory.task = tasks.harvest;
        } else if (creep.memory.task === tasks.build) {
            creep.memory.task = tasks.harvest;
        }
    },

    // could build a list of creeps to rehire
    fireSlackers: function () {
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
                Memory.creeps[creep] = { role: 'builder', workid: 1 }
            } else {
                console.log('creep has memory');
            }
        }
    }
};

module.exports = foreman;