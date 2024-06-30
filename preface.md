# Preface

## What is this book?

This book is a guide about:

- **Software delivery**: how to run & maintain software in production?

- **DevOps**: a methodology to make software delivery more efficient

Instead of focus on ~~culture & theory~~, this book focuses on **hand-ons guide**:

- Step-by-step examples about how to run real system & real code.
- Core concepts & best practices of modern DevOps and software delivery.

## Why this book exists?

- There is no hands-on guide that teach software delivery **end-to-end**.

- Software delivery is current learned in the hard way - through trial and error - which can be very costly (outages, data lose, security breaches...)

> [!NOTE]
> The author learned from his experience when he worked at LinkedIn in 2011:
>
> - LinkedIn'd just IPO, share price was up 100%, revenue was growing 100% by year, 100M members, growing fast.
> - From the inside, the company was in turmoil because of software delivery - a $10 billion company could not deploy code:
>   - They deployed once every 2 weeks through a painful, tedious, slow, error-prone way
>   - A deployment went so bad, that it could not be completed; new changes, some fixes, more issues...Team worked overnight several days, then everything was roll-backed.
> - They kicked of Project Inversion:
>   - new features development was freezed for several months
>   - the entire engineering, product, design team reworked all the infrastructure, tooling, technique
> - Months later, they could deploy dozens of times per day:
>   - with fewer issues, outages
>   - allowing the whole company move much faster

> [!NOTE]
> How did they do that?
>
> - They didn't know what they didn't know
> - They learn about best practices from the industry:
>
>   - Trunk-based development (from one company)
>   - Canary deployment (from another)
>   - Feature toggles (from another)
>   - ...

- Most developers don't know what they don't know:

  - About software delivery and DevOps
  - Best practices that top tech companies had figured out

- This book helps you learn from the experience of others so you can build software faster, more reliably and more securely.

> [!WARNING]
> The results from adopting DevOps can be wonderful, but the experience along the way may be not.

## Watch out for snakes

- "DevOps" is used to describe a lot of **unrelated concepts**. ⛓️‍💥🌕🌑

  e.g. A TLS certificate (& the cryptography behind it), a deployment pipeline, and backing up data from a database.

> [!NOTE]
> What makes DevOps hard? (It's not the complexity of the concepts)
>
> - It's the number of concepts to master (DevOps is an incredibly broad surface area)
> - It's how to get everything connected together correctly (or nothing works at all)

- "DevOps" is a **box of cables**. 🧰⛓️

  You pull out a cable but end up with a giant mess where everything is tangled together

> [!TIP]
> This book try to untangle this mess of cables:
>
> - Each cable in that mess is in fact a separate cable.
> - In isolation, each concept in DevOps (a cable in that mess) is within your grasp.

- Sometimes, DevOps even feels like a **box of snakes**. 🧰🐍🐍

  You pull of a cable but end up getting bitten.

> [!CAUTION]
> DevOps is current a giant mess:
>
> - A new industry
> - Tools, techniques aren't mature
> - It often feels like everything is broken, frustrating & hopelessly tangled

- In DevOps, each time you learn a new buzzword (a new concept):

  - it comes with 10 more unfamiliar buzzwords (it's a mess of cables)
  - or it might try to by you (a cable or a snake)

  but stick with it & watch for the snake

## Who should read this book?

Anyone responsible for _deploying & managing_ apps in production:

- Individual contributors in **operations roles**: SREs, DevOps Engineers, SysAdmins..., who wants to level up about software delivery & DevOps.

- Individual contributors in **development roles**: Software Engineers/Developers.., who wants to learn about the operations side.

- **Managers**: Engineering Managers, CTOs..., who want to adopt DevOps & software delivery best practices in their organizations.

## What is in this book?

| Chapter                                                                                     | Key ideas                            | Hand-ons example                                                                                             |
| ------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| [1. An Introduction to **DevOps & Software Delivery** ](/chap-01.md)                        | The evolution of DevOps.             |                                                                                                              |
|                                                                                             | On-prem vs cloud.                    |                                                                                                              |
|                                                                                             | PaaS vs IaaS.                        | - Run an app on Fly.io.<br>- Run an app an EC2 instance in AWS.                                              |
| [2. How to _Manage Infrastructure_ as Code ](/chap-02.md)                                   | Ad hoc scripts.                      | Use Bash to deploy an EC2 instance.                                                                          |
|                                                                                             | Configuration management tools.      | Use Ansible to deploy an EC2 instance.                                                                       |
|                                                                                             | Server templating tools.             | Use Packer to build an AMI.                                                                                  |
|                                                                                             | Provisioning tools.                  | Use OpenTofu to deploy an EC2 instance.                                                                      |
| [3. How to _Deploy Many Apps_: Orchestration, VMs, Containers, and Serverless](/chap-03.md) | Server orchestration.                | Use Ansible to deploy app servers & Nginx.                                                                   |
|                                                                                             | VM orchestration.                    | Use OpenTofu to deploy an ASG and ALB.                                                                       |
|                                                                                             | Container orchestration.             | Deploy a Dockerized app in Kubernetes.                                                                       |
|                                                                                             | Serverless orchestration.            | Deploy a serverless app with AWS Lambda.                                                                     |
| [4. How to _Version, Build & Test_ Your Code ](/chap-04.md)                                 | Version control.                     | Store your code in GitHub and use PRs.                                                                       |
|                                                                                             | Build systems.                       | Configure your build in NPM.                                                                                 |
|                                                                                             | Dependency management.               |                                                                                                              |
|                                                                                             | Automated testing.                   | - Set up automated tests for a Node.js app.<br>- Set up automated tests for OpenTofu code.                   |
| [5. How to _Set Up CI/CD_ ](/chap-05.md)                                                    | Trunk-based development.             | - Use OIDC with GitHub Actions and AWS.<br> - Run tests in GitHub Actions.                                   |
|                                                                                             | Branch by abstraction.               |                                                                                                              |
|                                                                                             | Feature toggles.                     |                                                                                                              |
|                                                                                             | Deployment strategies and pipelines. | Run deployments in GitHub Actions.                                                                           |
| [6. How to Work with **Multiple Teams & Environments** ](/chap-06.md)                       | Internal developer platforms.        | Create multiple AWS accounts.                                                                                |
|                                                                                             | Microservices.                       | Deploy microservices in Kubernetes.                                                                          |
|                                                                                             | Updating and patching.               | Configure automated updates.                                                                                 |
| [7. How to _Set Up Networking_: VPCs, VPN, and DNS ](/chap-07.md)                           | DNS, domain names, CDN.              | Set up a custom domain name in Route 53.                                                                     |
|                                                                                             | Virtual private clouds (VPCs).       | Deploy a custom VPC in AWS.                                                                                  |
|                                                                                             | Service discovery, service meshes.   | Do service discovery with Kubernetes.                                                                        |
|                                                                                             | Network access and hardening.        | Use SSH and EC2 Instance Connect.                                                                            |
| [8. How to Manage **Authentication, Authorization & Secrets** ](/chap-08.md)                | Authentication and user management.  |                                                                                                              |
|                                                                                             | Authorization, permissions, ACLs.    | Set up SSO and roles for AWS.                                                                                |
|                                                                                             | Encryption at rest and in transit.   | Use ACM to provision a TLS certificate.                                                                      |
|                                                                                             | Secrets management.                  | Store secrets in AWS Secrets Manager.                                                                        |
| [9. How to _Store Data_: SQL, NoSQL, Queues, Warehouses, ](/chap-09.md)                     | Local and network drives.            |                                                                                                              |
|                                                                                             | Relational DBs, schema management.   | - Deploy PostgreSQL using RDS.<br> - Deploy Redis using ElastiCache.<br> - Use Flyway for schema migrations. |
|                                                                                             | NoSQL, queues, data warehouses.      |                                                                                                              |
|                                                                                             | File storage.                        | Use S3 and CloudFront for static assets.                                                                     |
| [10. How to _Monitor Systems_: Metrics, Logs, Alerts, and Observability](/chap-10.md)       | Metrics and dashboards.              | Create a dashboard in Grafana.                                                                               |
|                                                                                             | Logs and log aggregation.            | Aggregate logs in Elasticsearch.                                                                             |
|                                                                                             | Alerts and on-call rotations.        | Set up alerts in CloudWatch.                                                                                 |
|                                                                                             | Observability and tracing.           |                                                                                                              |
| [11. The **Future** of DevOps and Software Delivery ](/chap-11.md)                          | Serverless.                          |                                                                                                              |
|                                                                                             | AI.                                  |                                                                                                              |
|                                                                                             | DevSecOps, shift left, supply chain. |                                                                                                              |
|                                                                                             | Infrastructure from code, runbooks.  |                                                                                                              |

## What isn't in this book?

| DevOps, software delivery's topic      | What isn't in this book                                                                         |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| DevOps culture & team dynamics         | Cross-functional teams, high-trust environments, collaboration tools/techniques                 |
| Organization processes                 | Capacity, blameless postmortem, on-call rotation, KPIs, SLOs, error budgets...                  |
| Server hardening                       | OS permissions, intrusion protection, file integrity monitoring, sandboxing, hardened images... |
| Low-level networking                   | Routers, switches, links, routing protocols...                                                  |
| Compliance                             | A detail guide to meed any standard, e.g. SOC2, ISO 270001, HIPAA, GDPR...                      |
| Cost optimization & performance tuning | A detail guide to reduce costs & improve performance                                            |

## Code examples

- This book includes many examples to work through, which is available at GitHub repository: https://github.com/brikis98/devops-book

- The code samples are organized
  - by chapter (e.g. `ch1`, `ch2`),
    - and within each chapter, by tool (e.g. `ansible`, `kubernetes`, `tofu`)

> [!TIP]
> The examples show what the code looks like at the end of a chapter.
>
> To maximum the the learning:
>
> - write the code yourself
> - check the "official" solutions at the end

### Opinionated Code Examples

The code examples represents just _one opinionated way_ to implement this book _core concepts_ - IaC, CI/CD...

> [!IMPORTANT]
> In real world, there is no single "best" way that applies to all situations:
>
> - All technology choices has a trade-off.
> - Some solution maybe a better fit in some situations that others.
>
> Always use your judgment to pick the _right tool_ for the job.

> [!NOTE]
> The core concepts in this book only change & evolve over a long time span (5-10 years).
> But the code examples that implement these core concepts may change more frequently.
> e.g. Kubernetes has a release cycle of 4-month[^k8s-release-cycle].

### You Have to Get Your Hands Dirty

This book will teach you principles, techniques, tools about DevOps & software delivery.

But you can only achieve serious results if you _learn by doing_:

- re-create the example code yourself

  - writing code
  - running code
  - make the code work

- do the extra **get your hands dirty** section & tweak the examples

  - customize to your needs
  - break things
  - figure out how to fix them
  - ...

### Using Code Examples

The code examples in this book may be used

- in your programs and documentation (but not too much)
- but not for selling & distribution

[^k8s-release-cycle]: https://kubernetes.io/releases/release/
