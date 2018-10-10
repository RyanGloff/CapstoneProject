const TPS = 60;
const Direction = {
    UP: {
        dx: 0,
        dy: 1
    }, 
    RIGHT: {
        dx: 1,
        dy: 0
    }, 
    DOWN: {
        dx: 0,
        dy: -1
    }, 
    LEFT: {
        dx: -1,
        dy: 0
    },
    NO_DIRECTION: {
        dx: 0,
        dy: 0
    },
    turnRight: function (currentDir) {
        return turnMap[(turnMap.indexOf(currentDir) + 1) % 4];
    },
    turnLeft: function (currentDir) {
        return turnMap[((turnMap.indexOf(currentDir) - 1) + 4) % 4];
    },
    validTurn: function (currentDir, nextDir) {
        let startIndex = turnMap.indexOf(currentDir);
        let endIndex = turnMap.indexOf(nextDir);
        return Math.abs(startIndex - endIndex) % 2 !== 0;
    }
};
const turnMap = [
    Direction.UP,
    Direction.RIGHT,
    Direction.DOWN,
    Direction.LEFT
];
const Color = {
    YELLOW: 'YELLOW',
    RED: 'RED',
    GREEN: 'GREEN',
    BLUE: 'BLUE'
};
const PLAYER_VELOCITY = 0.1;

exports.Color = Color;
exports.Direction = Direction;
exports.TPS = TPS;
exports.PLAYER_VELOCITY = PLAYER_VELOCITY;
