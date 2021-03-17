let taskStatus = require('task.status');
let errorTypes = require('types.error');

let buildTask = {
    work: (creep, constructionSite) => {
        if (creep.build(constructionSite) == errorTypes.NotInRange) {
            creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } });
        }
        return creep.store.getUsedCapacity() === 0
            ? taskStatus.complete
            : taskStatus.working;
    }
};

module.exports = buildTask;