let tasks = require('task.tasks');
let assignmentsService = require('service.assignments');
let spawningService = require('service.spawning');

let spawnName = 'Spawn1';
// {
// 	spawnTask: tasks.harvest,
// 	quota: 4
// },	{
// 	spawnTask: tasks.energyTransport,
// 	quota: 4
// }
let creepQuota = [
	{
		spawnTask: tasks.energyTransport,
		quota: 1
	},
	{
		spawnTask: tasks.mine,
		quota: 3
	}
];

module.exports.loop = () => {
	let spawner = Game.spawns[spawnName];
	spawningService.hire(creepQuota, spawner);
	assignmentsService.assignWork(spawner);
}