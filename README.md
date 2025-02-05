# TaskPerks


![Taskperks Banner](https://i.ibb.co.com/sp5yzjG9/ttfstfdc.png)

**TaskPerks** is a web application designed to streamline task management and reward systems for workers, buyers, and administrators. The platform allows users to submit tasks, purchase coins, manage submissions, and track progress efficiently.


🚀 **Live Demo:** [Taskperks](https://task-perks.web.app/)



## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

### 🛠 Admin Dashboard
- Manage tasks and users
- Monitor platform activity

### 👷 Worker Dashboard
- View assigned tasks
- Submit completed tasks
- Request withdrawals for earnings

### 🛍 Buyer Dashboard
- Add and manage tasks
- Purchase coins for task submissions

### 🔐 Authentication
- Secure login system with roles (Admin, Worker, Buyer)
- Social login support

## Technologies Used
### Frontend
- **React.js** (UI development)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **React Router DOM** (Navigation)
- **React Hook Form** (Form handling)
- **SweetAlert2** (Alert system)
- **Swiper** (Carousel component)

### Backend
- **Node.js** (Server-side)
- **Express.js** (API framework)
- **MongoDB** (Database)

### State Management
- **React Query** (Data fetching and caching)

### Authentication
- **Firebase Authentication** (User login and security)

### HTTP Client
- **Axios** (API requests)

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Git](https://git-scm.com/)
- [Vite](https://vitejs.dev/) (For development)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/taskperks-client.git
   cd taskperks-client
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Build the project**
   ```sh
   npm run build
   ```

5. **Preview production build**
   ```sh
   npm run preview
   ```

## Usage
- Run `npm run dev` to start the development server.
- Access the application at `http://localhost:5173/` (default Vite port).
- For production, deploy the `dist/` folder.

## Configuration
- Firebase credentials must be set up in `.env.local`:
  ```env
  VITE_FIREBASE_API_KEY=your_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_project_id
  ```
- Ensure your backend API URL is correctly configured in Axios requests.

## Contributing
Contributions are welcome!  
To contribute:
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

