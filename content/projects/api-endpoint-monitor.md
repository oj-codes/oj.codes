---
title: API Endpoint Monitor
description: Rebuilt and expanded a legacy endpoint-monitoring service. As Lead SRE, designed a service-based architecture using Kafka for event ingestion, React for the dashboard, and Python workers for health checks, metrics collection, and alerting. Delivered sub-second detection of outages and streamlined on-call workflows.  
date: 2019-10-21
image: amexlogo.svg
tags: React, Python, Docker, Apache Kafka, Couchbase, OpenShift, GitHub Actions, Slack Integrations
---

# API Endpoint Monitor

## Project Overview

The API Endpoint Monitor project set out to modernize and extend our legacy uptime-checking tool into a scalable, event-driven monitoring platform. As Lead SRE, I redesigned the system around a service-based architecture: Kafka serves as the backbone for ingesting health-check events at high throughput, Python worker services perform distributed endpoint probes, collect metrics, and trigger alerts, and a React-based dashboard provides real-time visibility into service health. By rebuilding the codebase from the ground up, we achieved sub-second outage detection, granular performance insights, and an integrated alert pipeline, streamlining on-call workflows and ensuring our teams could respond faster and more confidently to service degradations.

## Tech Stack

- React
- Python
- Docker
- Apache Kafka
- Couchbase
- OpenShift
- GitHub Actions
- Slack Integrations

## Key Features

- High-throughput event ingestion pipeline using Kafka for reliable, ordered delivery of health-check events
- Distributed Python workers that perform asynchronous endpoint probes with configurable intervals, timeouts, and retry policies
- Interactive React dashboard displaying live service health, historical uptime graphs, and drill-down logs for rapid troubleshooting
- Kubernetes-based deployment with auto-scaling of worker and API services to handle variable monitoring loads
- Metric storage in Couchbase, enabling custom queries and long-term retention of performance data
- Integrated Slack notifications and on-call rotation support to streamline incident response workflows
- Single sign-on with JWT-based authentication and role-based access controls to secure the monitoring API and dashboard

## Implementation Details

To build the API Endpoint Monitor, we first provisioned a Kafka cluster and defined dedicated topics for health-check events, tuning partitioning and replication to ensure reliable, ordered delivery. Python worker services, deployed as Docker containers on our Kubernetes cluster, subscribe to these topics and perform asynchronous HTTP probes with configurable intervals, timeouts, and retries. Each worker writes status updates and performance metrics, such as response times and error codes, into Couchbase buckets optimized with TTL policies and secondary indexes for efficient querying.

The backend API, written in Python, exposes endpoints that allow the React dashboard to fetch both real-time and historical data directly from Couchbase. On the frontend, React's state management and charting libraries render live service health views, uptime graphs, and drill-down logs.

Authentication across the API and UI leverages American Express's single sign-on framework, enforcing corporate access policies without requiring additional credentials. Our GitHub Actions pipelines complete the delivery lifecycle by building and testing application code, packaging Docker images, and deploying updated services into our OpenShift environments, providing a fully automated, secure, and auditable release process.

## Challenges and Solutions

As the number of monitored endpoints grew, our Kafka ingestion pipeline began to experience backpressure and uneven partition loads. To address this, we tuned the number of partitions and optimized consumer group assignments. We also implemented idempotent message handlers in our Python workers so failed probes could be retried safely without duplicate entries.

Managing high-volume health checks introduced complexity around concurrency and resource utilization. We solved this by introducing a configurable worker-pool mechanism that limits the number of parallel probes per instance and by implementing adaptive timeout logic that adjusts intervals based on endpoint responsiveness—ensuring we didn't overwhelm targets or waste compute cycles on unresponsive services.

Writing large volumes of metrics to Couchbase initially led to performance degradation due to index contention and bucket size limits. We overcame this by sharding metrics data across multiple buckets keyed by service namespace, applying TTL policies to purge stale records automatically, and creating composite indexes on critical query fields to accelerate dashboard lookups.

Integrating corporate single sign-on required both our React dashboard and Python API to participate in the same authentication flow. We leveraged our internal SSO SDK to enforce session tokens at the API gateway, standardized token refresh logic in the frontend, and developed a shared middleware layer to apply consistent role-based access controls across all endpoints.

Finally, ensuring rapid, zero-downtime releases demanded a resilient deployment strategy. We built GitHub Actions workflows that package and test Docker images, then deploy via Kubernetes rolling updates with built-in health probes. This setup allowed us to verify service readiness before shifting traffic and to automatically roll back any failed deployments, keeping the monitoring platform highly available.

## Results

- Handled over 500,000 health-check events per day (peak throughputs exceeding 350 events/second) without backpressure issues.
- Reduced average outage detection latency to 300 ms, with 99.98% of failures detected in under one second.
- Monitored 20+ endpoints across 3 services at launch and scaled seamlessly to 500+ endpoints without any architectural changes.
- Maintained 99.99% platform uptime over six months, ensuring continuous monitoring and alerting.
- Cut mean time to resolution by 60%, dropping from 30 minutes to 12 minutes thanks to integrated Slack alerts and real-time dashboard insights. 