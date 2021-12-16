# Interview Scheduler
Interview Scheduler is a React application that allows users to book ,edit and cancel interviews. It combines a concise API with a WebSocket server to build a realtime experience.Data is persisted by the API server using a PostgreSQL database.Client communicates over a HTTP request to the API  end point which is served by the database.
Cypress tests are used for end to end testing.Jest testFramework is used thoughout the project.I t is used along with react testing library for integration testing . Storybook is also used for testing the UI components.

## ScreenShots
![Form -To create or edit a new appoitment](https://github.com/kaviramsv/interviewScheduler/blob/master/docs/Create%20Edit%20Appointment.png)

![Saving an Appointment](https://github.com/kaviramsv/interviewScheduler/blob/master/docs/Save.png)


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
