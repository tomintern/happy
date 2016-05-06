happy
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
npm install
```

Copy `.env.example` into `.env`

```
cp .env.example .env
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
- `/me` (TODO)
- `/users` (TODO)

<a name="register"></a>
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
  "statusCode": 1000,
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
  "statusCode": 1001,
  "message": "child \"email\" fails because [\"email\" is required]"
}
```

or 

```
{
  "statusCode": 1001,
  "message": "\"some_name\" is not allowed"
}
```

<a name="login"></a>
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
  "statusCode": 1000,
  "message": "OK",
  "data": {
    "profile": {
      "id": "572c5a4a33c6022fee6d75ef",
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
  "statusCode": 1001,
  "message": "Email address already exists"
}
```

or 

```
{
  "statusCode": 1003,
  "message": "Email address or password incorrect"
}
```
