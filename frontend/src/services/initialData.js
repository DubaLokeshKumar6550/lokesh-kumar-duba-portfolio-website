export const initialProfile = {
  name: "Duba Lokesh Kumar",
  headline: "Java Full Stack Developer | Associate Software Engineer",
  summary: "Java Full Stack Developer with production-style internship experience building high-performance REST APIs and microservices on Spring Boot, Hibernate, and MySQL, with React JS front ends. Adept in DAO-Service-Controller layered architecture, relational schema normalization, and SQL indexing optimization.",
  bio: "I am a dedicated Java Full Stack Developer based in Hyderabad, India, with a B.Tech in Electronics & Communication Engineering and intensive software development internship experience at JSpiders. I specialize in architecting scalable backend systems, designing clean RESTful APIs, enforcing ACID database transactions, and writing testable, production-ready code following SOLID principles.",
  location: "Hyderabad, Telangana, India",
  email: "dubalokeshkumar6550@gmail.com",
  phone: "+91 8978772539",
  githubUrl: "https://github.com/DubaLokeshKumar6550",
  linkedinUrl: "https://linkedin.com/in/lokeshkumarduba",
  photoUrl: "/lokesh-photo.jpg",
  resumeUrl: "/Duba_Lokesh_Kumar_Resume.pdf",
  availableForWork: true
};

export const initialProjects = [
  {
    id: 1,
    title: "Payment Integration System",
    slug: "payment-integration-system",
    tagline: "Secure, event-driven payment auditing & transaction processing microservice with Stripe API, Spring Boot, and MySQL",
    description: "A payment integration application with real-time transaction logging, automated audit records, webhook-based payment event processing, and configurable risk-threshold flags to safeguard transactions prior to settlement.",
    problemStatement: "Modern financial applications require resilient mechanisms to audit incoming transactions, prevent payment discrepancies, verify asynchronous third-party callbacks, and prevent fraudulent settlement of high-risk transactions. Traditional synchronous architectures often fail to handle network timeouts or webhook retries gracefully.",
    solution: "Engineered a robust, event-driven payment auditing module using Spring Boot REST APIs and a React JS dashboard, persisting all transaction lifecycle states in MySQL. Integrated Stripe PaymentIntents and Webhook signatures for cryptographically verified payment lifecycle callbacks. Implemented configurable threshold evaluation rules that instantly flag high-value or suspect transactions into an audit queue before ledger settlement.",
    architectureOverview: "Built following a strict DAO–Service–Controller layered architecture with microservices principles. The client UI initiates payments via Spring Boot REST APIs. Stripe processes payment intents, while asynchronous webhook events are sent directly server-to-server. The Spring Boot backend cryptographically verifies Stripe webhook signatures, triggers auditing business logic, flags transactions meeting risk rules, and persists normalized records into MySQL. The React management dashboard retrieves real-time audit logs via REST APIs.",
    architectureDiagram: `Customer / React UI ──[HTTP POST /api/payment/create-intent]──> Spring Boot Controller
  │                                                                 │
  │ (Client initiates charge)                                        ▼
  ▼                                                      PaymentService (Business Logic)
Stripe Elements SDK ──[Processes Payment Token]──> Stripe API Gateway
                                                            │
                                                            ▼ (Asynchronous Server-to-Server Event)
Spring Boot Webhook Controller <──[POST /api/webhooks/stripe (HMAC-SHA256 Signature)]─┘
  │
  ├──> Signature Verification & Event Idempotency Check
  ├──> Risk Threshold Evaluator (Flags > Threshold or Anomalies)
  └──> Payment DAO / JPA Repository
         │
         ▼
    MySQL Database (Indexed transactions & audit_logs tables)
         │
         ▲ (Polling / REST GET /api/audit-logs)
         │
   React Admin Dashboard (Audit Status & Flag Resolution)`,
    technologies: "Java, Spring Boot, REST APIs, Stripe API, React JS, MySQL, DAO–Service–Controller architecture, Microservices concepts",
    features: `Stripe Payment Workflows: Support for one-time charges, payment intent creation, and refund workflows.
Asynchronous Webhook Processing: Dedicated server-to-server webhook endpoint verifying cryptographic signatures to handle charge.succeeded and charge.failed events.
Real-Time Audit & Risk Flags: Configurable risk-threshold evaluation flagging transactions exceeding defined parameters before final settlement.
Transaction Auditing & Idempotency: Complete audit trail with timestamps, Stripe charge IDs, client metadata, and idempotency protection against duplicate event delivery.
React Management Dashboard: Dynamic, responsive dashboard for viewing transaction statuses, filtering audit flags, and inspecting raw event payloads.
Layered Backend Architecture: Strict DAO–Service–Controller separation ensuring modularity and unit testability.
MySQL Query Optimization: Normalized relational schema with targeted B-Tree indexes on transaction timestamp, status, and customer identifiers to reduce lookup latency under simulated load.`,
    challenges: `Handling Asynchronous Stripe Webhooks: Webhooks arrive asynchronously and sometimes out-of-order. Addressed by designing an idempotent event processor with duplicate transaction ID detection in MySQL.
Webhook Signature Tampering: Protected payment endpoints from fraudulent spoofing by validating Stripe's HMAC-SHA256 signature against the raw payload bytes.
Query Performance Under Load: Tuned complex audit queries by introducing compound indexing on (status, created_at) and eliminating full table scans.`,
    testing: "Constructed automated Postman test suites simulating varied payment scenarios: successful charges, declined cards, duplicate webhook retries, and malformed payload injection. Verified zero financial data discrepancy.",
    futureImprovements: "Introduce distributed caching (Redis) for rapid risk-threshold lookups. Add WebSocket push notifications to the React dashboard for instant zero-latency risk alerts.",
    liveDemoUrl: "",
    githubUrl: "",
    imageUrl: "/projects/payment-system.png",
    status: "COMPLETED",
    displayOrder: 1,
    featured: true
  },
  {
    id: 2,
    title: "Bank Management System",
    slug: "bank-management-system",
    tagline: "High-integrity banking transaction management platform with Hibernate ORM, ACID safeguards, and normalized MySQL schema",
    description: "A comprehensive banking application designed to manage customer accounts, deposits, withdrawals, and multi-account fund transfers with strict balance validation, transaction rollback protection, and OOP data-integrity safeguards.",
    problemStatement: "Financial management systems require absolute zero-tolerance for data anomalies, race conditions, or partial updates. A failure during a fund transfer between accounts can lead to phantom deposits or lost capital if atomicity is not rigorously guaranteed.",
    solution: "Architected an Object-Oriented banking core in Java leveraging Hibernate ORM and MySQL. Enforced strict ACID transaction boundaries where debit and credit steps execute within a single atomic database transaction. Created normalized schemas with foreign key integrity and OOP-based encapsulation to prohibit negative balances or concurrent state corruption.",
    architectureOverview: "Structured using clean Object-Oriented Principles and Hibernate ORM session management. User requests pass through input sanitization and domain validation. The Banking Service establishes an explicit Hibernate transaction boundary. Account balances are locked, verified, and updated atomically. An immutable transaction ledger record is generated. In the event of any validation breach or system failure, the entire unit of work automatically rolls back, keeping account ledgers 100% consistent.",
    architectureDiagram: `Enter Transfer Details (Source, Destination, Amount)
               │
               ▼
       Validate Input Data (Format, Non-Zero, Non-Negative)
               │
               ▼
       Verify Accounts Exist & Status is Active
               │
               ▼
       Check Available Balance in Source Account
       (Source Balance >= Transfer Amount + Minimum Reserve?)
          ├── [NO] ──> Reject with InsufficientFundsException
          └── [YES]
               │
               ▼
   ┌────────────────────────────────────────────────────────┐
   │  BEGIN DATABASE TRANSACTION (Hibernate Session)         │
   │                                                        │
   │  1. Debit Source Account: balance = balance - amount   │
   │  2. Credit Destination:   balance = balance + amount   │
   │  3. Insert Immutable Ledger Record (Audit Trail)       │
   │                                                        │
   │  [Any Exception / System Failure?]                     │
   │     ├── [YES] ──> ROLLBACK TRANSACTION (Zero Impact)   │
   │     └── [NO]  ──> COMMIT TRANSACTION (Persisted)       │
   └────────────────────────────────────────────────────────┘
               │
               ▼
       Display Real-Time Confirmation & Updated Balances`,
    technologies: "Java, Hibernate ORM, MySQL, Object-Oriented Programming (OOP), SOLID Principles, JDBC, DAO Pattern",
    features: `Account Management: Create, update, view, and close checking and savings accounts.
Deposits & Withdrawals: Real-time balance operations with validation and bounds checking.
Atomic Fund Transfers: Multi-account transfer processing guarded by atomic database transaction boundaries.
Balance Validation: Strict invariant checks preventing overdrafts or negative account values.
Hibernate ORM Persistence: Clean domain mapping separating business entities from physical database persistence.
Normalized MySQL Schema: 3NF relational design minimizing redundancy while maintaining referential integrity.
OOP Encapsulation & Data Integrity: Private state encapsulation preventing external manipulation of account balances without going through verified domain methods.`,
    challenges: `Preventing Inconsistent Balances During Concurrent Transfers: If two transactions attempt to transfer funds from the same account concurrently, race conditions can occur. Solved by leveraging database-level row locking and Hibernate transaction demarcation.
Data Normalization vs Performance: Designed a normalized 3NF schema for accounts, customers, and transactions while optimizing join queries through indexing on account_number and transaction_date.`,
    testing: "Unit tested domain invariants (e.g. attempting transfers greater than current balance, negative values, non-existent destination accounts). Verified that rollbacks leave both accounts with exact pre-transfer balances.",
    futureImprovements: "Add multi-factor authentication (MFA) for high-value fund transfers. Implement automated monthly account statement generation in PDF format.",
    liveDemoUrl: "",
    githubUrl: "",
    imageUrl: "/projects/bank-system.png",
    status: "COMPLETED",
    displayOrder: 2,
    featured: true
  }
];

export const initialSkills = [
  // Programming languages
  { id: 1, name: "Java", category: "Programming Languages", level: "Core Strength", icon: "Code", displayOrder: 1, highlight: true },
  { id: 2, name: "Python", category: "Programming Languages", level: "Proficient", icon: "Terminal", displayOrder: 2, highlight: false },
  { id: 3, name: "SQL", category: "Programming Languages", level: "Certified Specialist", icon: "Database", displayOrder: 3, highlight: true },
  { id: 4, name: "JavaScript (ES6+)", category: "Programming Languages", level: "Proficient", icon: "Cpu", displayOrder: 4, highlight: true },

  // Backend development
  { id: 5, name: "Spring Framework", category: "Backend Development", level: "Proficient", icon: "Layers", displayOrder: 5, highlight: true },
  { id: 6, name: "Spring Boot", category: "Backend Development", level: "Core Strength", icon: "Server", displayOrder: 6, highlight: true },
  { id: 7, name: "Hibernate ORM", category: "Backend Development", level: "Core Strength", icon: "Database", displayOrder: 7, highlight: true },
  { id: 8, name: "REST APIs", category: "Backend Development", level: "Core Strength", icon: "Globe", displayOrder: 8, highlight: true },
  { id: 9, name: "JDBC", category: "Backend Development", level: "Proficient", icon: "HardDrive", displayOrder: 9, highlight: false },
  { id: 10, name: "JSP & Servlets", category: "Backend Development", level: "Proficient", icon: "FileCode", displayOrder: 10, highlight: false },
  { id: 11, name: "MVC Architecture", category: "Backend Development", level: "Core Strength", icon: "LayoutGrid", displayOrder: 11, highlight: true },
  { id: 12, name: "Microservices Concepts", category: "Backend Development", level: "Proficient", icon: "Boxes", displayOrder: 12, highlight: true },
  { id: 13, name: "Embedded Tomcat", category: "Backend Development", level: "Proficient", icon: "Server", displayOrder: 13, highlight: false },
  { id: 14, name: "Maven", category: "Backend Development", level: "Proficient", icon: "Package", displayOrder: 14, highlight: false },

  // Frontend development
  { id: 15, name: "React JS", category: "Frontend Development", level: "Proficient", icon: "Atom", displayOrder: 15, highlight: true },
  { id: 16, name: "HTML5", category: "Frontend Development", level: "Proficient", icon: "Layout", displayOrder: 16, highlight: false },
  { id: 17, name: "CSS3", category: "Frontend Development", level: "Proficient", icon: "Palette", displayOrder: 17, highlight: false },
  { id: 18, name: "JavaScript (DOM)", category: "Frontend Development", level: "Proficient", icon: "Code", displayOrder: 18, highlight: false },

  // Databases
  { id: 19, name: "MySQL", category: "Databases", level: "Core Strength", icon: "Database", displayOrder: 19, highlight: true },
  { id: 20, name: "Database Schema Design", category: "Databases", level: "Core Strength", icon: "Table", displayOrder: 20, highlight: true },
  { id: 21, name: "SQL Query Optimization", category: "Databases", level: "Certified Specialist", icon: "Zap", displayOrder: 21, highlight: true },
  { id: 22, name: "Indexing & B-Trees", category: "Databases", level: "Core Strength", icon: "Key", displayOrder: 22, highlight: true },
  { id: 23, name: "Relational Concepts", category: "Databases", level: "Core Strength", icon: "Network", displayOrder: 23, highlight: false },

  // Tools and practices
  { id: 24, name: "Git & GitHub", category: "Tools & Practices", level: "Proficient", icon: "GitBranch", displayOrder: 24, highlight: true },
  { id: 25, name: "Postman API Testing", category: "Tools & Practices", level: "Proficient", icon: "Send", displayOrder: 25, highlight: true },
  { id: 26, name: "Eclipse IDE", category: "Tools & Practices", level: "Proficient", icon: "Terminal", displayOrder: 26, highlight: false },
  { id: 27, name: "VS Code", category: "Tools & Practices", level: "Proficient", icon: "Monitor", displayOrder: 27, highlight: false },
  { id: 28, name: "OOP & SOLID Principles", category: "Tools & Practices", level: "Core Strength", icon: "ShieldCheck", displayOrder: 28, highlight: true },
  { id: 29, name: "Agile / Scrum", category: "Tools & Practices", level: "Trained", icon: "Users", displayOrder: 29, highlight: false },
  { id: 30, name: "DAO-Service-Controller", category: "Tools & Practices", level: "Core Strength", icon: "Layers", displayOrder: 30, highlight: true },

  // Cloud
  { id: 31, name: "AWS EC2 Fundamentals", category: "Cloud", level: "Foundations", icon: "Cloud", displayOrder: 31, highlight: false },
  { id: 32, name: "AWS S3 Fundamentals", category: "Cloud", level: "Foundations", icon: "CloudRain", displayOrder: 32, highlight: false },
  { id: 33, name: "AWS RDS Fundamentals", category: "Cloud", level: "Foundations", icon: "Server", displayOrder: 33, highlight: false }
];

export const initialExperience = [
  {
    id: 1,
    role: "Java Full Stack Development Intern",
    company: "JSpiders",
    location: "Hyderabad, Telangana, India",
    period: "2026",
    description: "Production-style enterprise full-stack development internship focusing on building maintainable backend applications, resilient REST APIs, relational databases, and modern React user interfaces under Agile methodology.",
    highlights: `Built and consumed REST APIs with Spring Boot as part of an Agile/Scrum team, validating endpoint reliability through structured Postman test suites.
Developed and integrated React JS components with backend REST APIs to deliver responsive user interfaces.
Wrote and optimized MySQL queries, applying indexing strategies that improved data retrieval performance in team benchmarks.
Followed DAO-Service-Controller layered architecture and clean-code standards through peer code review, using Git/GitHub for version control.`,
    skillsUsed: "Java, Spring Boot, Hibernate ORM, REST APIs, React JS, MySQL, Postman, Git, GitHub, Agile/Scrum, DAO-Service-Controller",
    displayOrder: 1
  }
];

export const initialEducation = [
  {
    id: 1,
    degree: "B.Tech, Electronics & Communication Engineering",
    institution: "Mother Teresa Institute of Science & Technology, Sathupally",
    location: "Telangana, India",
    period: "2021 – 2025",
    grade: "CGPA: 7.7 / 10",
    description: "Built strong foundations in computational logic, microprocessors, signal processing, and system engineering. Synthesized analytical hardware knowledge into high-performance software engineering and Java backend architecture.",
    displayOrder: 1
  },
  {
    id: 2,
    degree: "Intermediate (MPC — Mathematics, Physics, Chemistry)",
    institution: "VKDVS Raju Junior College, Aswaraopeta",
    location: "Telangana, India",
    period: "2019 – 2021",
    grade: "CGPA: 8.8 / 10",
    description: "Excelled in higher mathematics, algorithmic thinking, and scientific analysis, establishing strong quantitative foundations for advanced computing.",
    displayOrder: 2
  }
];

export const initialCertifications = [
  {
    id: 1,
    title: "Infosys Certified SQL Developer",
    issuer: "Infosys",
    issueYear: "Verified",
    credentialUrl: "",
    badgeIcon: "Database",
    displayOrder: 1
  },
  {
    id: 2,
    title: "JSpiders Java Full Stack Development Certification",
    issuer: "JSpiders",
    issueYear: "2026",
    credentialUrl: "",
    badgeIcon: "Code",
    displayOrder: 2
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    issuer: "Edzeeta",
    issueYear: "Verified",
    credentialUrl: "",
    badgeIcon: "Cpu",
    displayOrder: 3
  }
];
