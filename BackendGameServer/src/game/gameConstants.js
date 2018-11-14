const TPS = 60;
const mapSize = 5000;
const playerWidth = 20;
const playerHeight = 50;
const PLAYER_VELOCITY = 3.5;
const Direction = {
    UP: {
        dx: 0,
        dy: 1,
        str: 'UP'
    }, 
    RIGHT: {
        dx: 1,
        dy: 0,
        str: 'RIGHT'
    }, 
    DOWN: {
        dx: 0,
        dy: -1,
        str: 'DOWN'
    }, 
    LEFT: {
        dx: -1,
        dy: 0,
        str: 'LEFT'
    },
    NO_DIRECTION: {
        dx: 0,
        dy: 0,
        str: 'NO_DIRECTION'
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
const StartingPositions = [
    { x: 0,
      y: (mapSize / 2 - 100),
      direction: Direction.DOWN,
      color: Color.YELLOW  },
    { x: (mapSize / 2 - 100),
      y: 0,
      direction: Direction.LEFT,
      color: Color.RED },
    { x: 0,
      y: -(mapSize / 2 - 100),
      direction: Direction.UP,
      color: Color.GREEN  },
    { x: -(mapSize / 2 - 100),
      y: 0,
      direction: Direction.RIGHT,
      color: Color.BLUE  }
]

exports.Color = Color;
exports.Direction = Direction;
exports.TPS = TPS;
exports.PLAYER_VELOCITY = PLAYER_VELOCITY;
exports.StartingPositions = StartingPositions;
exports.playerHeight = playerHeight;
exports.playerWidth = playerWidth;
exports.mapSize = mapSize;
