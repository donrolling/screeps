let announcementService = {
    schedule: {
        on: true,
        counter: 0,
        for: 5,
        wait: 10
    },

    announce: function (creep) {
        if (this.schedule.on) {
            creep.say(creep.memory.task);
        }
    },

    announceAssess: function () {
        if (this.schedule.on) {
            this.schedule.counter++;
            if (this.schedule.counter >= this.schedule.for) {
                this.schedule.on = false;
                this.schedule.counter = 0;
            }
        } else {
            this.schedule.counter++;
            if (this.schedule.counter >= this.schedule.wait) {
                this.schedule.on = true;
                this.schedule.counter = 0;
            }
        }
    }
};

module.exports = announcementService;