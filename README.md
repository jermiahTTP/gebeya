# Online Marketplace for Ethiopia

**Objective:** To create a robust, user-friendly, and trustworthy online marketplace that connects Ethiopian businesses and consumers. This platform will address current market gaps by offering a seamless experience, from product discovery to payment and delivery.

## Project Overview

For a comprehensive understanding of the project's vision, features, technology stack, and go-to-market strategy, please refer to the full project description document (link to be provided).

## Project Structure

The repository is organized into the following main directories:
- `backend/`: Contains the Node.js with Express API.
- `frontend/`: Contains the React web application.
- `mobile/`: Contains the React Native mobile application.
- `docs/`: Contains project documentation, including API specs, design notes, and integration details.

## Setup and Running

**Important Note:** Due to limitations with the current execution environment, `npm install` commands could not be run automatically during the initial setup. You will need to run `npm install` (or `yarn install`) within the `backend/`, `frontend/`, and `mobile/` directories respectively to install dependencies before attempting to run the applications. Also, the subdirectory structures within `backend/src/`, `frontend/src/`, and `mobile/src/` (e.g., `components`, `services`, `controllers`) and the native `mobile/android` and `mobile/ios` folders need to be manually created as per standard project layouts or as development proceeds.

### Backend (Node.js / Express)

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install` (if not already done)
3.  Create a `.env` file by copying `.env.example` and fill in your environment variables (e.g., MongoDB URI, JWT Secret).
4.  Start the development server: `npm run dev`
5.  The API should be running on `http://localhost:PORT` (as specified in your `.env` file, defaults to 5000).

### Frontend (React)

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install` (if not already done)
3.  Start the development server: `npm start`
4.  The React app should open in your browser at `http://localhost:3000`.

### Mobile (React Native)

1.  Navigate to the `mobile` directory: `cd mobile`
2.  Install dependencies: `npm install` (if not already done)
3.  Ensure you have the React Native development environment set up (Node, Watchman, JDK, Android Studio/Xcode). Refer to [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).
4.  **Crucial:** The command `npx react-native init YourAppName` was not run. You may need to perform additional setup or adjustments to make the existing placeholder files work as a full React Native project, or initialize a new project and integrate the existing `App.js` and `index.js`. The native `android/` and `ios/` folders are missing.
5.  To run on Android: `npm run android` (requires an emulator or connected device)
6.  To run on iOS: `npm run ios` (requires macOS and Xcode)

## Contributing

(Guidelines for contributing to be added later)
