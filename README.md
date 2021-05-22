# Blog-Server

A project for building a RESTful API using Node.js, Express, and Mongoose follow [node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate).

# Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```
git clone https://github.com/baokhanh13/Blog-server
```

Install the dependencies:

```
yarn install or npm install
```

Set the environment variables:

```
cp .env.example .env

#open .env and modify your env config (if needed)
```

# Table of Contents

-   [Features](#features)
-   [Projects Structure](#projects-structure)
-   [Tasks](#tasks)

# Features

-   **NoSQL database:** [MongoDB](https://www.mongodb.com/) object data modeling using [mongoose](https://mongoosejs.com/)
-   **Authentication and authorization:** Using custom middlewares
-   **Validation:** Request data validation using [Joi](https://github.com/sideway/joi) and [express-validation](https://www.npmjs.com/package/express-validation)
-   **Logging:** Using [winston](https://github.com/winstonjs/winston) and [morgan](https://www.npmjs.com/package/morgan)
-   **Error handling:** Centralized error handling mechanism
-   **Environment variables:** Using [dotenv](https://www.npmjs.com/package/dotenv) and [cross-env](https://www.npmjs.com/package/cross-env)
-   **Linting:** with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

# Projects Structure

```
src\
 |--config\         # Environments variables and configurations related things
 |--routes\         # Routes
 |--user\           # Contains controller, model, service and validation for user
 |--utils\          # Utility classes and functions
 |--index.js        # App entry point
```

# Tasks
- [x] Init project
- [x] User routes
- [ ] Auth routes
- [ ] More ... 
