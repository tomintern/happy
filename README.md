happy ![v1.1.1](https://img.shields.io/badge/version-1.2.0-green.svg)
---

[![Build Status](https://travis-ci.org/Phonbopit/happy.svg?branch=master)](https://travis-ci.org/Phonbopit/happy)

**happy** : A minimal [hapijs](http://hapijs.com/) API.

Hapijs Authentication with [JWT](https://jwt.io/) with [Boom](https://github.com/hapijs/boom), [Joi](https://github.com/hapijs/joi), [Good](https://github.com/hapijs/good), [Code](https://github.com/hapijs/code) and [Lab](https://github.com/hapijs/lab)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

## Usage

Clone a repository

```
git clone https://github.com/Phonbopit/happy.git
cd happy
npm run setup
```

Then, start a server

```
npm start

# Dev mode require nodemon
npm run dev

# Test
npm test

```

## Endpoint

- [/auth/register](#register)
- [/auth/login](#login)
- [/me](#me)
- [/users](#users)
- [/users/{userId}](#userId)

### Register

```
/auth/regitser
```

| Name | Type | Required | Default |
|----------|------|------|--------|
| email | String | Yes | - |
| password | String | Yes | - |
| name  | String | No | - |

```
curl -i -H 'Content-Type: application/json' \
-H "Accept: application/json" \
-X POST \
-d '{ "email": "chai@example.com", "password": "mypassword"}' \
http://localhost:8000/auth/register
```

Example success response

```
{
  "message": "Register successfully",
  "data": {
    "profile": {
      "id": "572c581eacc20039eda1cf65",
      "email": "chai@example.com",
      "name": ""
    },
    "accessToken": "eyJ..."
  }
}
```

Example failure response

```
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"password\" is required"
}
```

or 

```
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"some_name\" is not allowed"
}
```

### Login

```
/auth/login
```

| Name | Type | Required | Default |
|----------|------|------|--------|
| email | String | Yes | - |
| password | String | Yes | - |

```
curl -i -H 'Content-Type: application/json' \
-H "Accept: application/json" \
-X POST \
-d '{ "email": "chai@example.com", "password": "mypassword"}' \
http://localhost:8000/auth/login
```

Example success response

```
{
  "profile": {
    "id": "572c5a4a33c6022fee6d75ef",
    "email": "chai@example.com",
    "name": ""
  },
  "accessToken": "eyJ..."
}
```

Example failure response

```
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Email address or password incorrect"
}
```

### me

```
/me
```

This endpoint use for check current user by include `Authentication` header with `accessToken` from logged in.

```
curl -i -H 'Content-Type: application/json' \
-H "Accept: application/json" \
-H "Authorization: ACCESS_TOKEN"
-X GET \
http://localhost:8000/me
```

Example success response

```
{
    "_id": "572cf69461f2880af73740a9",
    "name": "",
    "email": "chai@example.com",
    "updatedAt": "2016-05-06T19:55:00.217Z",
    "createdAt": "2016-05-06T19:55:00.217Z"
}
```

### Users

```
/users
```

List all users (Assuming all user has permissions)

| Name | Type | Default | Available |
|----------|------|------|--------|
| fileds | String | - | name, email |
| sort | String | -createdAt | name, email, createdAt, updatedAt |
| limit | Number | 30 | 1 - 1000 |

Example valid

- `/users?sort=name&limit=100` : order by name and limit 100
- '/users?sort=-createdAt': order by date DESC
- `/users?fields=name,email` : query only name and email

```
curl -i -H 'Content-Type: application/json' \
-H "Accept: application/json" \
-H "Authorization: ACCESS_TOKEN"
-X GET \
http://localhost:8000/users
```

Example success response

```
[
    {
        "_id": "572cf69461f2880af73740a9",
        "name": "",
        "email": "chai@example.com",
        "updatedAt": "2016-05-06T19:55:00.217Z",
        "createdAt": "2016-05-06T19:55:00.217Z"
    },
    {...},
    {...},
    {...},
    {...},
    {...}
]
```

### UserId

```
/users/{userId}
```

Get a user detail by id (same as /me but specific id)

```
curl -i -H 'Content-Type: application/json' \
-H "Accept: application/json" \
-H "Authorization: ACCESS_TOKEN"
-X GET \
http://localhost:8000/users/572cf69461f2880af73740a9
```

Example response

```
{
    "_id": "572cf69461f2880af73740a9",
    "name": "",
    "email": "chai@example.com",
    "updatedAt": "2016-05-06T19:55:00.217Z",
    "createdAt": "2016-05-06T19:55:00.217Z"
}
```
