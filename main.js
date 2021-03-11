let foreman = require('foreman');
let hiringManager = require('hiringManager');

let spawnName = 'Spawn1';
let taskQuota = [
	{
		task: task.harvest,
		quota: 2
	},
	{
		task: task.deliver,
		quota: 2
	}
];

module.exports.loop = () => {
	let spawner = Game.spawns[spawnName];
	hiringManager.hire(taskQuota, spawner);
	foreman.assignWork(spawner);
}