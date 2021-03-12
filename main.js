let foreman = require('foreman');
let tasks = require('tasks');
let hiringManager = require('hiringManager');

let spawnName = 'Spawn1';
let taskQuota = [
	{
		task: tasks.harvest,
		quota: 2
	},
	{
		task: tasks.deliver,
		quota: 2
	}
];

module.exports.loop = () => {
	let spawner = Game.spawns[spawnName];
	hiringManager.hire(taskQuota, spawner);
	foreman.assignWork(spawner);
}