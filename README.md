# File Management Dashboard

A modern web application for managing files, allowing users to upload, tag, view statistics, and share files. This project is built with React, Node.js, and TypeScript, providing a clean and responsive user interface with secure data handling.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Scripts](#scripts)
- [Linting](#linting)
- [Contributing](#contributing)

## Features

- **File Upload**: Upload files with optional tagging for better organization.
- **File Listing**: View uploaded files with metadata like tags and view counts.
- **File Sharing**: Generate a shareable link for each file.
- **File Statistics**: Access detailed statistics for each file, including view counts and tags.
- **Authentication**: Secure login and logout functionality using JWT.
- **Stylish Navigation Bar**: A modern, responsive navigation bar with logout capability.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

To get started with the Historical Places App, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn (for managing packages)

### Installation

Clone the repository:

```bash
git clone https://github.com/salmanbukhari37/file-management-app.git
cd file-management-app
```

## Usage

`Note`: Rename the `local.env` file to `.env`. It will help to connect back-end apis with front-end.

### Install the packages

#### Npm

```
npm install
```

#### Yarn

```
yarn install
```

### Run the Project

#### Npm

```
npm run start
```

#### Yarn

```
yarn start
```

### Building for Production

To create a production build of your application, run:

#### NPM

```
npm run build
```

#### Yarn

```
yarn build
```

The build artifacts will be stored in the `build` directory.

## Scripts

This project includes the following scripts:

- `start:` Starts the development server.
- `build:` Builds the app for production.
- `test:` Runs the test suite.
- `eject:` Removes the single build dependency from your project.

## Linting

This project uses ESLint for linting. To run the linter, use:

```
npm run lint
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.
