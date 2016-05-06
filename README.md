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
