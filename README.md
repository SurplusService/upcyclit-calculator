# UpcyclIT Calculator

###  [Live Preview](https://www.surplusservice.com/upcyclit-calculator)

## Getting Started

### Setup

Ensure [Node 18](https://nodejs.org/en) is installed.

Install project dependecies. Installs project dependencies to `/node_modules`
```
npm install
```

### Run

Before starting the program, you'll need to setup some environment variables.
These can be found after created an AirTable account.

```
export REACT_APP_AIRTABLE_API_KEY=...
export REACT_APP_AIRTABLE_BASE_ID=...
export REACT_APP_AIRTABLE_TABLE_ID=...
```

Run the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The app will reload on its own when there have been changes made to the source code.
```
npm start
```

### React
React is the library with which the fronend is built on. Check out the [React documentation](https://reactjs.org/).

### React Router
React Router enables routing without the use of a server to render pages. Check out the [React Router documentation](https://reactrouter.com/en/main).

### Material UI
Material UI is a React library of UI components that simplifies UI development. Check out the [Material UI documentation](https://mui.com/material-ui/getting-started/overview/)

### Recharts
Recharts is a React library for displaying visual graphs or charts. Check out the [Recharts documentation](https://recharts.org/en-US/guide)

### TypeScript
TypeScript is the language used to write this web application. Check out the [TypeScript documentation](https://www.typescriptlang.org/docs/).

## Other Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Deployment

Using GitHub Actions and GitHub Pages we are able to deploy this app at no cost.

### Setup

1. Navigate to the [fine-grained access token](https://github.com/settings/personal-access-tokens/new) creation page.
2. Enter an arbitrary name for the token.
3. Select SurplusService as the **Resource Owner**.
4. Check **Only select repositories** and select the "upcyclit-calculator" from the dropdown.
5. Click on **Repository permissions** and make sure "Contents" is "Rean and write".
6. Click generate token at the bottom of the page and copy the token.
7. Go to the [Actions secrets and variables](https://github.com/SurplusService/upcyclit-calculator/settings/secrets/actions) page.
8. Click on "New repository secret"
9. Set the name to "PAGES_GITHUB_TOKEN" and page the access token from step 6.

### Refreshing Your Token

Loosely follow the setup steps but rather than creating a new secret, edit and replace the value of the previous "PAGES_GITHUB_TOKEN" with the new one you just generated.
