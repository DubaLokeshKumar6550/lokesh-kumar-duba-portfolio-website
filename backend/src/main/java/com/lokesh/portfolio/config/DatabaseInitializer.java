package com.lokesh.portfolio.config;

import com.lokesh.portfolio.model.*;
import com.lokesh.portfolio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedProfile();
        seedProjects();
        seedSkills();
        seedExperience();
        seedEducation();
        seedCertifications();
    }

    private void seedAdminUser() {
        Optional<AdminUser> existing = adminUserRepository.findByUsername(adminUsername);
        if (existing.isEmpty()) {
            existing = adminUserRepository.findByEmail(adminEmail);
        }
        if (existing.isEmpty()) {
            AdminUser admin = new AdminUser(adminUsername, adminPassword, adminEmail);
            admin.setRole("ROLE_ADMIN");
            adminUserRepository.save(admin);
        } else {
            AdminUser admin = existing.get();
            admin.setEmail(adminEmail);
            admin.setRole("ROLE_ADMIN");
            adminUserRepository.save(admin);
        }
    }

    private void seedProfile() {
        if (profileRepository.count() == 0) {
            Profile profile = new Profile();
            profile.setName("Duba Lokesh Kumar");
            profile.setHeadline("Java Full Stack Developer | Associate Software Engineer");
            profile.setSummary("Java Full Stack Developer with production-style internship experience building high-performance REST APIs and microservices on Spring Boot, Hibernate, and MySQL, with React JS front ends. Adept in DAO-Service-Controller layered architecture, relational schema normalization, and SQL indexing optimization.");
            profile.setBio("I am an enthusiastic Java Full Stack Developer based in Hyderabad, India. I hold a B.Tech in Electronics & Communication Engineering and have undergone rigorous full-stack software development training and internship at JSpiders. My engineering mindset centers on writing clean, modular, testable, and maintainable backend code, designing resilient RESTful APIs, tuning database query performance, and crafting responsive user interfaces.");
            profile.setLocation("Hyderabad, Telangana, India");
            profile.setEmail("dubalokeshkumar6550@gmail.com");
            profile.setPhone("+91 8978772539");
            profile.setGithubUrl("https://github.com/DubaLokeshKumar6550");
            profile.setLinkedinUrl("https://linkedin.com/in/lokeshkumarduba");
            profile.setPhotoUrl("/lokesh-photo.jpg");
            profile.setResumeUrl("/Duba_Lokesh_Kumar_Resume.pdf");
            profile.setAvailableForWork(true);
            profileRepository.save(profile);
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            // Project 1: Payment Integration System
            Project p1 = new Project();
            p1.setTitle("Payment Integration System");
            p1.setSlug("payment-integration-system");
            p1.setTagline("Secure, event-driven payment auditing & transaction processing microservice with Stripe API, Spring Boot, and MySQL");
            p1.setDescription("A robust payment integration application with real-time transaction logging, comprehensive auditing, automated webhook event verification, and configurable risk-threshold flags to safeguard transactions prior to final settlement.");
            p1.setProblemStatement("Modern online platforms encounter financial discrepancies, unhandled asynchronous webhook drops, and vulnerability to duplicate or anomalous high-risk transactions during payment processing. A reliable, auditable, and decoupled integration system was required to process payments, verify external webhook events reliably, flag suspect transaction amounts, and provide real-time visibility to administrators.");
            p1.setSolution("Engineered an event-driven payment auditing module with Spring Boot REST APIs and a React JS dashboard, persisting all transaction states in MySQL. Integrated Stripe PaymentIntents and Webhook signatures for cryptographically verified payment lifecycle callbacks. Implemented configurable threshold evaluation rules that instantly flag high-value or suspect transactions into an audit queue before ledger settlement.");
            p1.setArchitectureOverview("Built following a decoupled DAO-Service-Controller layered architecture. The customer-facing or internal UI initiates payment intents through Spring Boot REST endpoints. Stripe processes the payment, while asynchronous webhook events are sent directly server-to-server. The Spring Boot backend cryptographically verifies Stripe webhook signatures, triggers auditing business logic, flags transactions meeting risk rules, and persists normalized records into MySQL. The React management dashboard retrieves real-time audit logs via REST APIs.");
            p1.setArchitectureDiagram("Customer / React UI ──[HTTP POST /api/payment/create-intent]──> Spring Boot Controller\n  │                                                                 │\n  │ (Client initiates charge)                                        ▼\n  ▼                                                      PaymentService (Business Logic)\nStripe Elements SDK ──[Processes Payment Token]──> Stripe API Gateway\n                                                            │\n                                                            ▼ (Asynchronous Server-to-Server Event)\nSpring Boot Webhook Controller <──[POST /api/webhooks/stripe (HMAC-SHA256 Signature)]─┘\n  │\n  ├──> Signature Verification & Event Idempotency Check\n  ├──> Risk Threshold Evaluator (Flags > Threshold or Anomalies)\n  └──> Payment DAO / JPA Repository\n         │\n         ▼\n    MySQL Database (Indexed `transactions` & `audit_logs` tables)\n         │\n         ▲ (Polling / REST GET /api/audit-logs)\n         │\n   React Admin Dashboard (Audit Status & Flag Resolution)");
            p1.setTechnologies("Java, Spring Boot, REST APIs, Stripe API, React JS, MySQL, DAO–Service–Controller architecture, Microservices concepts");
            p1.setFeatures("Stripe Payment Workflows: Full support for one-time checkout charges, payment intent confirmation, and refunds.\nAsynchronous Webhook Processing: Dedicated server-to-server webhook endpoint verifying cryptographic signatures to handle charge.succeeded and charge.failed events.\nReal-Time Audit & Risk Flags: Configurable risk-threshold evaluation flagging unusual transaction amounts before settlement.\nTransaction Auditing & Idempotency: Complete audit trail with timestamps, Stripe charge IDs, client metadata, and idempotency protection against duplicate event delivery.\nReact Management Dashboard: Dynamic, responsive dashboard for viewing transaction statuses, filtering audit flags, and inspecting raw event payloads.\nDAO-Service-Controller Layering: Strict separation of concerns ensuring code maintainability and testability.\nMySQL Performance Tuning: Normalized relational schema with targeted B-Tree indexes on transaction timestamp, status, and customer identifiers to ensure sub-millisecond lookups.");
            p1.setChallenges("Handling Asynchronous Stripe Webhooks: Webhooks arrive out-of-order or redundantly. Solved by implementing an idempotency key registry in MySQL and decoupling synchronous checkout response from asynchronous ledger confirmation.\nWebhook Security: Ensured tamper-proof verification using Stripe's HMAC-SHA256 signature headers to thwart replay attacks.\nHigh-Volume Lookup Latency: Simulated high-volume query benchmarks and added composite indexes on (status, created_at) which cut lookup query execution time drastically.");
            p1.setTesting("Executed extensive Postman collections covering edge cases: valid charges, card decline simulations, refund rollbacks, and webhook signature tampering. Validated endpoint reliability under concurrent load.");
            p1.setFutureImprovements("Introduce Redis distributed caching for transaction idempotency caching. Add WebSocket-based push notifications directly to the React dashboard for instant zero-latency risk alerts.");
            p1.setLiveDemoUrl("");
            p1.setGithubUrl("");
            p1.setImageUrl("/projects/payment-system.png");
            p1.setStatus("COMPLETED");
            p1.setDisplayOrder(1);
            p1.setFeatured(true);
            projectRepository.save(p1);

            // Project 2: Bank Management System
            Project p2 = new Project();
            p2.setTitle("Bank Management System");
            p2.setSlug("bank-management-system");
            p2.setTagline("High-integrity banking transaction management platform with Hibernate ORM, ACID safeguards, and normalized MySQL schema");
            p2.setDescription("A enterprise-grade banking application designed to manage customer accounts, deposits, withdrawals, and multi-account fund transfers with strict balance validation, transaction rollback protection, and OOP data-integrity safeguards.");
            p2.setProblemStatement("Financial management systems require absolute zero-tolerance for data anomalies, race conditions, or partial updates. A failure during a fund transfer between accounts can lead to phantom deposits or lost capital if atomicity is not rigorously guaranteed.");
            p2.setSolution("Architected an Object-Oriented banking core in Java leveraging Hibernate ORM and MySQL. Enforced strict ACID transaction boundaries where debit and credit steps execute within a single atomic database transaction. Created normalized schemas with foreign key integrity and OOP-based encapsulation to prohibit negative balances or concurrent state corruption.");
            p2.setArchitectureOverview("Structured using clean Object-Oriented Principles and Hibernate ORM session management. User requests pass through input sanitization and domain validation. The Banking Service establishes an explicit Hibernate transaction boundary. Account balances are locked, verified, and updated atomically. An immutable transaction ledger record is generated. In the event of any validation breach or system failure, the entire unit of work automatically rolls back, keeping account ledgers 100% consistent.");
            p2.setArchitectureDiagram("Enter Transfer Details (Source, Destination, Amount)\n               │\n               ▼\n       Validate Input Data (Format, Non-Zero, Non-Negative)\n               │\n               ▼\n       Verify Accounts Exist & Status is Active\n               │\n               ▼\n       Check Available Balance in Source Account\n       (Source Balance >= Transfer Amount + Minimum Reserve?)\n          ├── [NO] ──> Reject with InsufficientFundsException\n          └── [YES]\n               │\n               ▼\n   ┌────────────────────────────────────────────────────────┐\n   │  BEGIN DATABASE TRANSACTION (Hibernate Session)         │\n   │                                                        │\n   │  1. Debit Source Account: balance = balance - amount   │\n   │  2. Credit Destination:   balance = balance + amount   │\n   │  3. Insert Immutable Ledger Record (Audit Trail)       │\n   │                                                        │\n   │  [Any Exception / System Failure?]                     │\n   │     ├── [YES] ──> ROLLBACK TRANSACTION (Zero Impact)   │\n   │     └── [NO]  ──> COMMIT TRANSACTION (Persisted)       │\n   └────────────────────────────────────────────────────────┘\n               │\n               ▼\n       Display Real-Time Confirmation & Updated Balances");
            p2.setTechnologies("Java, Hibernate ORM, MySQL, Object-Oriented Programming (OOP), SOLID Principles, JDBC, DAO Pattern");
            p2.setFeatures("Account Management: Open, inspect, update, and manage checking, savings, and corporate accounts.\nAtomic Fund Transfers: Multi-account fund transfer engine with automatic transaction rollback to prevent money loss during failures.\nStrict Balance Validation: Real-time invariant enforcement ensuring overdrafts and negative balances cannot occur.\nDeposit & Withdrawal Workflows: Instant processing with input sanitization and verification.\nHibernate ORM Persistence: Object-relational mapping cleanly bridging Java domain models to normalized relational tables.\nNormalized MySQL Schema: 3NF relational design minimizing redundancy while maintaining referential integrity through foreign keys.\nOOP Encapsulation & Data Integrity: Private state encapsulation preventing external manipulation of account balances without going through verified domain methods.");
            p2.setChallenges("Preventing Inconsistent Balances During Concurrent Transfers: If two transactions attempt to transfer funds from the same account concurrently, race conditions can occur. Solved by leveraging database-level row locking and Hibernate transaction demarcation.\nData Normalization vs Performance: Designed a normalized 3NF schema for accounts, customers, and transactions while optimizing join queries through indexing on account_number and transaction_date.");
            p2.setTesting("Unit tested domain invariants (e.g. attempting transfers greater than current balance, negative values, non-existent destination accounts). Verified that rollbacks leave both accounts with exact pre-transfer balances.");
            p2.setFutureImprovements("Add multi-factor authentication (MFA) for high-value fund transfers. Implement automated monthly account statement generation in PDF format.");
            p2.setLiveDemoUrl("");
            p2.setGithubUrl("");
            p2.setImageUrl("/projects/bank-system.png");
            p2.setStatus("COMPLETED");
            p2.setDisplayOrder(2);
            p2.setFeatured(true);
            projectRepository.save(p2);
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = Arrays.asList(
                // Languages
                new Skill("Java", "Programming Languages", "Core Strength", "Code", 1, true),
                new Skill("Python", "Programming Languages", "Proficient", "Terminal", 2, false),
                new Skill("SQL", "Programming Languages", "Certified Specialist", "Database", 3, true),
                new Skill("JavaScript (ES6+)", "Programming Languages", "Proficient", "Cpu", 4, true),

                // Backend & Frameworks
                new Skill("Spring Framework", "Backend Development", "Proficient", "Layers", 5, true),
                new Skill("Spring Boot", "Backend Development", "Core Strength", "Server", 6, true),
                new Skill("Hibernate ORM", "Backend Development", "Core Strength", "Database", 7, true),
                new Skill("REST APIs", "Backend Development", "Core Strength", "Globe", 8, true),
                new Skill("JDBC", "Backend Development", "Proficient", "HardDrive", 9, false),
                new Skill("JSP & Servlets", "Backend Development", "Proficient", "FileCode", 10, false),
                new Skill("MVC Architecture", "Backend Development", "Core Strength", "LayoutGrid", 11, true),
                new Skill("Microservices Concepts", "Backend Development", "Proficient", "Boxes", 12, true),
                new Skill("Embedded Tomcat", "Backend Development", "Proficient", "Server", 13, false),
                new Skill("Maven", "Backend Development", "Proficient", "Package", 14, false),

                // Frontend Development
                new Skill("React JS", "Frontend Development", "Proficient", "Atom", 15, true),
                new Skill("HTML5", "Frontend Development", "Proficient", "Layout", 16, false),
                new Skill("CSS3", "Frontend Development", "Proficient", "Palette", 17, false),
                new Skill("JavaScript (DOM)", "Frontend Development", "Proficient", "Code", 18, false),

                // Databases
                new Skill("MySQL", "Databases", "Core Strength", "Database", 19, true),
                new Skill("Database Schema Design", "Databases", "Core Strength", "Table", 20, true),
                new Skill("SQL Query Optimization", "Databases", "Certified Specialist", "Zap", 21, true),
                new Skill("Indexing & B-Trees", "Databases", "Core Strength", "Key", 22, true),
                new Skill("Relational Database Concepts", "Databases", "Core Strength", "Network", 23, false),

                // Tools & Practices
                new Skill("Git & GitHub", "Tools & Practices", "Proficient", "GitBranch", 24, true),
                new Skill("Postman API Testing", "Tools & Practices", "Proficient", "Send", 25, true),
                new Skill("Eclipse IDE", "Tools & Practices", "Proficient", "Terminal", 26, false),
                new Skill("VS Code", "Tools & Practices", "Proficient", "Monitor", 27, false),
                new Skill("OOP & SOLID Principles", "Tools & Practices", "Core Strength", "ShieldCheck", 28, true),
                new Skill("Agile / Scrum", "Tools & Practices", "Trained", "Users", 29, false),
                new Skill("DAO-Service-Controller Pattern", "Tools & Practices", "Core Strength", "Layers", 30, true),

                // Cloud
                new Skill("AWS EC2 Fundamentals", "Cloud", "Foundations", "Cloud", 31, false),
                new Skill("AWS S3 Fundamentals", "Cloud", "Foundations", "CloudRain", 32, false),
                new Skill("AWS RDS Fundamentals", "Cloud", "Foundations", "Server", 33, false)
            );
            skillRepository.saveAll(skills);
        }
    }

    private void seedExperience() {
        if (experienceRepository.count() == 0) {
            Experience exp = new Experience();
            exp.setRole("Java Full Stack Development Intern");
            exp.setCompany("JSpiders");
            exp.setLocation("Hyderabad, Telangana, India");
            exp.setPeriod("2026");
            exp.setDescription("Comprehensive full-stack software engineering internship focused on developing enterprise Java backends, RESTful APIs, responsive React interfaces, and optimized relational database systems under an Agile/Scrum team structure.");
            exp.setHighlights("Built and consumed REST APIs with Spring Boot as part of an Agile/Scrum team, validating endpoint reliability through structured Postman test suites.\nDeveloped and integrated React JS components with backend REST APIs to deliver responsive, seamless user interfaces.\nWrote and optimized complex MySQL queries, applying indexing strategies that improved data retrieval performance in team benchmarks.\nFollowed DAO-Service-Controller layered architecture and clean-code standards through peer code review, using Git/GitHub for version control and collaborative workflows.");
            exp.setSkillsUsed("Java, Spring Boot, Hibernate ORM, REST APIs, React JS, MySQL, Postman, Git, GitHub, Agile/Scrum, DAO-Service-Controller");
            exp.setDisplayOrder(1);
            experienceRepository.save(exp);
        }
    }

    private void seedEducation() {
        if (educationRepository.count() == 0) {
            Education edu1 = new Education();
            edu1.setDegree("B.Tech, Electronics and Communication Engineering");
            edu1.setInstitution("Mother Teresa Institute of Science & Technology, Sathupally");
            edu1.setLocation("Telangana, India");
            edu1.setPeriod("2021 – 2025");
            edu1.setGrade("CGPA: 7.7 / 10");
            edu1.setDescription("Graduated with strong fundamentals in computing systems, algorithmic problem solving, logic design, and digital technologies. Transitioned passionate engineering focus toward Java full-stack enterprise development.");
            edu1.setDisplayOrder(1);
            educationRepository.save(edu1);

            Education edu2 = new Education();
            edu2.setDegree("Intermediate (MPC — Mathematics, Physics, Chemistry)");
            edu2.setInstitution("VKDVS Raju Junior College, Aswaraopeta");
            edu2.setLocation("Telangana, India");
            edu2.setPeriod("2019 – 2021");
            edu2.setGrade("CGPA: 8.8 / 10");
            edu2.setDescription("Completed senior secondary education with high academic distinction in advanced mathematics, analytical sciences, and computational reasoning.");
            edu2.setDisplayOrder(2);
            educationRepository.save(edu2);
        }
    }

    private void seedCertifications() {
        if (certificationRepository.count() == 0) {
            Certification c1 = new Certification(
                "Infosys Certified SQL Developer",
                "Infosys",
                "Verified",
                "",
                "Database",
                1
            );
            Certification c2 = new Certification(
                "JSpiders Java Full Stack Development Certification",
                "JSpiders",
                "2026",
                "",
                "Code",
                2
            );
            Certification c3 = new Certification(
                "Data Science Fundamentals",
                "Edzeeta",
                "Verified",
                "",
                "Cpu",
                3
            );
            certificationRepository.saveAll(Arrays.asList(c1, c2, c3));
        }
    }
}
