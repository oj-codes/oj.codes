---
title: UpLink Azure Migration
description: Wrote Terraform modules to migrate UpLink from AWS into Azure, including Container Apps, Document Intelligence and OpenAI–backed services. Designed end-to-end CI/CD pipelines for both backend and frontend, and built Azure Dashboards to surface key SLIs and SLOs (CPU, memory, error rate and latency metrics) for every microservice.
date: 2025-01-28
image: datasnipperuplinklogo.jpg
tags: Terraform, Azure CLI, Azure Container Apps, Azure Key Vault, Azure Service Bus, Log Analytics, Github Actions, OpenAI
---

# UpLink Azure Migration

## Overview

I am the Senior SRE on the UpLink team during the migration of DataSnipper's UpLink platform from AWS to Azure, implementing modern cloud-native architecture and comprehensive monitoring solutions.

The UpLink Azure Migration project was a comprehensive initiative to move the UpLink application, formerly hosted on AWS, into Microsoft Azure.

My primary goals were to:

- Standardize all infrastructure as code for consistency and repeatability
- Establish automated CI/CD pipelines for both frontend and backend components
- Centralize observability through custom dashboards
- Reduce operational toil and improve deployment velocity

By leveraging Azure’s native services, we enabled the team to deploy changes faster, gain end-to-end visibility, and operate within the West Europe region in addition to our existing East US presence. 

## Key Features
- **Modular Terraform Modules**: Network, compute, storage, and RBAC components packaged for reuse
- **Automated Pipelines**: End-to-end GitHub Action pipelines for build, test, and deploy of frontend and backend
- **Live Dashboards**: Custom Azure Monitor workbooks surfacing SLIs/SLOs for Container Apps, Document Intelligence, and OpenAI calls
- **Secrets Management**: Centralized secret injection via Key Vault-backed service connections

### Infrastructure as Code
- **Terraform Modules**: Developed reusable Terraform modules for Azure Container Apps, Document Intelligence services, and Azure Service Bus integration
- **Environment Consistency**: Ensured identical infrastructure across development, staging, and production environments
- **Security Best Practices**: Implemented Azure Key Vault integration for secrets management and RBAC for access control

### CI/CD Pipeline Design
- **End-to-End Automation**: Built comprehensive CI/CD pipelines for both backend microservices and frontend applications
- **Multi-Environment Deployment**: Automated deployments across development, staging, and production with proper approval gates

### Monitoring & Observability
- **Azure Dashboards**: Created comprehensive dashboards for every microservice with key SLIs and SLOs
- **Metrics Collection**: Implemented CPU, memory, error rate, and latency monitoring for all services
- **Alerting**: Set up intelligent alerting based on service health and performance thresholds

## Technical Stack

- **Infrastructure**: Azure Container Apps, Azure Document Intelligence, Azure Service Bus, OpenAI Services
- **IaC**: Terraform
- **CI/CD**: Azure DevOps, GitHub Actions
- **Monitoring**: Azure Log Analytics, Dashboards, and Alerts
- **Security**: Azure Key Vault

## Implementation Details
We began by architecting a robust infrastructure foundation in Terraform, defining a landing zone complete with virtual networks, subnets, and network security groups. To promote consistency and reuse, we modularized key components, such as Container Apps environments and Azure Key Vault instances, and configured remote state storage in Azure Storage.

Next, we crafted dedicated GitHub Action pipelines in Azure DevOps for both the React frontend and Python backend. Each pipeline orchestrates Terraform plan/apply tasks alongside build, test, and deploy stages. We also layered in manual approval gates for production deployments to enforce compliance and reduce risk.

For end-to-end visibility, we instrumented our microservices with the Application Insights SDK, enabling custom events and metrics collection. Log Analytics queries track error rates, request latency, and resource utilization, which we surface through Azure Dashboards featuring real-time charts and drill-down logs.

Security was baked in at every layer: all secrets live in Azure Key Vault and are accessed via managed identities to maintain least-privilege access. Role-based access controls on resource groups and pipeline service principals ensure only authorized personnel can trigger deployments or view sensitive data.

Finally, the new Azure environment was deployed in parallel with AWS, and new DNS records and urls were provisioned after automated integration tests validated feature parity. When the migration is successfully completed, we decommissioned AWS resources to eliminate configuration drift and capture cost savings.

## Challenges and Solutions
One of the biggest hurdles we faced was that none of the UpLink team had prior Azure experience. To bridge this gap, we enrolled in Microsoft’s Fast Track program, which paired us with Azure engineers for weekly coaching sessions. During these meetings we validated our landing-zone design, refined our Terraform modules, and gradually built confidence in key services like Container Apps, Service Bus, and Key Vault.

Coordinating work between our SRE team in Amsterdam and the UpLink engineers on the U.S. East Coast introduced another layer of complexity. We overcame this by establishing a rotating “core hours” schedule that guaranteed at least three overlapping work hours each weekday, volunteered to work earlier than my scheduled time to meet with them while another SRE from the Amsterdam team volunteered to stay later,and by running asynchronous design reviews in shared Notion pages and Azure DevOps/GitHub pull requests to keep everyone aligned despite the time-zone gap.

Working with the Azure Terraform provider proved challenging; early versions exhibited erratic behaviors and intermittent errors as we defined complex networking and RBAC modules. To address this, we contributed bug reports upstream, implemented retries and workarounds in our wrapper scripts, and locked our provider version until stability improvements were released. This ensured our Terraform runs became predictable and reliable.

## Results

- **Zero Downtime Migration**: Successfully migrated production services without any customer impact
- **Data Sovereignty**: European customers now have their data hosted within their borders
- **Improved Performance**: 30% reduction in average response times
- **Enhanced Reliability**: 99.9% uptime achieved through improved monitoring and alerting
- **Cost Optimization**: 25% reduction in infrastructure costs through Azure's pricing model

## Lessons Learned

The migration highlighted the importance of:
- Comprehensive testing in staging environments
- Detailed monitoring and observability from day one
- Clear communication with stakeholders throughout the process
- Having rollback plans for every deployment 