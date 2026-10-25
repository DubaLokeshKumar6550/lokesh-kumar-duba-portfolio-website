# Duba Lokesh Kumar - Full Stack Developer Portfolio

A modern, responsive, and genuinely dynamic developer portfolio website engineered for **Duba Lokesh Kumar**, Java Full Stack Developer & Associate Software Engineer based in Hyderabad, India.

---

## 🌟 Architecture Overview

The system is built on a decoupled, production-grade 3-tier architecture:

```
┌────────────────────────────────────────────────────────┐
│               React JS Front End (Vite)                │
│  - Modern Dark Navy & Cyan Technology Aesthetic       │
│  - Fully Responsive (Mobile, Tablet, Desktop)          │
│  - Interactive Constellation Canvas Network            │
│  - Dual-Mode Synchronized API Client (Live + Fallback) │
└───────────────────────────┬────────────────────────────┘
                            │ RESTful JSON APIs
                            ▼
┌────────────────────────────────────────────────────────┐
│           Spring Boot 3 REST API Backend               │
│  - Layered Controller ➔ Service ➔ DAO / Repository    │
│  - JWT-based Admin Security & Token Validation         │
│  - Automated Database Seeding (CommandLineRunner)     │
│  - Standardized REST Endpoints & Error Handling        │
└───────────────────────────┬────────────────────────────┘
                            │ Hibernate ORM / JDBC
                            ▼
┌────────────────────────────────────────────────────────┐
│                 MySQL 8.0 Database                     │
│  - Database: `portfolio_db` on localhost:3306          │
│  - Normalized Relational Tables (Projects, Skills, etc)│
│  - Indexed B-Trees for Low-Latency Lookups             │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

### 1. Home & Hero Section
- Highlights **Duba Lokesh Kumar**'s role: **Java Full Stack Developer | Associate Software Engineer**.
- Clean, natural portrait utilizing the user's high-resolution professional photo.
- Real-time work status badge (`Open to Work • Hyderabad, India`).
- Direct action buttons: **View Projects**, **Download Resume** (direct PDF download), and **Contact Me**.
- Interactive HTML5 technology constellation canvas background.

### 2. About Me Section
- Accurate educational background: **B.Tech in Electronics & Communication Engineering** from *Mother Teresa Institute of Science & Technology* (2021–2025, CGPA 7.7/10).
- Detailed internship highlights from **JSpiders, Hyderabad** (2026).
- Core engineering principles: Layered DAO-Service-Controller architecture, Database Normalization & Indexing, ACID transaction boundaries, and Clean RESTful APIs.

### 3. Interactive Technical Skills
- Filterable by interactive category tabs:
  - **Programming Languages**: Java, Python, SQL, JavaScript (ES6+)
  - **Backend Development**: Spring Framework, Spring Boot, Hibernate ORM, REST APIs, JDBC, JSP & Servlets, MVC Architecture, Microservices Concepts, Embedded Tomcat, Maven
  - **Databases**: MySQL, Schema Design, SQL Query Optimization, Indexing & B-Trees, Relational Concepts
  - **Frontend Development**: React JS, HTML5, CSS3, JavaScript (DOM)
  - **Tools & Practices**: Git & GitHub, Postman, Eclipse, VS Code, OOP & SOLID Principles, Agile/Scrum
  - **Cloud**: AWS EC2, S3, RDS Fundamentals
- Real-time search filter to locate specific skills instantly.
- Qualitative, verified proficiency badges (*Core Strength*, *Certified Specialist*, *Proficient*, *Foundations*) avoiding unverified arbitrary percentages.

### 4. Featured Projects & Dedicated Detail Pages
- **Payment Integration System**:
  - *Tech Stack*: Java, Spring Boot, REST APIs, Stripe API, React JS, MySQL, DAO–Service–Controller architecture, Microservices concepts.
  - *Database*: MySQL (No AWS claimed for this system).
  - *Interactive Dual-Path Architecture Flowchart*: Details how client checkout initiates synchronously while payment confirmation arrives via asynchronous server-to-server webhook callbacks with cryptographic HMAC-SHA256 signature verification and risk-threshold evaluation.
- **Bank Management System**:
  - *Tech Stack*: Java, Hibernate ORM, MySQL, Object-Oriented Programming (OOP), SOLID Principles.
  - *Atomic Transaction Workflow Diagram*: Demonstrates the 8-phase transfer lifecycle and explains how Hibernate transaction boundaries prevent inconsistent balances and partial updates.
- **Dedicated Project URLs**: Reusable project detail templates accessible at `/projects/:slug`.

### 5. Protected Dynamic Admin Dashboard
- Secure login portal at `/admin` (Restricted to portfolio administrator with Forgot Password verification).
- Complete content management without touching code:
  - **Add New Projects**: Publish future systems (e.g. *Student Management System*, *Hospital Management System*, *Secure Online Exam Platform*) with status set to *Planned*, *In Progress*, or *Completed*.
  - **Edit Projects**: Update titles, taglines, problem statements, solutions, architecture diagrams, technologies, features, and links.
  - **Delete Projects**: Safe deletion with confirmation step.
  - **Skills Manager**: Add, edit, remove, and tag technical skills.
  - **Profile Branding**: Update headline, summary, detailed bio, location, phone, email, and social links.
  - **Inbound Inquiries Inbox**: Review and manage messages submitted through the public contact form.
  - **Live Backend Connection Monitor**: Real-time status showing Spring Boot 3 + MySQL live synchronization.

### 6. Working Contact Section & Utilities
- Real contact form with validation and persistence into MySQL database.
- One-click **Copy Email** button with instant toast notification.
- Direct **Email Me**, **LinkedIn**, and **GitHub** links.
- Functional **Dark Navy / Light Theme** switcher with local storage persistence.
- SEO-optimized metadata and custom 404 error page.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Lucide Icons, Vanilla CSS Design System |
| **Backend** | Java 21/22, Spring Boot 3.3.4, Spring Data JPA, Hibernate ORM |
| **Security** | JWT (JSON Web Tokens), HMAC-SHA256, Interceptor Auth |
| **Database** | MySQL 8.0 (`portfolio_db` on localhost:3306) |
| **Build Tools**| Apache Maven 3.9+, Node.js 25+, npm |

---

## 💻 Setup & Run Instructions

### Prerequisites
1. **Java JDK 17+** (JDK 21 or 22 recommended)
2. **Apache Maven 3.8+**
3. **Node.js 18+** & npm
4. **MySQL Server 8.0** running on `localhost:3306`

### 1. Database Configuration
Ensure MySQL is running on `localhost:3306`. The application automatically creates and seeds `portfolio_db`:
- Database Name: `portfolio_db`
- Default Username: `root`
- Default Password: `root`

*(To customize credentials, edit `backend/src/main/resources/application.yml`)*

### 2. Starting the Spring Boot Backend
In a terminal:
```bash
cd backend
mvn clean spring-boot:run
```
Or run the packaged JAR directly:
```bash
java -jar backend/target/portfolio-backend-1.0.0.jar
```
*Backend runs at:* `http://localhost:8080` (Health check: `http://localhost:8080/api/health`)

### 3. Starting the React Frontend
In a separate terminal:
```bash
cd frontend
npm run dev
```
*Frontend runs at:* `http://localhost:5173`

---

## 🔑 Admin Portal Access

- **URL:** `http://localhost:5173/admin`
- **Username / Email:** `admin` or `dubalokeshkumar6550@gmail.com`
- **Password:** Configured securely. Use the **Forgot Password** option on the login portal to generate a 6-digit verification code and set your private password.

---

## 📁 Repository Structure

```
Portfolio Website/
├── backend/
│   ├── pom.xml
│   ├── src/main/java/com/lokesh/portfolio/
│   │   ├── config/ (DatabaseInitializer, WebConfig)
│   │   ├── controller/ (ProjectController, SkillController, etc.)
│   │   ├── dto/ (AuthRequest, ApiResponse, etc.)
│   │   ├── model/ (Project, Skill, Experience, etc.)
│   │   ├── repository/ (ProjectRepository, SkillRepository, etc.)
│   │   ├── security/ (JwtUtil, AdminAuthInterceptor)
│   │   └── service/ (ProjectService, SkillService, AuthService, etc.)
│   └── src/main/resources/application.yml
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── lokesh-photo.jpg (Uploaded Professional Profile Photo)
│   │   └── Duba_Lokesh_Kumar_Resume.pdf (Resume Document)
│   └── src/
│       ├── components/ (Navbar, Hero, About, Skills, Projects, etc.)
│       ├── pages/ (HomePage, ProjectDetailPage, AdminDashboardPage, etc.)
│       ├── services/ (api.js, initialData.js)
│       ├── App.jsx
│       └── index.css
├── run-portfolio.bat
└── README.md
```
