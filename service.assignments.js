let pathUtility = require("utility.path");
let tasks = require('task.tasks');
let taskStatus = require('task.status');
let harvestTask = require('task.harvest');
let deliverTask = require('task.deliver');
let buildTask = require('task.build');
let energyTransportTask = require('task.energyTransport');
let memoryService = require('service.memory');
let announcementService = require('service.announcement');
let structureTypes = require('types.structure');
let findTypes = require('types.find');

let assignmentService = {
    assignWork: function (spawner) {
        memoryService.cleanUpMemory();
        announcementService.announceAssess();
        // find room controller, spawn and constructionSite only once per tick
        var first = true;
        let controller = null;
        let spawn = null;
        let constructionSite = null;
        let energyTransport = null;
        let extension = null;
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            // find room controller, spawn and constructionSite only once per tick
            if (first) {
                controller = pathUtility.findController(creep);
                spawn = pathUtility.findSpawner(creep);
                constructionSite = pathUtility.findConstructionSite(creep);
                energyTransport = pathUtility.findStorage(creep);
                extension = pathUtility.findExtension(creep);
                first = false;
            }
            let status = this.performWork(creep, controller, spawn, constructionSite, extension, energyTransport);
            if (status === taskStatus.complete) {
                this.reassignTask(creep);
            }
        }
    },

    performWork: function (creep, controller, spawn, constructionSite, extension, energyTransport) {
        announcementService.announce(creep);
        if (
            creep.memory.task === tasks.harvest
            || creep.memory.task === tasks.mine
        ) {
            return harvestTask.work(creep);
        }
        if (
            creep.memory.task === tasks.deliver
            || creep.memory.task === tasks.build
        ) {
            // todo: while spawn quotas aren't met, feed spawner, otherwise 
            // feed the controller, or construction
            // todo: split the work up in real time, not just while spawning
            // spawn quotas only get us part of the way
            if (constructionSite) {
                return buildTask.work(creep, constructionSite);
            } else {
                var sType = extension ? structureTypes.Extension : structureTypes.Controller;
                return deliverTask.work(creep, sType, controller, spawn, extension);
            }
        }
        if (creep.memory.task === tasks.energyTransport) {
            //return harvestTask.work(creep);
            return energyTransportTask.work(creep, energyTransport);
        }
    },

    reassignTask: function (creep) {
        // miners stay miners
        if (creep.memory.task === tasks.harvest) {
            creep.memory.task = tasks.energyTransport;
        } else if (creep.memory.task === tasks.deliver) {
            creep.memory.task = tasks.energyTransport;
        } else if (creep.memory.task === tasks.build) {
            creep.memory.task = tasks.energyTransport;
        } else if (creep.memory.task === tasks.energyTransport) {
            creep.memory.task = tasks.deliver;
        }
    }
};

module.exports = assignmentService;