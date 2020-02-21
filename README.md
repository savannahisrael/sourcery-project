# SOURCERY
Sourcery is a collaboration app built by coding boot campers, for coding boot campers. It can be utilized both during and after their boot camp experience. Essentially, Sourcery is a place where boot camp students can go to start a new coding project, form a team to take on the challenge together, and view what their other peers have been working on.  Additionally, Sourcery is a place for instructors and students to share and collect outside resources on any topic. Sourcery has Github integration so all project details are readily available, public and private chats where team members and others can start a discussion around your project, and  a robust authentication system in place that allows us to restrict membership to boot camp students only.


## Authentication and Authorization
Sourcery relies on github OAuth for all user Authentication and Identification. Authorization is state bound based on user roles per project.

## Technology Stack
- React
- Semantic UI
- Node
- Express
- Mongo DB
- Mongoose ORM
- PassportJS
- Socket.io
- Heroku

## APIs
- Github GraphQL
- Github Oauth 

## Organization
Each cohort registered with Sourcery has their projects and resources segregated from other cohorts by data branching. Each member of a cohort will receive an access code that identifies their cohort. That code will be paired with their github authentication to determine which projects and dashboard they have access to.

## Demo
To demo this project visit:
sourcery-project.herokuapp.com

Then use code 2020 sign up in the demo cohort (A Github account is required to demo this project)

## Creators
This project is version 2.0 and created by Savannah Israel.

Contributions for version 1.0 are credited to:
Francesca Sadler
Emily Grace Frost
Gwen Gelsinon
