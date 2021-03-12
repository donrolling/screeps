let foreman = require('foreman');
let tasks = require('tasks');
let hiringManager = require('hiringManager');

let spawnName = 'Spawn1';
let creepQuota = {
	spawnTask: tasks.harvest,
	quota: 5
};

module.exports.loop = () => {
	let spawner = Game.spawns[spawnName];
	hiringManager.hire(creepQuota, spawner);
	foreman.assignWork(spawner);
}