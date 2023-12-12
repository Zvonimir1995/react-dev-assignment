# React dev Assignment 🐟 🚧

## This Application is created to solve a React development task.
The task exaplanation:

Overview
- Create a React application that shows a list of Posts and associated post Comments
that are fetched via provided API.

- Push the code to github + describe the build/run process in a Readme file

- Write approximate time needed to finish the assignment


Features

- Create 2 routes: '/posts' & 'post/{id}'.

- Posts route should show a list of posts and associated comments. Every post should
have a user's name associated.

- Create a search input and filter posts by user name using an input field.

- Clicking a post will redirect to a new page

- MUST! EVERY component once rendered must log in the console 'Hello from <insert
component name>' and should be overridable per component. The part 'Hello from'
must be sent to a component via props and defined only once within the scope of
the application. It should look something like console.log('${propsmessage}
${componentName}'). Feel free to name the variables as you see fit.

Conditions

- The UI is up to you. This is a React oriented test but at least a minimally usable
layout that does not break and is appealing to the eye is required.

- Do not use any 3rd party state management solution. Again this is a React oriented
test. That does not mean state management can't be handled in a well structured
way.

- Do not use any 3rd party UI component libraries. The UI of the app can be very
minimal and does not require 3rd party component libraries.

- Do not use CSS utility libraries (e.g. Bootstrap, Tailwind).

- When writing components try to find a way to make them reusable and resilient,
meaning they can easily be integrated into other applications. This part of the test is
very important.

- Try to use some of the more advanced concepts like HOC, Render props, Compound
components etc.

- You are free to use any React bootstrapping tool (like create-react-app or vite)

- It is also highly recommended to use TypeScript. If not, make sure to use type
checking With PropTypes

- You are free to structure the code in any way you like (folder structure) but try to
make it as real-world as possible


- You are free to include any tools that you use in general that can help you work on
this task like linters, code style checkers, UI component testers etc.


API

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

### Time needed to finish the assignment

- Slightly more than 8 hours due to self added tasks and their complexity
  

## Interesting solutions

- parallel routes ( in this case "/posts" and "/post/:id" - rendering a "/post/:id" route without unmounting "/posts" route )

- custom infinite scroll component that uses render prop

- custom hooks ( useGreetFromComponent )

- simulating paginations ( since the API does not provide a pagination, all posts are fetched, and instead of firing 100 requests to fetch the comments, pagination is simulated and 10 by 10 posts are being rendered and associated comments fetched )

- filtering is triggered after certain time has passed after the users last change on the filter text input

## 🚀 Application setup

Install all the dependencies
```bash
npm install
```
To start the application in the project root run:
```bash
npm start
```

## 📦 Application build
To build the application run:
```
npm run build
```

## 📓 Developer notes

This application is built with:
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).
- [React](https://react.dev/blog/2023/03/16/introducing-react-dev)

For the rest of dependencies check `package.json`
