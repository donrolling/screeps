let tasks = require('task.tasks');
let assignmentsService = require('service.assignments');
let spawningService = require('service.spawning');

let spawnName = 'Spawn1';
let creepQuota = {
	spawnTask: tasks.harvest,
	quota: 5
};

module.exports.loop = () => {
	let spawner = Game.spawns[spawnName];
	spawningService.hire(creepQuota, spawner);
	assignmentsService.assignWork(spawner);
}