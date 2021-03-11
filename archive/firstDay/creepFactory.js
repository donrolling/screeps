var creepFactory = {
    create: function (spawner, creepQuota) {
        creepQuota.forEach(creepType => {
            if (creepType.count >= creepType.quota) {
                return;
            }
            var body = [WORK, CARRY, MOVE];
            var name = this.makeId(25);
            var opts1 = { role: creepType.type, workid: 1, dryRun: true };
            var opts2 = { role: creepType.type, workid: 1 };
            var canCreate = spawner.spawnCreep(body, name, opts1);
            if (canCreate === 0) {
                var spawning = spawner.spawning;
                if (!spawning) {
                    console.log('Creating new creep.');
                    spawner.spawnCreep(body, name, opts2);
                }
            }
        });
    },

    makeId: function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = creepFactory;