# Chapter 1: An Introduction to DevOps and Software Delivery

_I wrote an app. Now what?_.

Delivery it to users! But how?

- AWS, Azure or Google Cloud (Heroku, Vercel, Netlify)?
- One server or multiple servers?
- Docker? Kubernetes?
- VPC? VPN, SSH?
- Domain name? DNS, TLS?
- Backup database?
- Why the app crashed? How to debug it?

## A Primer on DevOps

### Why DevOps matters?

- The **gap** between companies with world-class software delivery and everyone else is _10x, 100x_ or even more.

- Dora's software delivery metrics:

  - What is it?

    | ... of software changes | Metrics                     | Description                                                                                  |
    | ----------------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
    | Throughput...           | 🚀⏱️ Lead time              | How long it takes a change to go from code committed to deployed in production?              |
    |                         | 🚀🔢 Deploy frequency       | How often does your organization deploy code to production?                                  |
    | Stability...            | 🆘🚨 Change fail percentage | How often deployments cause failures that need immediate remediation (e.g. hotfix, rollback) |
    |                         | 🚧⏱️ Recovery time          | How long it takes to recover from a failed deployment?                                       |

  - Performance according to 2023 State of DevOps Report

    | Metrics                     |                                            | Low performers | Elite performers | World-class performers                         | Elite vs low performers |
    | --------------------------- | ------------------------------------------ | -------------- | ---------------- | ---------------------------------------------- | ----------------------- |
    | 🚀⏱️ Lead time              | Deployment processes takes...              | 36 hours       | 5 mins           | In minutes (100% automated)                    | 10-200x more often      |
    | 🚀🔢 Deploy frequency       | Deploying ...                              | Once/month     | Many/day         | Anytime (Thousands/day)                        | 10-200x faster          |
    | 🆘🚨 Change fail percentage | The rate of deployment causing problems... | 2/3            | 1/20             | Detect in seconds (before user-visible impact) | 13x lower               |
    | 🚧⏱️ Recovery time          | Outages last                               | 24 hours       | 2 mins           | In minutes (sometimes automated)               | 700-4000x faster        |

- It's possible to achieve the performance of the elite (or even the world-class):

  - Each of these performers may do it a little differently
  - But in common, most of these performers share a lot of best practices.

> [!IMPORTANT]
> The DevOps movement is an attempt to capture some of the best practices from the world-class performers in DORA software delivery metrics.

### Where DevOps Came From

#### Before DevOps

- Building a software company ...

  - write the software

    - which is handled by the Developers - Dev team

  ... also means manage a lot of hardware:

  - setup cabinets, racks -> load with servers -> install wiring, cooling -> build redundancy power systems...

    - which is handled by the Operations - Ops team

- An application would be:

  - built by the Dev team, then
  - "tossed over the wall" to the Ops team

  The Ops team had to figured out the software delivery:

  - how to deploy, run, maintain... it.

  - most was done manually:

    - manage the hardware
    - install the app & dependencies

- The company eventually run into problems:

  - release are manual, slow, error-prone
  - frequent outages, downtime

  The Ops team

  - reduce the release cycle (because they can handle all these manually things)
  - but each release is bigger, causing more problems

  Teams begin blaming each other, silos form...

#### After Devops

- Instead of managing their own hardware (or data-centers)

  - many companies take advantage of cloud providers (e.g. AWS, Azure, Google Cloud)
  - many Ops teams spend their time working on software - e.g. Terraform, Ansible, Docker, Kubernetes - to manage the hardware.

- Both Dev & Ops teams spend most of their time working on software:

  - The distinction between the two team is blurring.
  - There may still a separation of responsibility ...

    - The Dev teams are responsible for the application code
    - The Ops team are responsible for the operation code

  - ...but both teams need to work more closely together...

- There come the _DevOps movement_ with the goal of

  - making software delivery vastly more **efficient**
  - (building **better** software **faster**)

  by moving to the cloud & shifting to DevOps mindset:

  |                                        | Before                                          | After                                              | After Example |
  | -------------------------------------- | ----------------------------------------------- | -------------------------------------------------- | ------------- |
  | 👥 Teams                               | Devs write code, “toss it over the wall” to Ops | Devs & Ops work together on cross-functional teams |               |
  | 🧮 Servers                             | Dedicated physical servers                      | Elastic virtual servers                            | AWS's EC2     |
  | 🌐 Connectivity                        | Static IPs                                      | Dynamic IPs, service discovery                     |               |
  | 🛡️ Security                            | Physical, strong perimeter, high trust interior | Virtual, end-to-end, zero trust                    |               |
  | ⚡ Infrastructure provisioning         | Manual                                          | Infrastructure as Code (IaC) tools                 | Terraform     |
  | 🔧 Server configuration                | Manual                                          | Configuration management tools                     | Ansible       |
  | ✅ Testing                             | Manual                                          | Automated testing                                  | CI            |
  | 🚀 Deployments                         | Manual                                          | Automated                                          | CD            |
  | 💱 Change process                      | Change request tickets 🎫                       | Self-service 🏧                                    |               |
  | 🔢🔄 Deploy cadence (Deploy frequency) | Weeks or months                                 | Many times per day                                 |               |
  | 🔢🔁 Change cadence (Lead time)        | Weeks or months                                 | Minutes                                            |               |

- DevOps movement has transformed a lot of companies:
  - Nordstrom:
    - number of features delivered by month increased 100%
    - defects reduced 50%
    - lead time reduced 60%
    - number of production accidents reduced 60 - 90%
  - HP's LaserJet Firmware:
    - the amount spent on developing features went from 5% to 40%
    - development cost reduced 40%
  - Etsy:
    - From infrequent deployments to 25-50 deployments/day

### The Evolution of ~~DevOps~~ Software Architecture & Software Delivery Process

The architecture & software delivery process evolution can be broken down into:

- 3 high-level stages
  - each stages consists of 3 steps

#### Stage 1

Stage 1 applies to most software projects start: new startups, new initiatives (at existing company), side projects.

- **Step 1**:

  - **Single server**: everything runs on a single server
  - **ClickOps** (Process): manage infrastructure & deployment manually

  ```
  User -> SERVER
  ```

- **Step 2**:

  - **Standalone database**: database become a bottleneck -> break it to a separate server
  - **Version Control** (Process): team grows -> collaborate & track changes
  - **Continuous Integration** (Process): reduce bugs/outages -> automated tests

  ```
       User -> Server -> DATABASE

  Developer ->  VERSION + CONTINUOS
                CONTROL   INTEGRATION
  ```

- **Step 3**:

  - **Multiple servers**: a single server is not enough
  - **Load Balancing**: distributed traffic across servers
  - **Networking**: protect servers -> a private networks
  - **Data Management**: scheduled backups, data migration
  - **Monitoring** (Process): get better visibility of system

  ```
                ---- VPC ----------------------------
               |                             BACKUPS |
               |                  SERVER        ↑    |
       User -> | LOAD BALANCER -> SERVER -> Database |
               |                  SERVER             |
               |                   ...               |
                --------------------------------------

  Developer ->  Version + Continuos   + MONITORING
                Control   Integration
  ```

State 1 is

- simple
- fast to learn, easy to set up
- fun to work with

Most software projects never need to make it past stage 1.

> [!NOTE]
> If your application is so good and the number of users keep going - in other words, you have scaling problems - you may have to move on to the subsequent stages.

> [!CAUTION]
> Only move to the subsequent stages, if you're facing problems that require more complex architecture & processes to solve.
>
> - These complexity has a considerable cost.
> - If you're not facing these problems, then you can and should avoid that cost.

#### Stage 2

Stage 2 applies to larger, more established companies software that has larger user bases and more complexities.

- **Step 4**:

  - **Caching for data stores**: database is still a bottleneck -> add read replicas & caches
  - **Caching for static content**: traffic grows -> add CDN for content that doesn't change often

  ```
                ---- VPC -----------------------------------------
               |                                         Backups |
               |                                            ↑    |
       User -> | CDN     -> Load balancer -> Servers -> Database |
               | (CACHE)                                    ↓    |
               |                                          CACHE  |
                --------------------------------------------------

  Developer ->  Version + Continuos   + Monitoring
                Control   Integration
  ```

- **Step 5**: team size become a problem, deployment is slow, unreliable

  - **Multiple environments**: to help teams do better testing. Each env is a full copy of infrastructure, e.g. dev, stage, prod
  - **Continuous delivery** (Process): fast/reliable deployment -> deployment pipeline
  - **Authentication & secrets** (Process): a little security

  ```
                ---- VPC ------------------------------------- _
               |                                      Backup  | |_
               |                                        ↑     | | |
       User -> | CDN -> Load balancer -> Servers --> Database | | |
               |                                  ↓           | | |
               |PROD                            Cache         | | |
                ----------------------------------------------  | |
                 |STAGE                                         | |
                  ----------------------------------------------  |
                   |DEV                                           |
                    ----------------------------------------------

  Developer ->  Version + Continuos   + CONTINUOS + Monitoring + AUTH,
                Control   Integration   DELIVERY                 SECRETS
  ```

- **Step 6**: teams keep growing to keep moving quick

  - **Microservices**: allow teams work independently, each microservice comes with its own data store & caches.
  - **Infrastructure as Code** (Process): infrastructure for all microservices is a too much to be managed manually.

  ```
                ---- VPC ---------------------------------------------------- _
               |                                              Cache  Backups | |_
               |                                                ↑      ↑     | | |
               |                 ------> SERVICES <-> SERVICES --> Database  | | |
               |                |           ↕      ↕      ↕                  | | |
       User -> | CDN -> Load balancer -> SERVICES <-> SERVICES --> Database  | | |
               |                                                ↓      ↓     | | |
               |prod                                          Cache  Backups | | |
                -------------------------------------------------------------  | |
                 |stage                                                        | |
                  -------------------------------------------------------------  |
                   |dev                                                          |
                    -------------------------------------------------------------

  Developer ->  Version + Continuos   + Continuos + Monitoring + Auth,   + INFRASTRUCTURE
                Control   Integration   Delivery                 Secrets   AS CODE
  ```

Stage 2 represent a significant step up in terms of complexity:

- The architecture has more moving parts
- The processes are more complicated
- The need of a dedicated infrastructure team to manage all of this.

#### Stage 3

Stage 3 applies to large enterprises with massive user bases.

- **Step 7**: massive user bases

  - **Observability**: More visibility <- Tracing + observability
  - **Service discovery**: So many microservices, how to communicate with each other?
  - **Server & networking hardening** -> Compliance standard, e.g. PCI, NIST, CIS
  - **Service mesh**: Unified solution for manage microservices -> all items about + load balancing + traffic control, error handling

  ```
                ---- VPC ---------------------------------------------------------------- _
               |                                                          Cache  Backups | |_
               |                     ----------------------------------     ↑      ↑     | | |
               |                    |      Services <--> Services-----|------> Database  | | |
               |                    |                                 |                  | | |
               |                    |           OBSERVABILITY         |                  | | |
               |                    |                                 |                  | | |
               |                    |                                 |                  | | |
       User -> | CDN -> Load     -> |       ↕     SERVICE      ↕      |                  | | |
               |        balancer    |            DISCOVERY            |                  | | |
               |                    |                                 |                  | | |
               |                    |                                 |                  | | |
               |                    |            HARDENING            |                  | | |
               |                    |                                 |                  | | |
               |                    |      Services <--> Services-----|------> Database  | | |
               |                     ---------------------------------      ↓      ↓     | | |
               |prod                            SERVICE MESH              Cache  Backups | | |
                -------------------------------------------------------------------------  | |
                 |stage                                                                    | |
                  -------------------------------------------------------------------------  |
                   |dev                                                                      |
                    -------------------------------------------------------------------------

  Developer ->  Version + Continuos   + Continuos + Monitoring + Auth,   + Infrastructure
                Control   Integration   Delivery                 Secrets   as Code
  ```

- **Step 8**: a lot of data from users

  - **Analytics tools**: process & analyze data <- data warehouse/lake, machine learning platforms...
  - **Event bus**: more microservices, more data -> event bus -> event-driven architecture
  - **Feature toggles & canary deployment** (Process): deploy faster, more reliable <- advanced deployment strategies

  ```
                ---- VPC -------------------------------------------------------------------------- _
               |                                                          Cache  Backups           | |_
               |                     ----------------------------------     ↑      ↑               | | |
               |                    |      Services <--> Services-----|------> Database ----       | | |
               |                    |                                 |                     |      | | |
               |                    |           Observability         |                     |      | | |
               |                    |                                 |                     |      | | |
               |                    |                                 |                     ↓      | | |
       User -> | CDN -> Load     -> |       ↕     Service      ↕      |                   DATA     | | |
               |        balancer    |            Discovery            |                 WAREHOUSE  | | |
               |                    |                                 |                     ↑ |    | | |
               |                    |                                 |                     | |    | | |
               |                    |            Hardening            |                     | |    | | |
               |                    |                                 |                     | |    | | |
               |                    |      Services <--> Services-----|------> Database ----  |    | | |
               |                     ---------------------------------      ↓    |  ↓         |    | | |
               |                             |   Service Mesh   |          Cache | Backups    |    | | |
               |                             ↓                  ↓           ↓    ↓            ↓    | | |
               |                EVENT BUS =======================================================  | | |
               |prod                                                                               | | |
                -----------------------------------------------------------------------------------  | |
                 |stage                                                                              | |
                  -----------------------------------------------------------------------------------  |
                   |dev                                                                                |
                    -----------------------------------------------------------------------------------

  Developer ->  Version + Continuos   + Continuos + Monitoring + Auth,   + Infrastructure + FEATURE + CANARY
                Control   Integration   Delivery                 Secrets   as Code          TOGGLE    DEPLOYMENT
  ```

- **Step 9**:

  - **Multiple data centers**: -> global user base
  - **Multiple accounts**: larger employee base -> isolate teams/products
  - **Advanced networking**: connect data centers, accounts
  - **Internal developer platform** (Process): boost developer productivity; ensure all accounts are secure <- account baseline/factory

  ```
   ---->   DATA   (With all the infrastructure as in data center 1)
  |      CENTER 2
  |          |
  |          |     ---- VPC -------------------------------------------------------------------------- _
  |          |    |                                                          Cache  Backups           | |_
  |     ADVANCED  |                     ----------------------------------     ↑      ↑               | | |
  |     NETWORKING|                    |      Services <--> Services-----|------> Database ----       | | |
  |          |    |                    |                                 |                     |      | | |
  |          |    |                    |           Observability         |                     |      | | |
  |          |    |                    |                                 |                     |      | | |
  |          |    |                    |                                 |                     ↓      | | |
  User ->  DATA   | CDN -> Load     -> |       ↕     Service      ↕      |                   Data     | | |
          CENTER 1|        balancer    |            Discovery            |                 Warehouse  | | |
                  |                    |                                 |                     ↑ |    | | |
                  |                    |                                 |                     | |    | | |
                  |                    |            Hardening            |                     | |    | | |
                  |                    |                                 |                     | |    | | |
                  |                    |      Services <--> Services-----|------> Database ----  |    | | |
                  |                     ---------------------------------      ↓    |  ↓         |    | | |
                  |                             |   Service Mesh   |          Cache | Backups    |    | | |
                  |                             ↓                  ↓           ↓    ↓            ↓    | | |
                  |                Event Bus =======================================================  | | |
                  |prod                                                                               | | |
                   -----------------------------------------------------------------------------------  | |
                    |stage                                                                              | |
                     -----------------------------------------------------------------------------------  |
                      |dev                                                                                |
                       -----------------------------------------------------------------------------------

  Developer ->     Version + Continuos   + Continuos + Monitoring + Auth,   + Infrastructure + Feature + Canary     + Developer
                   Control   Integration   Delivery                 Secrets   as Code          Toggle    Deployment   Platform
  ```

Stage 3 applies for company with the toughest problems that deal with the more complexity: global deployments, thousands of developers, millions of users.

> [!NOTE]
> The architecture in stage 3 is still a simplification to what the top 0.1% of the companies face.

### Adopting DevOps Practices

#### Which DevOps practices to adopt?

> [!IMPORTANT]
> KEY TAKEAWAY #1.1
> You should adopt the architecture & software delivery processes that are appropriate for the stage of your company

> [!CAUTION]
> Don't immediately jump to the end and use the architecture & processes of the largest, most elite companies:
>
> - You don't have the same scale
> - You don't have the same problems to solve
>
> Their solutions may not be a good fit for you.

#### How to adopt DevOps practices?

The key to a success of adopting DevOps (or any migration project) is to do it incrementally:

- Split up the work in a way that every step brings its own value, even if the later steps never happen

- Don't fall into _false incrementalism_ where all steps need to be completed before any step can bring value.

  There is a big changes that the projects gets:

  - modified
  - paused or even cancelled

> [!IMPORTANT]
> KEY TAKEAWAY #1.2
> Adopt DevOps incrementally, as a series of small steps, where each step is valuable by itself.

> [!CAUTION]
> Avoid "big bang" migration (all or nothing).

> [!TIP]
> Focus on solving small, concrete problem one at a time.
>
> e.g.
>
> - Migrate to cloud:
>   - Instead of migrating all teams at the same time
>   - Identifying one small, specific app/team -> Migrate just that app/team
> - Adopt DevOps:
>   - Instead of applying all processes
>   - Identifying one small problem, e.g. outages during deployment -> Automate the deployment steps
>
> Even if the larger migration doesn't work, at least
>
> - one team is more successful
> - one process works better

## An Introduction to Deploying Apps

### Run an App Locally

#### Example: Run the Sample App Locally

- A Node.js "Hello, World" - a web server

  ```javascript
  // app.js
  const { createServer } = require("node:http");

  const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  });

  const port = 8080;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  ```

- Install Node.js (if you haven't installed)

- Run the app

  ```bash
  node app.js
  ```

- Open link [http://localhost:8080](http://localhost:8080) in browser

> [!NOTE]
> By default, when you run a web server on your computer:
>
> - It's only available on _localhost_.
> - In other words, the web server can _only_ be accessed from your computer.

> [!TIP]
> The `localhost` is a hostname - configured on every computer - points back to the _**loopback** network interface_ (which is typically `127.0.0.1`)

#### The problem with expose an app run on your personal computer

- **Security**

  Your personal computer (PC) is not _hardened_:

  - There's a lot of app installed. The more apps running, the more likely an app has an CVE that could be exploited by attacker.
  - There is your personal data (documents, photos, videos, passwords...)

- **Availability**

  Your PC might:

  - be accidentally shutdown.
  - not be designed to run 24/7.

- **Performance**

  If you're using your PC,

  - that might take away system resources from your app,
    - which might cause performance issues for your users.

- **Collaboration**

  If your app has a bug, or needs to be updated:

  - someone (coworkers, collaborators...) needs to access to your PC,
  - should you give them access to your personal data? No!

> [!IMPORTANT]
> KEY TAKEAWAY #1.3
> You should never expose apps running on a personal computer to the outside world.

#### When to expose an app that runs on your PC

You can deploy an app locally, and expose that app _only_ when:

- You're exposing it to a trusted 3rd-party, (e.g. a coworker)...
- ... to get feedback

> [!TIP]
> You can use _tunnelling_ tools, e.g. `localtunnel`, `ngrok`, `btunnel`, `localhost.run`
>
> - to get a temporary URL of your app
>
> Then give someone you trust that URL to access your app.

#### Why many businesses still expose their critical apps from a PC

- The company has recourse constrained

### Deploying an App on a Server

### Deploying On Prem Versus in the Cloud

#### When to Go with the Cloud

> [!IMPORTANT]
> KEY TAKEAWAY #1.4
> Using the cloud should be your default choice for most new deployments these days.

#### When to Go with On-Prem

#### When to Go with Hybrid

### Deploying An App Using PaaS

#### Example: Deploying an app using Fly.io

#### Get your hands dirty with Fly.io

#### How PaaS stacks up

### Deploying an App Using IaaS

There are 3 types of IaaS:

- VPS
- CDN
- Cloud Providers

#### Example: Deploying an app using AWS

> [!CAUTION]
> Watch out for snakes: These examples have several problems

#### Get your hands dirty with AWS

### Comparing PaaS and IaaS

#### When to Go with PaaS

> [!IMPORTANT]
> KEY TAKEAWAY #1.5
> You should spend as little time on software delivery as you possibly can, while still meeting your company’s requirements.

#### When to Go with IaaS

> [!IMPORTANT]
> KEY TAKEAWAY #1.6
> Go with PaaS whenever you can; go with IaaS when you have to.

## Conclusion
