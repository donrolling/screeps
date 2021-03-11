var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var memory = require('memory');
var creepFactory = require('creepFactory');
var minCreeps = 5;
var spawnerName = "Spawn1";
var creepTypes = ["harvester", "builder", "upgrader"];
var creepQuota = [
    {
        type: creepTypes[0],
        quota: 5,
        count: 0
    },
    {
        type: creepTypes[1],
        quota: 3,
        count: 0
    },
    {
        type: creepTypes[2],
        quota: 0,
        count: 0
    }
];

module.exports.loop = function () {
    creepQuota[0].count = 0;
    creepQuota[1].count = 0;
    creepQuota[2].count = 0;
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            creepQuota[0].count++;
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            creepQuota[1].count++;
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            creepQuota[2].count++;
        }
    }

    memory.cleanup();
    //memory.reset();

    var spawner = Game.spawns[spawnerName];
    creepFactory.create(spawner, creepQuota);
}