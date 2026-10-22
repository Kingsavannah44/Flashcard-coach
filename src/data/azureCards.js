export const azureCards = [
  // ── CORE CONCEPTS ──────────────────────────────────────────────────────────
  {
    id: 1,
    category: "Core Concepts",
    question: "What is an Azure Region?",
    answer:
      "A set of datacenters deployed within a latency-defined perimeter and connected through a dedicated regional low-latency network. Examples: East US, West Europe.",
    tags: ["region", "geography"],
  },
  {
    id: 2,
    category: "Core Concepts",
    question: "What is an Availability Zone?",
    answer:
      "Physically separate datacenters within an Azure region, each with independent power, cooling, and networking. Protects against datacenter-level failures.",
    tags: ["HA", "resilience"],
  },
  {
    id: 3,
    category: "Core Concepts",
    question: "What is a Resource Group?",
    answer:
      "A logical container that holds related Azure resources for a solution. Resources in a group share the same lifecycle — deploy, update, and delete together.",
    tags: ["management"],
  },
  {
    id: 4,
    category: "Core Concepts",
    question: "What is the Azure Resource Manager (ARM)?",
    answer:
      "The deployment and management service for Azure. It provides a management layer to create, update, and delete resources. All requests go through ARM for consistent auth, tagging, and RBAC.",
    tags: ["ARM", "management"],
  },
  {
    id: 5,
    category: "Core Concepts",
    question: "What is a Subscription in Azure?",
    answer:
      "A logical unit of Azure services linked to an Azure account. It provides authenticated access to Azure products/services and is used for billing and resource organization.",
    tags: ["billing", "organization"],
  },
  {
    id: 6,
    category: "Core Concepts",
    question: "What are Azure Management Groups?",
    answer:
      "Containers that help manage access, policy, and compliance across multiple subscriptions. Subscriptions within a group inherit conditions applied to the group.",
    tags: ["governance", "organization"],
  },

  // ── COMPUTE ────────────────────────────────────────────────────────────────
  {
    id: 7,
    category: "Compute",
    question: "What is Azure Virtual Machine (VM)?",
    answer:
      "An on-demand, scalable computing resource. Provides full control over the OS and environment. You manage the OS, middleware, and runtime — Azure manages the hardware.",
    tags: ["IaaS", "VM"],
  },
  {
    id: 8,
    category: "Compute",
    question: "What is Azure App Service?",
    answer:
      "A fully managed PaaS platform for building, deploying, and scaling web apps. Supports .NET, Node.js, Java, Python, PHP. Handles load balancing, patching, and scaling automatically.",
    tags: ["PaaS", "web"],
  },
  {
    id: 9,
    category: "Compute",
    question: "What is Azure Kubernetes Service (AKS)?",
    answer:
      "A managed Kubernetes container orchestration service. Azure handles health monitoring, maintenance, and the control plane — you manage the agent nodes and workloads.",
    tags: ["containers", "Kubernetes"],
  },
  {
    id: 10,
    category: "Compute",
    question: "What is Azure Functions?",
    answer:
      "A serverless compute service that runs small pieces of code (functions) without managing infrastructure. Billed per execution. Supports triggers: HTTP, Timer, Blob, Queue, Event Hub.",
    tags: ["serverless", "FaaS"],
  },
  {
    id: 11,
    category: "Compute",
    question: "What is Azure Virtual Machine Scale Sets?",
    answer:
      "Lets you create and manage a group of identical, load-balanced VMs. Automatically increases/decreases VM count based on demand or a defined schedule.",
    tags: ["scaling", "VM"],
  },
  {
    id: 12,
    category: "Compute",
    question: "What is Azure Container Instances (ACI)?",
    answer:
      "The fastest and simplest way to run a container in Azure without managing VMs or orchestrators. Good for simple apps, task automation, and build jobs.",
    tags: ["containers", "serverless"],
  },

  // ── STORAGE ────────────────────────────────────────────────────────────────
  {
    id: 13,
    category: "Storage",
    question: "What is Azure Blob Storage?",
    answer:
      "Object storage for unstructured data like text, images, videos, backups. Three access tiers: Hot (frequent), Cool (infrequent), Archive (rare). Massively scalable.",
    tags: ["object storage", "blob"],
  },
  {
    id: 14,
    category: "Storage",
    question: "What is Azure Queue Storage?",
    answer:
      "A service for storing large numbers of messages accessible via HTTP/HTTPS. Used for decoupling application components and building async workflows.",
    tags: ["messaging", "queue"],
  },
  {
    id: 15,
    category: "Storage",
    question: "What is Azure Table Storage?",
    answer:
      "A NoSQL key-attribute store for structured, non-relational data. Flexible schema, great for datasets that don't need complex joins. Part of Azure Storage Account.",
    tags: ["NoSQL", "table"],
  },
  {
    id: 16,
    category: "Storage",
    question: "What is Azure Files?",
    answer:
      "Fully managed file shares in the cloud accessible via SMB and NFS protocols. Can be mounted concurrently by cloud or on-premises deployments.",
    tags: ["file share", "SMB"],
  },
  {
    id: 17,
    category: "Storage",
    question: "What are the Azure Storage redundancy options?",
    answer:
      "LRS (Locally Redundant – 3 copies in one datacenter), ZRS (Zone Redundant – 3 zones), GRS (Geo Redundant – LRS + async copy to secondary region), GZRS (GRS + ZRS).",
    tags: ["redundancy", "HA"],
  },

  // ── NETWORKING ─────────────────────────────────────────────────────────────
  {
    id: 18,
    category: "Networking",
    question: "What is an Azure Virtual Network (VNet)?",
    answer:
      "The fundamental building block for private networking in Azure. Enables Azure resources to securely communicate with each other, the internet, and on-premises networks.",
    tags: ["VNet", "networking"],
  },
  {
    id: 19,
    category: "Networking",
    question: "What is a Network Security Group (NSG)?",
    answer:
      "Contains security rules that allow or deny inbound/outbound traffic to/from Azure resources. Applied at subnet or NIC level. Rules evaluated by priority (lower number = higher priority).",
    tags: ["security", "NSG"],
  },
  {
    id: 20,
    category: "Networking",
    question: "What is Azure Load Balancer?",
    answer:
      "Operates at Layer 4 (TCP/UDP). Distributes inbound traffic across healthy backend VMs. Supports public (internet-facing) and internal (private) configurations.",
    tags: ["load balancing", "L4"],
  },
  {
    id: 21,
    category: "Networking",
    question: "What is Azure Application Gateway?",
    answer:
      "A Layer 7 (HTTP/HTTPS) load balancer with WAF, SSL termination, URL-based routing, and cookie-based session affinity. Ideal for web applications.",
    tags: ["load balancing", "WAF", "L7"],
  },
  {
    id: 22,
    category: "Networking",
    question: "What is Azure VPN Gateway?",
    answer:
      "Sends encrypted traffic between an Azure VNet and on-premises over the public internet. Used for Site-to-Site, Point-to-Site, and VNet-to-VNet connections.",
    tags: ["VPN", "hybrid"],
  },
  {
    id: 23,
    category: "Networking",
    question: "What is Azure ExpressRoute?",
    answer:
      "A private, dedicated connection from on-premises to Azure — not over the public internet. Offers higher reliability, faster speeds, and lower latency than VPN. Requires a connectivity provider.",
    tags: ["ExpressRoute", "hybrid", "private"],
  },
  {
    id: 24,
    category: "Networking",
    question: "What is Azure DNS?",
    answer:
      "A hosting service for DNS domains using Azure infrastructure. Provides name resolution using Microsoft's global network. Supports private DNS zones for VNet name resolution.",
    tags: ["DNS"],
  },

  // ── IDENTITY & ACCESS ──────────────────────────────────────────────────────
  {
    id: 25,
    category: "Identity",
    question: "What is Microsoft Entra ID (formerly Azure Active Directory)?",
    answer:
      "Microsoft's cloud-based identity and access management service. Handles authentication and authorization for Azure, Microsoft 365, and thousands of third-party SaaS apps.",
    tags: ["AAD", "identity", "Entra"],
  },
  {
    id: 26,
    category: "Identity",
    question: "What is Role-Based Access Control (RBAC)?",
    answer:
      "Manages who has access to Azure resources, what they can do with them, and what areas they have access to. Built-in roles: Owner, Contributor, Reader. Assigned at scope: management group, subscription, resource group, or resource.",
    tags: ["RBAC", "authorization"],
  },
  {
    id: 27,
    category: "Identity",
    question: "What is a Managed Identity?",
    answer:
      "Provides Azure services with an automatically managed identity in Entra ID. Eliminates the need to manage credentials. Two types: System-assigned (tied to resource lifecycle) and User-assigned (independent lifecycle).",
    tags: ["identity", "credentials"],
  },
  {
    id: 28,
    category: "Identity",
    question: "What is Conditional Access in Entra ID?",
    answer:
      "A tool that automates access control decisions based on signals: user/group, IP location, device, application, and real-time risk. Enforces MFA, block access, or require compliant device.",
    tags: ["MFA", "Zero Trust"],
  },
  {
    id: 29,
    category: "Identity",
    question: "What is the difference between Authentication and Authorization?",
    answer:
      "Authentication (AuthN): verifying WHO you are (identity). Authorization (AuthZ): determining WHAT you are allowed to do (permissions). In Azure: Entra ID handles AuthN, RBAC handles AuthZ.",
    tags: ["AuthN", "AuthZ"],
  },

  // ── SECURITY ───────────────────────────────────────────────────────────────
  {
    id: 30,
    category: "Security",
    question: "What is Azure Key Vault?",
    answer:
      "A managed service for secrets, keys, and certificates. Centralizes storage of application secrets, controls access, and logs all activity. Integrates with Managed Identities for secretless access.",
    tags: ["secrets", "Key Vault"],
  },
  {
    id: 31,
    category: "Security",
    question: "What is Microsoft Defender for Cloud?",
    answer:
      "A Cloud Security Posture Management (CSPM) and Cloud Workload Protection Platform (CWPP). Provides security recommendations, threat detection, and secure score across Azure, hybrid, and multicloud.",
    tags: ["CSPM", "Defender"],
  },
  {
    id: 32,
    category: "Security",
    question: "What is Microsoft Sentinel?",
    answer:
      "A cloud-native SIEM (Security Information and Event Management) and SOAR (Security Orchestration, Automation, Response) solution. Collects data at cloud scale, detects threats, and automates responses.",
    tags: ["SIEM", "SOAR", "Sentinel"],
  },
  {
    id: 33,
    category: "Security",
    question: "What is Azure DDoS Protection?",
    answer:
      "Protects Azure resources from Distributed Denial of Service attacks. Basic tier is free and automatically enabled. Standard tier adds enhanced mitigation, telemetry, and SLA guarantee.",
    tags: ["DDoS", "protection"],
  },

  // ── MONITORING ─────────────────────────────────────────────────────────────
  {
    id: 34,
    category: "Monitoring",
    question: "What is Azure Monitor?",
    answer:
      "A comprehensive solution for collecting, analyzing, and acting on telemetry from cloud and on-premises environments. Collects metrics and logs. Feeds into Log Analytics, dashboards, and alerts.",
    tags: ["monitoring", "observability"],
  },
  {
    id: 35,
    category: "Monitoring",
    question: "What is Azure Log Analytics?",
    answer:
      "A tool to query and analyze log data collected by Azure Monitor. Uses Kusto Query Language (KQL). Logs are stored in a Log Analytics Workspace.",
    tags: ["logs", "KQL"],
  },
  {
    id: 36,
    category: "Monitoring",
    question: "What is Application Insights?",
    answer:
      "An Application Performance Management (APM) service. Monitors live web applications, detects anomalies, tracks requests, dependencies, exceptions, and page views. Part of Azure Monitor.",
    tags: ["APM", "performance"],
  },
  {
    id: 37,
    category: "Monitoring",
    question: "What is Azure Service Health?",
    answer:
      "Provides personalized alerts and guidance when Azure service issues affect you. Three views: Azure Status (global), Service Health (your services), Resource Health (individual resource).",
    tags: ["health", "alerts"],
  },

  // ── DATABASES ──────────────────────────────────────────────────────────────
  {
    id: 38,
    category: "Databases",
    question: "What is Azure SQL Database?",
    answer:
      "A fully managed relational database PaaS based on SQL Server. Handles patching, backups, monitoring, and HA automatically. Supports elastic pools for multi-tenant scenarios.",
    tags: ["SQL", "relational", "PaaS"],
  },
  {
    id: 39,
    category: "Databases",
    question: "What is Azure Cosmos DB?",
    answer:
      "A globally distributed, multi-model NoSQL database. Guarantees single-digit millisecond latency. Supports multiple APIs: SQL, MongoDB, Cassandra, Gremlin, Table. Five consistency levels.",
    tags: ["NoSQL", "Cosmos", "global"],
  },
  {
    id: 40,
    category: "Databases",
    question: "What is Azure Cache for Redis?",
    answer:
      "A fully managed in-memory data store based on Redis. Used for caching, session management, message brokering, and leaderboards. Dramatically reduces database load and latency.",
    tags: ["cache", "Redis", "performance"],
  },

  // ── PRICING & GOVERNANCE ───────────────────────────────────────────────────
  {
    id: 41,
    category: "Governance",
    question: "What is Azure Policy?",
    answer:
      "Enforces organizational standards and assesses compliance at scale. Creates, assigns, and manages policy definitions that enforce rules over resource properties. Can audit or deny non-compliant resources.",
    tags: ["compliance", "governance"],
  },
  {
    id: 42,
    category: "Governance",
    question: "What is the Azure Pricing Calculator?",
    answer:
      "A tool to estimate the cost of Azure products and services. Configure expected usage to get an estimated monthly cost before deploying resources.",
    tags: ["pricing", "cost"],
  },
  {
    id: 43,
    category: "Governance",
    question: "What is Azure Cost Management?",
    answer:
      "A suite of tools to monitor, allocate, and optimize Azure spending. View costs, set budgets, create alerts, and analyze trends to avoid billing surprises.",
    tags: ["cost", "billing"],
  },
  {
    id: 44,
    category: "Governance",
    question: "What are Azure Tags?",
    answer:
      "Name-value pairs applied to Azure resources for logical organization. Used for cost tracking, automation, and governance. Up to 50 tags per resource. Not inherited by child resources by default.",
    tags: ["tags", "organization"],
  },
  {
    id: 45,
    category: "Governance",
    question: "What is Azure Blueprints?",
    answer:
      "Enables cloud architects to define a repeatable set of Azure resources (policies, RBAC, ARM templates) that implement organizational standards. Blueprints are versioned and can be assigned to subscriptions.",
    tags: ["blueprints", "governance"],
  },

  // ── DEVOPS & INTEGRATION ───────────────────────────────────────────────────
  {
    id: 46,
    category: "DevOps",
    question: "What is Azure DevOps?",
    answer:
      "A set of developer services: Boards (work tracking), Repos (Git), Pipelines (CI/CD), Test Plans, and Artifacts (package management). Supports end-to-end software delivery.",
    tags: ["CI/CD", "DevOps"],
  },
  {
    id: 47,
    category: "DevOps",
    question: "What is Azure Service Bus?",
    answer:
      "A fully managed enterprise message broker with queues and publish-subscribe topics. Decouples applications and services. Supports ordering, dead-lettering, sessions, and transactions.",
    tags: ["messaging", "pub-sub"],
  },
  {
    id: 48,
    category: "DevOps",
    question: "What is Azure Event Grid?",
    answer:
      "A fully managed event routing service. Uses publish-subscribe model for reactive, event-driven architectures. Routes events from Azure services or custom sources to handlers (Functions, Logic Apps, etc.).",
    tags: ["events", "serverless"],
  },
  {
    id: 49,
    category: "DevOps",
    question: "What is Azure Logic Apps?",
    answer:
      "A cloud platform for creating and running automated workflows with little to no code. Connects apps, data, services, and systems using 400+ pre-built connectors.",
    tags: ["automation", "integration"],
  },
  {
    id: 50,
    category: "DevOps",
    question: "What is Infrastructure as Code (IaC) in Azure?",
    answer:
      "Managing and provisioning infrastructure through code rather than manual processes. Azure options: ARM Templates (JSON), Bicep (DSL simplifying ARM), Terraform (third-party, multi-cloud).",
    tags: ["IaC", "ARM", "Bicep"],
  },
];

export const categories = [...new Set(azureCards.map((c) => c.category))];
