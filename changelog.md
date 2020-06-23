# Changelog
All commits are documented in this file.

## [06/22/2020]
### Added
 - `validate()` and `format()` for `events` model
 - UTF-8 encoding for trimmed data (before adding to DB)
 - decoding data in `users.format()` before sending it to frontend
 - more specific data validation to password and email in `users` model

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

[06/22/2020]: https://github.com/Gbillington1/Events-API/compare/f366b6c..HEAD
[06/20/2020]: https://github.com/Gbillington1/Events-API/compare/97a7068..1d52998
[06/19/2020]: https://github.com/Gbillington1/Events-API/compare/157fe63..c19ad2c
[06/17/2020]: https://github.com/Gbillington1/Events-API/compare/3087dde..53d97b7
[06/16/2020]: https://github.com/Gbillington1/Events-API/compare/c0d2478..749cb2c
[06/15/2020]: https://github.com/Gbillington1/Events-API/compare/68239d0..bb085bb
[06/14/2020]: https://github.com/Gbillington1/Events-API/compare/34e1f87..34e1f87
[06/12/2020]: https://github.com/Gbillington1/Events-API/compare/0c7c2df..edfc0e1
[06/11/2020]: https://github.com/Gbillington1/Events-API/compare/277c5bf..76c0318
[06/10/2020]: https://github.com/Gbillington1/Events-API/compare/d3b101d..c0e50d9