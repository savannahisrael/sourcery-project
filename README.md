# devCircle
devCircle is a collaboration app built by coding boot campers, for coding boot campers. It can be utilized both during and after their boot camp experience. Essentially, devCircle is a place where boot camp students can go to start a new coding project, form a team to take on the challenge together, and view what their other peers have been working on. devCircle has Github integration so all project details are readily available, public and private chats where team members and others can start a discussion around your project, and  a robust authentication system in place that allows us to restrict membership to boot camp students only.

## Premise
Based on the single sprint learning model that was enforced during bootcamp, students can continue this pattern of quickly learning and adopting new technologies and languages into their lexicon. devCircle will also allow them to model this pattern in coordination with their peers based on availablity, interest, and duration.

## Authentication and Authorization
devCircle relies on github OAuth for all user Authentication and Identification. Authorization is state bound based on user roles per project.

## Technologies
Below is a select list of technologies devCircle currently employs:
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
Currently 2 third-party APIs are being used:
- Github GraphQL
- Github Oauth 

## Open Source
devCircle is an open source project. We encourage trilogy bootcampers in particular to contribute as we believe it offers a few benefits:
- Practice with remote collaboration.
- Documented open source contribution.
- Practice with code towards a real production deployment.
- Contribution to the Trilogy Ecosystem.
- Self gratification from improving a tool you actually use.

## Organization
Each cohort registered with devCircle has their projects segregated from other cohorts by data branching. Each member of a cohort will receive an access code that identifies their cohort. That code will be paired with their github authentication to determine which projects and dashboard they have access to.