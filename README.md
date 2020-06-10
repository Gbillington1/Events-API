# Events API

This repository contains the Events API. The Events API allows authenticated users to create, view, and mark their RSVP status to events for their community.

This API is fully RESTful.


## Authentication

All requests to the API must be authenticated, except for sign in/up requests. This API follows the OAuth 2.0 specification. Access Tokens must be passed through the `Authorization` header on any authenticated endpoints in the following format:

```
Authorization: Bearer {Token}
```


## API Anatomy

The Events API can be broken into a few core resources and their methods:

- User
	- `GET` my user
	- `GET` another user
- Event
	- `GET` all events
	- `GET` an event (by ID)
	- `POST` an event
	- `PUT` an event
	- `DELETE` an event
	- `GET` an event's attendees
- RSVP
	- `POST` an RSVP to an event
	- `DELETE` an RSVP to an event
	- `PUT` an RSVP to an event

## Responses

All response headers MUST follow the [HTTP/1.1 status codes definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). 

All response bodies MUST be JSON-encoded, and fully parsable by any JSON serializer.

At a fundamental level, there are two Events API response types:

* [Success response](#success-response)
* [Error response](#error-response)

All resource endpoints MUST use one of these response formats.

## Success Response

To qualify a success, the response MUST have a `2xx`/`3xx`-level HTTP status code, MUST NOT have an `error` field, and MAY include a `data` field. e.g.:

```
GET -> /v1/users/me
```
--
```
200 OK
```
```
{
    "data": {
        "id": 5,
        "type": "user",
        "name": "jeremy",
        "bio": "loves to host big house parties"
    }
}
```

*Note: Some success responses may include additional fields, such as the `meta` field.*

## Error Response

To qualify an error, the response MUST have a `4xx`/`5xx`-level HTTP status code, and MUST include the `error` field which consists of an [error object](Errors.md#error-object). E.g.:

```
GET -> /v1/users/me/
```
--
```
401 Unauthorized
```
```
{
    "error": {
        "message": "Your request could not be completed because it was not properly authenticated.",
        "code": 300
    }
}
```

## Errors

The Events API returns a number of different errors. The HTTP response status code will be in accordance with the [W3 Status Code Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html); however, the response data will include internal status codes which are detailed below:

Code | Message | HTTP code | Description | Reference
---- | ------- | --------- | ----------- | ---------  
300 | Your request could not be completed because it was not properly authenticated. | 401 | Something was wrong with the authentication method for this request. | [Request Authentication](Authentication/RequestAuthentication.md)
301 | A valid access token is required to access this resource. | 401 | | [Request Authentication](Authentication/RequestAuthentication.md)
302 | You must be authenticated as a user to take this action. | 401 | Identity required to make this request. | [User Authentication](Authentication/OAuthAuthentication.md), [Request Authentication](Authentication/RequestAuthentication.md)
310 | The provided access token is invalid, or cannot be used with the provided parameters. | 401 | Invalid or expired [Access Token](Authentication/OAuthAuthentication/AccessToken.md) provided. | [User Authentication](Authentication/OAuthAuthentication.md), [Access Token](Authentication/OAuthAuthentication/AccessToken.md)
311 | The provided refresh token is invalid, or cannot be used with the provided parameters. | 400 | Invalid Refresh Token provided. | [User Authentication](Authentication/OAuthAuthentication.md), [Access Token](Authentication/OAuthAuthentication/AccessToken.md)
312 | The provided access token or refresh token does not match the given bearer token. | 401 | Mismatched API Key provided when refreshing token. | [User Authentication](Authentication/OAuthAuthentication.md)
320 | The provided refresh token cannot be used to renew an access token. Client login should be attempted. | 403 | | [User Authentication](Authentication/OAuthAuthentication.md)
700 | The requested operation is not permitted on this resource. | 412 | A precondition was not met for this request. | 
