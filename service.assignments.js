let tasks = require('task.tasks');
let taskStatus = require('task.status');
let harvestTask = require('task.harvest');
let deliverTask = require('task.deliver');
let buildTask = require('task.build');
let memoryService = require('service.memory');
let announcementService = require('service.announcement');

let assignmentService = {
    assignWork: function (spawner) {
        memoryService.cleanUpMemory();
        announcementService.announceAssess();
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            let status = this.performWork(creep);
            if (status === taskStatus.complete) {
                this.reassignTask(creep);
            }
        }
    },

    performWork: function (creep) {
        announcementService.announce(creep);
        if (creep.memory.task === tasks.harvest) {
            return harvestTask.work(creep);
        }
        if (creep.memory.task === tasks.deliver) {
            //StructureExtension
            //FIND_CONSTRUCTION_SITES
            // todo: later, delivery can be done to many sources
            return deliverTask.work(creep, STRUCTURE_CONTROLLER);
        }
        if (creep.memory.task === tasks.build) {
            return buildTask.work(creep, FIND_CONSTRUCTION_SITES);
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
    }
};

module.exports = assignmentService;