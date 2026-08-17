# Student Record Management System

A full-stack web application for managing student records (Create, Read, Update, Delete), built with the MERN stack and deployed using two parallel DevOps pipelines.

**Index No:** EG/2021/4499
**Name:** Dissanayake W.M.N.P.

## Live Deployments

- **Render (managed):** https://student-record-frontend.onrender.com
- **AWS EC2 (self-managed, via Terraform + Ansible):** http://13.204.46.186

## Tech Stack

| Layer            | Technology                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Frontend         | React.js, Bootstrap, Axios                                                                |
| Backend          | Node.js, Express.js, Mongoose                                                             |
| Database         | MongoDB (Atlas)                                                                           |
| Containerization | Docker, Docker Compose                                                                    |
| CI               | GitHub Actions                                                                            |
| CD (Path 1)      | Render (managed PaaS)                                                                     |
| CD (Path 2)      | Terraform (infrastructure provisioning) + Ansible (configuration & deployment) on AWS EC2 |
| Image Registry   | Docker Hub                                                                                |

## Features

- Add, view, update, and delete student records
- RESTful API communication between frontend and backend
- Containerized services for consistent local, CI, and production environments
- Two independent, automated deployment pipelines

## Project Structure

```
student-record-management-system/
├── backend/              # Express API, MongoDB models/routes
├── frontend/             # React application
├── terraform/            # AWS EC2 infrastructure as code
│   ├── main.tf
│   ├── deploy.yml        # Ansible playbook
│   └── inventory.ini     # Ansible inventory
├── .github/workflows/    # GitHub Actions CI pipeline
└── docker-compose.yml    # Local multi-container orchestration
```

## Running Locally

### Prerequisites

- Node.js (LTS), Git, Docker Desktop, a MongoDB Atlas connection string

### Backend

```bash
cd backend
npm install
# create .env with MONGO_URI and PORT=5000
npm run dev
```

### Frontend

```bash
cd frontend
npm install
# create .env with REACT_APP_API_URL=http://localhost:5000/api/students
npm start
```

### With Docker Compose (both services)

```bash
docker compose up --build
```

Visit `http://localhost:3000`.

## CI/CD Pipeline

**Continuous Integration (GitHub Actions):**
Every push to `main` triggers dependency installation and a build check for both the backend and frontend, catching errors before deployment.

**Continuous Deployment — Path 1 (Render):**
Render auto-deploys the backend (Web Service) and frontend (Static Site) directly from GitHub on every push to `main`.

**Continuous Deployment — Path 2 (AWS EC2 via Terraform + Ansible):**

1. Docker images for both services are built and pushed to Docker Hub.
2. `terraform apply` provisions an EC2 instance and security group on AWS.
3. `ansible-playbook deploy.yml` connects to the EC2 instance via SSH, installs Docker, pulls the latest images from Docker Hub, and starts the containers via Docker Compose.

This demonstrates both a fully managed deployment model (Render) and a self-managed infrastructure-as-code model (Terraform + Ansible on AWS).

## Environment Variables

**backend/.env**

```
MONGO_URI=<your MongoDB Atlas connection string>
PORT=5000
```

**frontend/.env**

```
REACT_APP_API_URL=<backend API URL>/api/students
```
