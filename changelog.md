# Changelog
All commits are documented in this file.

## [07/20/2020]
### Added 
 - frontend validation for sign in 

## [07/03/2020]
### Changed
 - Moved `create()` and `retrieve()` out of User class
 - small variable changes on frontend
 - apiError.output function

## [06/30/2020]
### Changed
 - moved `users.js` functions into the `User` class (unfinished, throws an error)

## [06/28/2020]
### Added
 - User class
 - `users.create()` returns a `new User`
 
### Changed
 - apiError throwing in `users.create()` (adding user class messed it up)
 - frontend to recieve new User object

## [06/27/2020]
### Added
 - error lookup in `apiError.js` (given only the error code)
 - frontend error handling for duplicates 
### Removed
 - utf-8 encoding and decoding in `events.js` and `users.js`

## [06/24/2020]
### Added
 - Error handling for unique constraint violation

## [06/23/2020]
### Added
 - Unique constraint to username and email columns in DB

## [06/22/2020]
### Added
 - `validate()` and `format()` for `events` model
 - UTF-8 encoding for trimmed data (before adding to DB)
 - decoding data in `users.format()` before sending it to frontend
 - more specific data validation to password and email in `users` model
 - checking if error is apiError before running through the error handler

### Changed
- Changed frontend date JS to create the correct timestamp

## [06/20/2020]
### Added
 - function to check if db is up 

### Changed 
 - endpoints to just `user` and `event`

### Removed
 - old error handling for `event` endpoint 

## [06/19/2020]
### Added
 - apiError class 
 - better error handling

## [06/17/2020]
### Added
 - upcoming function to events model to return upcoming events
 - timestamp column
 - frontend code to create timestamp (with timezone) from input data (events form)

### Changed
 - Error handling in model functions to promises (.catch())

### Removed
 - date and time columns

## [06/16/2020]
### Added
 - function in users model that creates a data object for frontend
 - personalize endpoints for redirect after sign up
 - sign in form 

### Changed 
 - moved events form to user page

## [06/15/2020]
### Added 
 - frontend validation 
 - error handling for backend validation
 - cookie for userID 
 - redirect to page that gets user data (with userId cookie)

## [06/14/2020]
### Added 
 - basic data validation

## [06/12/2020]
### Added
 - styling for creating user
 - create event form
 - backend to receive event data from frontend and add it to DB
 - select event from DB and send it to frontend
 - 3 separate models for users, events, and rsvps
 - retrieve(), update(), and delete() for 3 models

### Changed
 - Date and Time datatypes in event table 
 - migrated query functions over to 3 models

### Removed
 - linked_username and linked_event_name columns from RSVP
 - queries model

## [06/11/2020]
### Added 
 - RSVP table in DB
 - functions to add users, events, and rsvps
 - frontend from to collect userdata
 - post request sending userdata
 - backend receiving userdata
 - function to select user table from DB
 - send user table to frontend

## [06/10/2020]
### Added 
 - postgres DB and express environment
 - basic tables for api
 - changelog

[06/30/2020]: https://github.com/Gbillington1/Events-API/compare/7d89bac..HEAD
[06/28/2020]: https://github.com/Gbillington1/Events-API/compare/1fe593d..a30b95c
[06/27/2020]: https://github.com/Gbillington1/Events-API/compare/d6fbea3..83cd0e4
[06/24/2020]: https://github.com/Gbillington1/Events-API/compare/c064bfc..2245766
[06/23/2020]: https://github.com/Gbillington1/Events-API/compare/e12d10f..95740b2
[06/22/2020]: https://github.com/Gbillington1/Events-API/compare/f366b6c..fadd225
[06/20/2020]: https://github.com/Gbillington1/Events-API/compare/97a7068..1d52998
[06/19/2020]: https://github.com/Gbillington1/Events-API/compare/157fe63..c19ad2c
[06/17/2020]: https://github.com/Gbillington1/Events-API/compare/3087dde..53d97b7
[06/16/2020]: https://github.com/Gbillington1/Events-API/compare/c0d2478..749cb2c
[06/15/2020]: https://github.com/Gbillington1/Events-API/compare/68239d0..bb085bb
[06/14/2020]: https://github.com/Gbillington1/Events-API/compare/34e1f87..34e1f87
[06/12/2020]: https://github.com/Gbillington1/Events-API/compare/0c7c2df..edfc0e1
[06/11/2020]: https://github.com/Gbillington1/Events-API/compare/277c5bf..76c0318
[06/10/2020]: https://github.com/Gbillington1/Events-API/compare/d3b101d..c0e50d9