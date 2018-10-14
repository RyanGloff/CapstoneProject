function Game (id, startTime, users, results, timeLasted) {
    this.id = id;
    this.startTime = startTime;
    this.users = users;
    this.results = results;
    this.timeLasted = timeLasted;
}

exports.Game =  Game;