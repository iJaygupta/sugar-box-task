# User CRUD API With JWT Authentication

## Payload For Register
Example of a User data JSON object:
```
{
    "name": "Andrei Dieu",
    "email": "andrei@gmail.com",
    "password": "1234",
    "addressLine": "128 A new pot",
    "city": "Virginia",
    "state": "Chula Vista",
    "zipCode": "32432",
    "phoneNo": "9876539832"
}
```

## Payload For Login
Example of a User data JSON object:
```
{
    "email": "andrei@gmail.com",
    "password": "1234"
}
```



**POST** request to `/api/v1/user/register`:
- returns success message with JSON of user detail

**POST** request to `/api/v1/user/login`:
- returns success message with JSON of user detail and token

**GET** request to `/api/v1/user/list`: with JWT token in authorization header
- returns a list of all users with pagination and sorting implemented

**GET** request to `/api/v1/user/<id>`: with JWT token in authorization header
- returns a JSON of user

**PUT** request to `/api/v1/user/<id>`: with JWT token in authorization header
- returns a JSON of updated user

**DELETE** request to `/api/v1/user/<id>`: with JWT token in authorization header
- returns a JSON of deleted user

## Environment 
- Node Version: ^12.18.2
- Default Port: 8000



**Commands**
- install: 
```bash
npm install
```

- start the server: 
```bash
npm start
```

- test: 
``
npm run test

```