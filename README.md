# Getting started with this project

## Clone the following repositories:
- UI: https://github.com/lennonnikolas/devices-clientapp
- Backend: https://github.com/NinjaMSP/devicesTask_serverApp 

## Starting the UI
### Important information
- The UI has been configured to use the `cross-env` package to set the port to 3001 no matter the OS. Each operating system sets ports differently when starting the application.

### Starting the project
- Open a bash terminal and navigate to the root directory of the UI application.
- run `npm i` to install all project dependencies.
- run `npm start` in the bash terminal.

This should bring up the application displaying server information mock data from the backend.

- NOTE: The backend must be started to see this information!


## Starting the backend
### Starting the project
- Open a bash terminal and navigate to the root directory of the backend application.
- run `npm i` to install all project dependencies. 
- run `npm start` in the bash terminal.

You should see in the bash terminal that the application is listening on port 3000. 

## Running UI tests
To run the unit/integration tests within the project do the following:
- Open a bash terminal and navigate to the root directory of the UI application.
- run `npm test` and you will see several tests be compiled and run within the bash terminal. Output will be sent to the console as the results of the tests. 

### Important information
These tests are run using React Testing Library and Jest.