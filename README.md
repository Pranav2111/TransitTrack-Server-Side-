# API Signup Example

This is an example of how to use a `POST` request to sign up a new user via the API.

## Endpoint
`POST /api/auth/signup`

## Request

### URL
`https://transittrack-epfkadzi.b4a.run/api/auth/signup`

### Body
```json
{
  "name": "pranav",
  "email": "pranav@gmail.com",
  "password": "sssshhhhhhhhh🤫"
}
```

# API Login Example

This is an example of how to use a `POST` request to log in a user via the API.

## Endpoint
`POST /api/auth/login`

## Request

### URL
`https://transittrack-epfkadzi.b4a.run/api/auth/login`

### Headers
- `Content-Type: application/json`
- `Cookie: _gocomet.login_session=<SESSION_ID>`

### Body
```json
{
  "email": "client11@gmail.com",
  "password": "client1111111"
}
```

# API Bus Stops Retrieval Example

This is an example of how to retrieve bus stop data via the API using an authenticated `GET` request.

## Endpoint
`GET /api/form-requisite/bus-stops`

## Request

### URL
`https://transittrack-epfkadzi.b4a.run/api/form-requisite/bus-stops`

### Headers
- `Authorization: Bearer <JWT_TOKEN>`  
  (Replace `<JWT_TOKEN>` with a valid JWT token obtained after successful authentication.)


# API Scheduled Buses Retrieval Example

This is an example of how to retrieve scheduled buses between an origin and destination via the API using an authenticated `GET` request.

## Endpoint
`GET /api/bus/scheduled-buses`

## Request

### URL
`https://transittrack-epfkadzi.b4a.run/api/bus/scheduled-buses?originId=<ORIGIN_ID>&destinationId=<DESTINATION_ID>`

Replace `<ORIGIN_ID>` and `<DESTINATION_ID>` with the relevant bus station IDs for the origin and destination.

### Query Parameters
- `originId`: The ID of the bus origin station (e.g., `MUM-001`).
- `destinationId`: The ID of the bus destination station (e.g., `PUN-002`).

### Headers
- `Authorization: Bearer <JWT_TOKEN>`  
  (Replace `<JWT_TOKEN>` with a valid JWT token obtained after successful authentication.)
