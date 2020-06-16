# Changelog
All commits are documented in this file.

## [06/15/2020]
### Added 
 - frontend validation 
 - error handling for backend validation
 - cookie for userID 
 - redirect to page that gets user data (with userID cookie)

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

[06/12/2020]: https://github.com/Gbillington1/Events-API/compare/0c7c2df..HEAD
[06/11/2020]: https://github.com/Gbillington1/Events-API/compare/277c5bf..76c0318
[06/10/2020]: https://github.com/Gbillington1/Events-API/compare/d3b101d..c0e50d9