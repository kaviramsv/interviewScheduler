# Interview Scheduler
Interview Scheduler is a React application that allows users to book ,edit and cancel interviews. It combines a concise API with a WebSocket server to build a realtime experience.Data is persisted by the API server using a PostgreSQL database.
Cypress tests are used for end to end testing.Jest tests are used to test the functionality and Storybook isused for testing the UI components.

## ScreenShots
![Form -To create or edit a new appoitment](https://github.com/kaviramsv/interviewScheduler/blob/master/docs/Create%20Edit%20Appointment.png)

![Saved Appointment](https://github.com/kaviramsv/interviewScheduler/blob/master/docs/emptyslots.png)

![Deletion in progress](https://github.com/kaviramsv/interviewScheduler/blob/master/docs/Delete.png)

![Selecting an appointment](https://github.com/kaviramsv/interviewScheduler/blob/master/docs/SelectAnAppointment.png)

![Confirm delete](https://github.com/kaviramsv/interviewScheduler/blob/master/docs/Cancel.png)
## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
