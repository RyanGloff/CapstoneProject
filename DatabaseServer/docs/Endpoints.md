# Endpoints
## /users
- Get all users: 
```
curl http://localhost:8081/users
```
- Get user by id: 
```
curl http://localhost:8081/users/1
```
- Post new user: 
```
curl -d "{\"id\": 1, \"username\": \"testUsername\", \"password\": \"testPassword\", \"firstName\": \"test\", \"lastName\": \"testLastname\", \"email\": \"test@email.com\"}" -H "Content-Type: application/json" -X POST http://localhost:8081/users
```
- Delete all users: 
```
curl -X DELETE http://localhost:8081/users
```
- Delete user by id:
```
curl -X DELETE http://localhost:8081/users/1
```

## /games
- Get all games: 
```
curl http://localhost:8081/games
```
- Get game by id: 
```
curl http://localhost:8081/games/1
```
- Post new game: 
```
curl -d "{\"id\": 3, \"timeStarted\": 70000, \"users\": [1, 2, 3, 4], \"results\": [1, 3, 2, 4], \"timeLasted\": [100, 75, 80, 10]}" -H "Content-Type: application/json" -X POST http://localhost:8081/games
```
- Delete all games: 
```
curl -X DELETE http://localhost:8081/games
```
- Delete game by id:
```
curl -X DELETE http://localhost:8081/games/1
```