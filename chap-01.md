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

Maybe because of:

1. The company has resource constrained, e.g. a tiny startup
2. The person running the app doesn't know any better
3. The software delivery process is so slow, cumbersome; sneaking the app in a personal computer is the quickly way to get it running.

The solutions:

- For 1, it's the cloud.

- For 2 & 3, it's reading this book:
  - You know better (2)
  - You know how to create a software delivery process that allow your team to quickly & easily run their apps the right way: on a server. (3)

### Deploying an App on a Server

There are 2 ways to get access to servers:

1. _On prem_: Buying & setting up your own servers, e.g. Dell R7625 Rack Server[^1][^2]
2. _In the cloud_: You rent servers from others, e.g. AWS EC2

#### Deploying On Prem Versus in the Cloud

on-prem
: Abbreviated for _on-premises software_
: Software you run:
: - on your own servers
: - in a physical location you own: e.g. your garage/office/data center

in the cloud
: Software you run:
: - on servers in a _cloud computing platform_, e.g. AWS, Azure
: In other words, you rent servers from a cloud platform via a software interface, and use these rented servers to run your software.

#### When to Go with the Cloud

Using the cloud should be the default chose because of the following advantages:

| Advantage                   | Explain                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Pay-as-you-go**           | - No up-front cost for hardwares <br> - Extremely cheap or even free in early days                               |
| **Maintenance & expertise** | - No need to maintain hardwares <br> - or hiring experts to do that                                              |
| **Speed**                   | - No need to wait for the hardwares: order, ship, assemble...                                                    |
| **Elasticity**              | - No need to plan long in advance                                                                                |
| **Managed services**        | - No need to maintain your own primitive services: databases, load balancers, storages, networking...            |
| **Security**                | - The cloud is secure by designed, with a huge amount of resources (time, expertise)                             |
| **Global reach**            | - The cloud has data centers on over the world <br> - By using the cloud, your team can be anywhere in the world |
| **Scale**                   | - The cloud is massive & growing at incredible rate                                                              |

> [!IMPORTANT]
> KEY TAKEAWAY #1.4
> Using the cloud should be your default choice for most new deployments these days.

#### When to Go with On-Prem

| On-prem makes sense when...                              | Explain                                                                                                | Note                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| You already have an on-prem presence                     | - If it ain't broke, don't fix it                                                                      |                                                       |
|                                                          | - The cost of a migration to the cloud might outweigh the benefit                                      |                                                       |
| You have load patterns that are a better fit for on-prem | - For some load patterns, cloud provides might charge a lot of mony, e.g. bandwidth & disk-space usage | Don't forget the cost of maintenance for the hardware |
|                                                          | - Your traffic is huge, but steady & _predictable_ and you can afford your own servers.                |                                                       |
|                                                          | - You need access to some hardware that's not available in the cloud, e.g. CPUs, GPUs...               |                                                       |
| Compliance                                               | - Some compliance standards, regulations, laws... have not yet adapted to the cloud                    |                                                       |

#### When to Go with Hybrid

hybrid
: a mixture of cloud & on-prem

The most uses cases of hybrid cloud:

| Use case                     | Explain                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| Partial cloud migration      | - New apps are deployed to the cloud                         |
|                              | - Some apps are migrated to the cloud                        |
|                              | - The rest are kept on-prem                                  |
| Right tool for the right job | You have both type of load pattern:                          |
|                              | - An app has traffic spikes on holidays -> Cloud             |
|                              | - Another app uses lots of disk space & bandwidth -> On-prem |

#### Two types of cloud: PaaS and IaaS

There are 2 types of cloud:

- **IaaS - Infrastructure as a Service**

  IaaS gives you access directly to the low-level primitives computing resources, e.g. servers, so

  - you can create your own software delivery process.

  e.g. Amazon AWS, Microsoft Azure, Google Cloud

- **PaaS - Platform as a Service**

  PaaS gives you a full, opinionated software delivery process.

  e.g. Heroku, Netlify, Fly.io, Vercel, Firebase, Render, Railway, Platform.sh

> [!TIP]
> One of the first service from AWS (the first cloud that came out in 2006) is Elastic Compute Cloud (EC2), which allow you to rent servers from AWS.
>
> This is the first Infrastructure as a Service (IaaS) in the market.
>
> EC2 gives you access directly to the (low-level) primitive computing resources - the server.

> [!TIP]
> A year later, in 2007, Heroku came out with one of the first Platform as a Service (PaaS) offerings, which focus on high-level primitive.
>
> In additional to the infrastructure, e.g. server, Heroku also provides a full, opinionated software delivery process:
>
> - application packaging
> - deployment pipelines
> - database management
> - ...

### Deploying An App Using PaaS

> [!NOTE]
> The examples in this chapter use Fly.io as the PaaS

> [!TIP]
> Why Fly.io?
>
> - Provides $5 free credits -> the example can be running without cost anything.
> - Support automatically packaging code for deployment via Buildpacks -> code can be deployed without any build system, Docker image...
> - Has a CLI tool `flyctl` -> deploy code straight from your computer.

#### Example: Deploying an app using Fly.io

- Step 1: Install `flyctl`

- Step 2: Sign up & sign in

  ```bash
  fly auth signup

  fly auth login
  ```

- Step 3: Configure the build

  ```toml
  # examples/ch1/sample-app/fly.toml
  [build]
    builder = "paketobuildpacks/builder:base"
    buildpacks = ["gcr.io/paketo-buildpacks/nodejs"]

  [http_service]
    internal_port = 8080
    force_https = true
    auto_stop_machines = true
    auto_start_machines = true
    min_machines_running = 0
  ```

> [!TIP]
> For real-world applications, `flyclt` can recognize many popular app frameworks automatically and you wouldn't this config file.

- Step 4: Launch the app

  ```bash
  fly launch --generate-name --copy-config --yes
  ```

#### Get your hands dirty with Fly.io

- Check the app status with `fly status`
- See the app logs with `fly logs`, or https://fly-metrics.net
- Scale the numbers of servers up & down with `fly scale`
- (Make a change then) Deploy a new version of the app with `fly deploy`

> [!NOTE]
> When working with the cloud, make a habit of undeploy any things you don't need anymore.
>
> - For fly.io, it's by using `fly apps destroy <NAME>`

#### How PaaS stacks up

A Paas provides:

- not just the low-level primitives, e.g. the servers "🖥️"
- but also the high-level primitives - powerful functionalyity out-of-the-box, such as:
  - ⬆️⬇️ Scaling servers
  - 🌐 Domain names
  - 🔒 TLS certificates & termination
  - 📊 Monitoring
  - 🤖 Automated deployment

These high-level primitives is what make PaaS magic - it just works.

In a matter of minutes, a good PaaS take care of so many software delivery concern for you.

> [!WARNING]
> The magic of PaaS is also the greatest weakness of PaaS.
>
> - Everything is happenning behind the scenes. If something doesn't work, it can be hard to debug/fix it.
> - There is a lot of limitation:
>   - What you can deploy
>   - What types of apps you can run
>   - What sort of access you can have to the underlying hardware
>   - What sort of hardware is available
>   - ...

> [!NOTE]
> Many projects start on PaaS, then
>
> - migrate to IaaS if they grow big enough and require more control.

### Deploying an App Using IaaS

- There are 3 types of IaaS: VPS, CDN, cloud providers:

  | IaaS type       | Description                                                                                                                                 | Example                                                                 |
  | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
  | VPS Providers   | - Provide access to the Virtual Private Servers (VPSs) as cheap as possible                                                                 | Hetzner, DigitaOcean, Vultr...                                          |
  |                 | - aka VPS Hosting Providers, might offer other features, e.g. networking, storage...                                                        |                                                                         |
  |                 |                                                                                                                                             |                                                                         |
  | CDN Providers   | - Provide access to Content Delivery Network - CDN servers[^3]                                                                              | CloudFlare, Akamai, Fastly                                              |
  |                 | - Might also offer: DDoS protection...                                                                                                      |                                                                         |
  |                 |                                                                                                                                             |                                                                         |
  | Cloud Providers | - Very large companies provides general-purpose cloud solutions for everything: VPS, CDN, serverless, edge computing, data/file storages... | Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP) |
  |                 |                                                                                                                                             | Alibaba Cloud, IBM Cloud                                                |

- In general, VPS and CDN providers are

  - _specialists_ in their respective area,

    - so they will beat a general cloud in term of features & pricing in those areas.

      e.g. A VPS from Hetzner is usually much faster & cheaper than from AWS.

  - if you _only_ need the features in their area, better off going with them.

- If you are
  - building the infrastructure for the entire company,
    - especially one that is in later stages of its DevOps evolution,
  - your architecture usually needs many types of infrastructure
  - the general-purpose cloud providers will typical a better fit.

#### Example: Deploying an app using AWS

- **Step 1: Sign up for AWS**

  After you signed up,

  - you initially sign in as the `root user`, which has full permissions to do anything in the AWS account.
  - you can create `IAM user` - which is more-limited user account within your AWS account.

  > [!WARNING]
  > Never use your AWS `root user` for daily tasks.

- **Step 2: Create an IAM user.**

  Use the _Identity and Access Management (IAM)_ service to:

  - create an IAM user
  - manage IAM users
    - add permissions to that IAM user via _IAM policy_, which can be attached
      - directly to the IAM user
      - or via _IAM group_

  After you create an IAM user, AWS will show you the security credentials for that users: 1. Sign-in URL, 2. Username, 3. Console password.

  > [!TIP]
  > The password is called _console password_ because it's used for signing in to the _AWS Management Console_ - the web application that manage your AWS account.

  > [!TIP]
  > Keep both the root user's password and IAM user's password in a password manager, e.g. `1Password`, `BitWarden`

- **Step 3: Login as the IAM user.**

  Go the the sign-in URL and sign in with the IAM user credential.

  > [!TIP]
  > The sign-in URL is unique for each AWS account.
  >
  > In other words, each AWS account has it own authenticated & authorization system.

- **Step 4: Deploy an EC2 instance.**

  Use the AWS Elastic Compute Computing (EC2) Service to deploy an EC2 instance:

  - Click `Launch instance`
  - Fill in **name** of the instance
  - Choose the **Application & OS Images** (Amazon Machine Image - AMI)

    - Use the default - `Amazon Linux`

  - Choose the **Instance type**, which specifies the type of server: CPU, memory, hard drive...

    - Use the default - `t2.micro` or `t3.micro` (Small instance with 1 CPU, 1GB of memory that including in AWS free tier)

  - Choose `Proceed without a key-pair` because you're not going to use SSH for this example
  - Configure **Network settings**:

    - Use the default settings:

      - **Network**: `Default VPC`
      - **Subnet**: No preference - `Default subnet`

    - **Firewall (Security group)**: Choose `Create security group` with the rules:

      - Disable `Allow SSH traffic from`
      - Enable `Allow HTTP traffic from the internet` <- This allows inbound TCP traffic on port 80 so the example app can receive requests and response with "Hello, World!"

      > [!NOTE]
      > By default, EC2 instances have firewalls, called _security groups_ that don't allow any network traffic in or out.

  - Configure **User data**:

    > [!NOTE]
    > User data is a script that will be executed by the EC2 instance the very first time it boots up

    Fill in a Bash script that:

    - Install `node.js`
    - Get the code for example server (a simple Node server in a file)
    - Run the server (and ignore hangup signals by using `nohup`)

> [!CAUTION]
> Watch out for snakes: These examples have several problems
>
> | Problem                | What the example app does                                                                                         | What you should do instead                                                          |
> | ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
> | Root user              | The app is running from user data, which runs as root user.                                                       | Run apps using a **separate OS user** with limited permissions.                     |
> | Port 80                | The app is listening on port 80, which required root user permissions.                                            | Run apps on _ephemeral ports_ - port greater than 1024.                             |
> | User data's limit      | The app put all its code & dependencies in user data, which is limited to 16KB.                                   | User _configuration management tool_ or _server templating tools_.                  |
> | No process supervision | The app is started by user data script, which only run on the first boot.                                         | Use process supervisors to restart that app if it crashes, or after server reboots. |
> | Node.js specifics      | The app is run in `development` mode, which only a have minimum of logging and doesn't have optimized performance | Run Node.js in `production` mode[^4].                                               |

#### Get your hands dirty with AWS

- Restart your EC2 instance: Does the app still work? Why (not)?
- Create a custom security group opens up port 8080.
- Find logs/metrics about the EC2 instance, compare with monitoring from fly.io.

#### How IaaS stacks up

### Comparing PaaS and IaaS

#### When to Go with PaaS

> [!TIP]
> Your customers don't care what kind of CI/CD pipeline you have:
>
> - Whether you're running a fancy Kubernetes cluster
> - Whether you're on the newest NoSQL database
> - ...
>
> All they matters is you can create a product that meets your customers' needs.

> [!IMPORTANT]
> KEY TAKEAWAY #1.5
> You should spend as little time on software delivery as you possibly can, while still meeting your company’s requirements.
>
> - If you can find a PaaS meets your requirements, you should:
>   - use it & stick with it as long as you can.
>   - avoid re-creating all those software delivery pieces until you absolutely have to.

The following use cases is a good fit for PaaS:

- 🛝 Side projects

  Focus all your time on the side project itself, instead of wasting any time to the software delivery process.

- 🚀 Startup & small companies

  A startup lives or dies based on its product - something the market wants.

  - Invest all the time/resources to the product.
  - Only when you're facing the scaling problem, which means you've found your product/market, start thinking of moving of PaaS.

- 🧪 New & experimental projects (at established companies)

  Established companies might have invested in IaaS but still have a slow & inefficient software delivery process:

  - by using PaaS, you can quickly launch something & iterate on it.

#### When to Go with IaaS

Only move to IaaS when a PaaS can no longer meet your requirements, which means you're facing the following problems:

- 🪨 **Load & scaling**:

  When you are dealing with a huge a mount traffic:

  - In other words, you're facing the scaling problem (and have found your product)
  - PaaS might no longer meet your requirements:
    - The pricing of PaaS might become prohibitively.
    - The supported architectures by PaaS is limited

  a migrate to IaaS is require to handling that load & scaling.

- 🍕 **Company size**

  For companies with dozens of teams with hundreds or thousands of developers, PaaS offers for governance & access controls might be not enough.

  e.g.

  - Allow some teams to make changes, but not the others

- 🅱️ **Availability**

  Your business might have a higher level than what PaaS offers for uptime guarantees (SLOs, SLAs)

  PaaS offerings are limited in term of visibility & connectivity options, e.g.

  - Many PaaS don't let you SSH to the server, when there is an outage/bug you can't know what really happening.

  > [!NOTE]
  > Heroku - the leading PaaS - only supports SSH into a running server after a decade.

- 🛡️ **Security & compliance**

  If your business needs to meet some strict security, compliance requirements - e.g. PCI, GCPR, HIPPA - IaaS might be the only option.

> [!IMPORTANT]
> KEY TAKEAWAY #1.6
> Go with PaaS whenever you can; go with IaaS when you have to.

## Conclusion

- Adopt the architecture & software delivery processes that are **appropriate** for your stage of company
- Adopt DevOps **incrementally**, as a series of small steps, where _each step is **valuable**_ by itself
- You should never expose apps running on a PC to the outside world
- Using the **cloud** should be your default choice for most new deployments these days
- You should spend as **little time on software delivery** as you possibly can, while still meeting your company’s requirements
- **Go with PaaS** whenever you _can_; go with IaaS when you _have to_

[^1]: https://www.dell.com/en-us/shop/ipovw/poweredge-r7625
[^2]: https://world.hey.com/dhh/the-hardware-we-need-for-our-cloud-exit-has-arrived-99d66966
[^3]: CDN servers are distributed all over the world, to serve & cache content, especially static assets, such as images, CSS stylesheets, JavaScript bundles.
[^4]: [Node.js, the difference between development and production](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production)
