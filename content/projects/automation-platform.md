---
title: Automation Platform
description: Developed an internal centralized catalog and execution platform using React on the frontend and Python/Go on the backend. Integrated with Ansible and HashiCorp Vault to securely provision and configure resources. Scaled from zero to 100,000 automated runs per month, serving hundreds of internal applications with self-service automation.
date: 2022-09-22
image: amexlogo.svg
tags: React, Python, Go, Docker, Kubernetes, Couchbase, Kafka, Ansible, Prometheus, HashiCorp Vault, OpenShift, ServiceNow
---

# Automation Platform @ Amex

## Overview

I contributed to, and built core components for, a centralized automation platform that transformed how American Express teams provision and configure infrastructure, scaling from zero to 100,000 automated runs per month.

The Automation Platform is a centralized catalog and execution engine that lets teams register, discover, and run reusable automations across environments. Users submit automations with metadata (name, description, target host or IP) and attach the actual scripts or code that execute on the specified systems. A built-in promotion workflow moves automations through e1 (development), e2 (staging), and e3 (production) with configurable approval gates. Every automation integrates automatically with our internal ticketing system for traceability, comes with out-of-the-box monitoring dashboards, and is fully accessible via both a user-friendly web interface and a RESTful API for programmatic management.

Beyond individual automations, users can also build multi-step workflows that chain together existing automations in a defined sequence, complete with success and failure conditions. These workflows are constructed via the web interface and visualized with a slick flowchart view, making it easy to design, review, and share complex operational processes. The result is a self-service automation ecosystem that dramatically reduces duplication, improves change governance, and accelerates operational efficiency.


## Platform Architecture

### Frontend
- **React Application**: Modern, responsive UI for catalog browsing and automation execution
- **Real-time Updates**: WebSocket integration for live status updates and progress tracking
- **Role-based Access**: Granular permissions system for different user roles and teams

### Backend Services
- **Python Microservices**: Core automation decision engine
- **Go Services**: High-performance API endpoints and task execution engines
- **Event-driven Architecture**: Kafka integration for reliable message processing and event sourcing

### Security Integration
- **HashiCorp Vault**: Centralized secrets management for all automation workflows
- **Ansible Integration**: Secure configuration management and infrastructure provisioning
- **Audit Logging**: Comprehensive audit trails for all automation activities

## Key Features

### Self-Service Catalog
- **Automation Templates**: Pre-built, tested automation workflows for common tasks
- **Approval Workflows**: Configurable approval processes for sensitive operations
- **Version Control**: Git integration for automation template versioning and rollbacks

### Execution Engine
- **Parallel Processing**: Concurrent execution of multiple automation tasks
- **Retry Logic**: Intelligent retry mechanisms with exponential backoff
- **Resource Management**: Dynamic resource allocation based on workload demands

### Monitoring & Analytics
- **Real-time Dashboards**: Live monitoring of automation execution and system health
- **Performance Metrics**: Detailed analytics on automation success rates and execution times
- **Cost Tracking**: Resource utilization tracking and cost optimization insights

## Technical Implementation Details

I architected the Automation Platform’s catalog entirely from scratch, using React to deliver a dynamic, component-driven user interface and Go to power a performant backend API. The catalog’s data model, backed by PostgreSQL, was designed to store rich metadata for each automation, such as name, description, target host or IP, tags, and version history, while execution logic is decoupled into attachments that users upload and manage independently. I implemented a secure secrets integration with HashiCorp Vault so that automations can reference credentials at runtime without ever exposing sensitive data in transit or at rest.

To enable complex orchestration, we built a workflow engine that leverages React Flow in the UI for drag-and-drop flowchart creation and encodes each workflow as a Kubernetes Custom Resource Definition. Workflows chain automations together in sequence, allow for branching on success or failure conditions, and are executed by a Go-based controller that watches the API for new or updated CRDs. Under the hood, Ansible serves as the execution engine, dispatching playbooks or scripts across target fleets in parallel and reporting status back to the platform. We instrumented all services with Prometheus exporters and exposed metrics such as queue depth, execution latency, and success rates. Grafana dashboards were assembled to give operations teams real-time visibility into platform health and workflow progress.

For delivery and reliability, I authored comprehensive CI/CD pipelines in GitHub Actions for each microservice. Pipelines begin by running EarlyBird, our internal security scanner, then execute unit tests and integration tests against a disposable OpenShift cluster spun up on demand. Following test success, artifacts are containerized with Docker and deployed via Helm charts into our OpenShift environments, progressing through development, staging, and production namespaces according to configurable promotion policies. The entire platform sits behind an OAuth-protected API gateway, enforces role-based access controls via LDAP group membership, and maintains an immutable audit log of all user actions and automation executions to meet compliance requirements.


### Scalability
- **Horizontal Scaling**: Microservices architecture supporting thousands of concurrent users
- **Load Balancing**: Intelligent load distribution across multiple execution nodes
- **Caching Strategy**: Multi-layer caching for improved performance and reduced latency

### Reliability
- **Fault Tolerance**: Graceful handling of service failures and network issues
- **Data Consistency**: ACID compliance for critical automation state management
- **Backup & Recovery**: Automated backup systems with point-in-time recovery capabilities

## Business Impact

- **100,000+ Monthly Runs**: Scaled from zero to serving hundreds of internal applications
- **90% Time Reduction**: Automated tasks that previously took hours now complete in minutes
- **Improved Compliance**: Standardized automation processes with built-in audit trails
- **Cost Savings**: Reduced manual effort and improved resource utilization

## Challenges and Solutions
Building the Automation Platform from the ground up presented several architectural and operational challenges. Designing a flexible yet robust catalog schema that could accommodate varied metadata (targets ranging from IPs to hostnames, version histories, and custom tags) required careful data modeling in Couchbase. I resolved this by implementing a normalized schema with fields for extensibility, which allowed us to evolve metadata without schema migrations. Integrating with HashiCorp Vault to secure credentials posed its own hurdles: ensuring that secrets could be fetched at runtime without blocking execution or exposing data. I addressed this by caching short-lived Vault tokens in memory and leveraging Vault’s dynamic secrets capability, which both improved performance and upheld least-privilege principles.

Orchestrating complex workflows at scale also introduced significant complexity. The React Flow–based UI needed to be intuitive for drag-and-drop sequence creation, yet the underlying controller had to interpret success and failure branches reliably in Kubernetes. To solve this, we defined each workflow as a custom resource and built a Go operator that watches for changes, enforces idempotency, and retries failed steps according to configurable policies. Integrating Ansible as the execution engine required adding parallelism controls and backoff strategies to avoid throttling target systems. Lastly, ensuring end-to-end security and compliance meant embedding audit logging at every layer, enforcing RBAC, and validating each release via GitHub Actions pipelines that ran EarlyBird security scans and on-demand OpenShift test clusters. These solutions collectively yielded a resilient, secure, and user-friendly automation ecosystem.

## Lessons Learned

- **User Experience Matters**: Intuitive UI design significantly increased platform adoption
- **Security First**: Early integration of security tools prevented compliance issues
- **Monitoring is Critical**: Comprehensive observability enabled rapid issue resolution
- **Documentation Drives Adoption**: Clear documentation and training materials accelerated team onboarding 