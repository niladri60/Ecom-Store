<div align="center">

# 🛒 Ecom-Store  
### Fullstack E-commerce Platform
[![Java](https://img.shields.io/badge/Java-17-blue?style=plastic&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.0-brightgreen?style=plastic&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring_Security-JWT_Auth-6DB33F?style=plastic&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![Actuator](https://img.shields.io/badge/Spring_Actuator-Monitoring-4CAF50?style=plastic&logo=spring&logoColor=white)](https://docs.spring.io/spring-boot/docs/current/actuator-api/html/)
[![Mockito](https://img.shields.io/badge/Mockito-Mocking-8A2BE2?style=plastic&logo=java&logoColor=white)](https://site.mockito.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=plastic&logo=react)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State_Management-764ABC?style=plastic&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=plastic&logo=axios&logoColor=white)](https://axios-http.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=plastic&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-orange?style=plastic&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![AWS S3](https://img.shields.io/badge/AWS_S3-Storage-orange?style=plastic&logo=amazonaws&logoColor=white)](https://aws.amazon.com/s3/)
[![IAM](https://img.shields.io/badge/AWS_IAM-Access_Management-orange?style=plastic&logo=amazonaws&logoColor=white)](https://aws.amazon.com/iam/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue?style=plastic&logo=docker&logoColor=white)](https://www.docker.com/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI/CD-D24939?style=plastic&logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-Java_Dev-000000?style=plastic&logo=intellijidea&logoColor=white)](https://www.jetbrains.com/idea/)
[![VS Code](https://img.shields.io/badge/VS_Code-Frontend-blue?style=plastic&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)


</div>

## 📦 Overview

Ecom-Store is a modern fullstack e-commerce platform featuring:

* 🔧 **Backend**: Spring Boot 3 (Java 17) REST API  
* 🎨 **Frontend**: ReactJS (Vite) with Tailwind CSS  
* ☁️ **Storage**: AWS S3 for media files  
* ✅ **Testing**: Mockito-based unit testing  
* 🐳 **Deployment**: Dockerized environment  


## 🚀 Tech Stack

### 🔙 Backend (Spring Boot)

| Component    | Technology                    |
| ------------ | ----------------------------- |
| Framework    | Spring Boot 3.1               |
| Database     | MySQL (Production), H2 (Test) |
| File Storage | AWS S3                        |
| Security     | Spring Security + JWT         |
| Testing      | Mockito                       |
| Build Tool   | Maven                         |

### 🔜 Frontend (React)

| Component        | Technology                           |
| ---------------- | ------------------------------------ |
| Framework        | React 18 (Vite)                      |
| Styling          | Tailwind CSS                         |
| State Management | Redux Toolkit                        |
| Routing          | React Router 6                       |
| Testing          | Jest, React Testing Library, Cypress |
| HTTP Client      | Axios                                |

### 🛠 Infrastructure

| Component        | Technology              |
| ---------------- | ----------------------- |
| Containerization | Docker + Docker Compose |
| Cloud Storage    | AWS S3                  |
| CI/CD (Optional) | GitHub Actions          |


## 🧰 Getting Started

### ✅ Prerequisites

* Java 17+
* Node.js 18+
* Docker 20.10+
* AWS Account (for S3)
* MySQL 8+

### 📥 Installation

#### 1. Clone Repository

```bash
git clone https://github.com/your-username/ecom-store.git
cd ecom-store
```

#### 2. Backend Setup

```bash
cd backend
cp src/main/resources/application.example.properties src/main/resources/application.properties
nano src/main/resources/application.properties
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

#### 4. Configure AWS S3

Create `.aws/credentials`:

```init
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
```

### ⚙️ Configuration

**Backend (`application.properties`):**

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/ecomstore
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# S3 Storage
cloud.aws.s3.bucket-name=ecom-store-bucket
cloud.aws.region.static=us-east-1
```

**Frontend (`.env`):**

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_S3_BASE_URL=https://ecom-store-bucket.s3.amazonaws.com
```


## 🚀 Running the Application

### 🧪 Development Mode

**Backend:**

```bash
cd backend
mvn spring-boot:run
```

**Frontend:**

```bash
cd frontend
npm run dev
```

### 📦 Production Build

```bash
# Build backend
cd backend
mvn clean package

# Build frontend
cd ../frontend
npm run build
```


## 🧪 Testing

### 🔙 Backend Tests (Mockito only)

```bash
cd backend
mvn test
```

### 🔜 Frontend Tests

```bash
cd frontend

# Unit tests
npm test

# Component tests
npm run test:components

# E2E tests (Cypress)
npm run test:e2e
```

## 🐳 Docker Deployment

### 🏗 1. Build Images

```bash
docker-compose build
```

### ▶️ 2. Run Containers

```bash
docker-compose up -d

# Access:
# Backend: http://localhost:8080
# Frontend: http://localhost:3000
# MySQL: port 3306
```

### 🔻 3. Manage Services

```bash
# Logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📁 Project Structure

```
ecom-store/
├── backend/
│   ├── src/
│   │   ├── main/java/com/ecomstore/
│   │   │   ├── controller/       # REST controllers
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── entity/           # Entity classes
│   │   │   ├── enums/            # Enum types
│   │   │   ├── exceptions/       # Custom exceptions
│   │   │   ├── mapper/           # Mappers
│   │   │   ├── repositories/     # JPA repositories
│   │   │   ├── security/         # JWT/Auth config
│   │   │   ├── service/          # Business logic
│   │   │   └── specification/    # Query specifications
│   │   └── resources/            # Configuration files
│   └── Dockerfile
├── frontend/
│   ├── src/components/
│   │   ├── admin/                # Admin UI components
│   │   ├── common/               # Shared components
│   │   ├── context/              # Context providers
│   │   ├── page/                 # Page-level components
│   │   ├── service/              # API calls/services
│   └── Dockerfile
└── docker-compose.yml
```

## 🌟 Key Features

### 🔙 Backend

* 🔐 JWT Authentication
* 👥 Role-Based Access Control (Admin/Customer)
* 📦 Product Management
* 🛒 Order Processing
* 💳 Stripe Payment Integration
* ☁️ AWS S3 Uploads
* 🚀 REST API with HATEOAS
* 📄 OpenAPI Docs (Springdoc)
* ⚡ Redis Caching

### 🔜 Frontend

* 🧩 Reusable Component Architecture
* 🛍 Responsive Product Listings
* 🛒 Shopping Cart
* 🔑 Auth & Registration
* 📜 Order History
* 🔍 Product Search/Filter
* 🛠 Admin Dashboard
* 🌒 Dark/Light Theme Toggle
* 📤 Image Upload


## 🌍 Environment Configuration

| Variable         | Description          | Default Value                    |
| ---------------- | -------------------- | -------------------------------- |
| `DB_URL`         | MySQL connection URL | `jdbc:mysql://db:3306/ecomstore` |
| `DB_USER`        | DB username          | `root`                           |
| `DB_PASSWORD`    | DB password          | `password`                       |
| `S3_BUCKET_NAME` | AWS S3 bucket        | `ecom-store-dev`                 |
| `AWS_REGION`     | AWS region           | `us-east-1`                      |
| `JWT_SECRET`     | Secret key for JWT   | `secureSecretKey`                |
| `JWT_EXPIRATION` | Token expiry in ms   | `86400000` (24 hrs)              |


## 🤝 Contributing

1. 🍴 Fork the repo
2. 🔧 Create a new branch `feature/my-feature`
3. 💾 Commit your changes
4. 🚀 Push and open a pull request
