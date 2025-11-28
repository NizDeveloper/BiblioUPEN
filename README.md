# BiblioUPEN

Comprehensive book lending and return management system for the UPEN university library.

## Project Description

BiblioUPEN is a web platform designed for managing university bibliographic resources. The system eliminates current access barriers through a modern and intuitive interface, significantly improving the experience for both students and library staff.

The platform allows managing book inventory, controlling loans in real-time, registering users, and generating activity reports, all in a single centralized system.

## Main Features

- **Complete inventory management**: Registration, updating, and deletion of books
- **Lending and return system**: Process automation without credential retention
- **User management**: Student registration with loan history
- **Real-time availability**: Instant control of available copies
- **Reports dashboard**: Dashboard with key metrics and indicators
- **Advanced search and filtering**: Quick resource location
- **Responsive interface**: Accessible from mobile and desktop devices

## Prerequisites

Before installing the project, make sure you have installed:

- **Node.js v20.13.0** (main project version)
- **Node.js v14.18.0** (For styles only)
- **nvm** (Node Version Manager) for managing versions
- **MariaDB v10.5+** installed and running
- **npm** or **yarn** as package manager
- **Git** for version control

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/NizDeveloper/BiblioUPEN.git
cd biblio-upen
```

### 2. Configure Node.js version with nvm

```bash
nvm install 20.13.0 && nvm install 14.18.3
nvm use 20.13.0
node --version
```

### 3. Install dependencies

The project has 3 main folders: "/" (project root), `server` for backend, and `src` for frontend.

```bash
npm install
```

```bash
cd server/
npm install
```

For CSS styles, it's necessary to be in the `src/style/` directory and change the Node version to v14.18.3

```bash
cd ../
cd src/style
nvm use v14.18.3
npm install
```

Install Gulp in the project:

```bash
npm install --save-dev gulp@4.0.2 gulp-sass@4.1.1 gulp-minify-css gulp-rename gulp-concat gulp-sourcemaps node-sass
```

Compile styles:

```bash
gulp build
```

## Usage Manual

### Start frontend in development

In another terminal, navigate to the project root folder and run the React start command.

```bash
npm start
```

### Start backend server

Navigate to the `/server` folder and run the command (using Node v20):

```bash
node index.js
```

### Access the application

Once both servers are running, access the application from your browser on port 3000 → http://localhost:3000/ 

## 📁 Project Structure

The project is organized in two main sections:

**Backend (server/)**

- `controllers/`: Business logic for books, loans, and students
- `routes/`: API endpoint definitions
- Database configuration files

**Frontend (src/)**

- `components/`: Reusable React components organized by module (books, loans, students, common)
- `pages/`: Main application pages
- `services/`: Services for API communication
- `assets/`: Images, icons, and illustrations
- `style/scss/`: Global and modular styles

**General structure:**

- `public/` folder: Static files
- `build/` folder: Production build (auto-generated)
- Configuration files: package.json, .env, .gitignore

---

## Development Team

**Institution**: UPEN

**Professors**:

- José Luis Delfín Márquez | **Integrated Project**
- Daniel Armando Ríos | **Object-Oriented Programming (OOP)**
- Indhira Lizbeth Sánchez Arroyo | **Databases**
- Katia Guadalupe Montes Palacios | **Software Quality Topics**

**Students**:

- Abdiel Josue Pacheco Robles
- Níz Gadiel Peña Mariscal
- Maria Jose Vazquez Romano
- Diego Eduardo Velasco Basulto

More information at: [Documentation - Notion](https://www.notion.so/Documentation-2b839f1006d0806ea25ac6fd3fa7a02f)
