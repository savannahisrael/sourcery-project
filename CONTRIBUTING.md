# Contribution Guidelines

- [Prerequisites](#prerequisites)
- [Branching](#branching)
- [API keys](#api-keys)
- [Setup devCircle](#setup-devcircle)
- [Style guide](#style-guide)

### Prerequisites

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [MongoDB](http://www.mongodb.org/downloads) | `~ ^3`  |
| [Node.js](http://nodejs.org)                | `~ ^6`  |
| npm (comes with Node)                       | `~ ^3`  |

> _Updating to the latest releases is recommended_.

### Branching

Before you start working, you will need to create a separate branch specific to the issue / feature you're working on. You will push your work to this branch.

#### Naming Your Branch

Name the branch something like `fix/xxx` or `feature/xxx` where `xxx` is a short description of the changes or feature you are attempting to add. For example `fix/email-login` would be a branch where you fix something specific to email login.

#### Adding Your Branch

To create a branch on your local machine (and switch to this branch):

```shell
$ git checkout -b [name_of_your_new_branch]
```

##### If you need more help with branching, take a look at _[this](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)_.

### API keys

- API key stuff here

### Setup devCircle
Once you have devCircle cloned, before you start the application, you first need to install all of the dependencies:

```bash
# Install NPM dependencies
npm install
```
 
Now you will need to start MongoDB, then you can start the application:

```bash
# Start the mongo server in a separate terminal
mongod

# Build devCircle
# This will create a production build of the app.
# This command should be run whenever you 
# make any changes to the React components.
npm run build

# start the node server
npm start
```

Now navigate to your browser and open
<http://localhost:4000>.

### Style guide
- Style guide stuff here
