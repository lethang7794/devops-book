# Chapter 2: How to Manage Your Infrastructure as Code

## ClickOps and IaC

### ClickOps

ClickOps
: clicking through an web UI of a cloud provider's website to configure computing infrastructure

The problems of ClickOps:

- Deployments are slow & tedious
  -> You can't deploy more often
- Deployments are error-prone
  -> Bugs, outages...
- Only one person knows how to deploy
  -> If that person is overloaded, everything takes ages; there is also _bus factor_

### Infrastructure as Code (IaC)

Infrastructure as Code (IaC)
: You write & execute code to define, deploy, update, destroy your infrastructure
: This marks a shift in mindset in which
: - all aspects of operations are treated as software
: - even those represent hardware, e.g. setting up a server

---

- With modern DevOps, you can manage almost everything as code:

  | Task                     | How to manage as code                       | Example                                           | Chapter          |
  | ------------------------ | ------------------------------------------- | ------------------------------------------------- | ---------------- |
  | **Provision servers**    | Provisioning tools                          | Use `OpenTofu` to deploy a server                 | This chapter (2) |
  | **Configure servers**    | Configuration management & templating tools | Use `Packer` to create an image of a server       | This chapter (2) |
  | **Configure apps**       | Configuration files & services              | Read configuration from a `JSON` file during boot |                  |
  | **Configure networking** | Provisioning tools, service discovery       | Use `Kubernetes`'s **service discovery**          |                  |
  | **Build apps**           | Build systems, continuous integration       | Build your app with `npm`                         |                  |
  | **Test apps**            | Automated tests, continuous integration     | Write automated tests using `Jest`                |                  |
  | **Deploy apps**          | Automated deployment, continuous delivery   | Do a **rolling deployment** with `Kubernetes`     | Chapter 3        |
  | **Scale apps**           | Auto scaling                                | Set up **auto scaling policies** in `AWS`         | Chapter 3        |
  | **Recover from outages** | Auto healing                                | Set up **liveness probes** in `Kubernetes`        | Chapter 3        |
  | **Manage databases**     | Schema migrations                           | Use `Flyway` to update your database schema       |                  |
  | **Test for compliance**  | Automated tests, policy as code             | Check compliance using `Open Policy Agent (OPA)`  |                  |

- For infrastructure, there are 4 type of IaC tools:

  | IaC tool                           | Example                                      |
  | ---------------------------------- | -------------------------------------------- |
  | **Ad-hoc scripts**                 | Use a `Bash` script to deploy a server.      |
  | **Configuration management tools** | Use `Ansible` to deploy a server.            |
  | **Server templating tools**        | Use `Packer` to create an image of a server. |
  | **Provision tools**                | Use `OpenTofu` to deploy a server.           |

### The Benefits of IaC

When your infrastructure is defined as code:

- the entire deployment process can be automated
- you can apply software engineering practices (to your software delivery processes)

which bring a lot of benefits:

|                    | How?                                                                             | The benefit                                                                           |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 🤳 Self-service    | Code -> Automated                                                                | Developers can kickoff their own deploy whenever necessary                            |
| 💨 Speed & safety  | Code -> Automated -> Computers do it better than human                           | Deployments can be significantly faster; consistently & not prone to manual error     |
| 📚 Documentation   | The state of your infrastructure is in the source code                           | Every one can understand how things work                                              |
| 🏷️ Version control | The infrastructure (as code) can be tracked by a version control, e.g. git       | The entire history of infrastructure is now in the commit log.                        |
| ✅ Validation      | The state of your infrastructure can be _"tested" just as code_                  | You can perform: code review, automated tests, analysis tools                         |
| 🔁 Reuse           | Your infrastructure can be packaged into _reusable modules_                      | You can easily build your infrastructure on top of documented, batted-tested modules. |
| 😀 Happiness       | IaC allows both computer & developers to what they do best (automation & coding) | Everyone is happy. No more repetitive & tedious deploy task.                          |

## Ad Hoc Scripts

### What is Ad Hoc Scripts

### Example: Deploy an EC2 Instance Using a Bash Script

### How Ad Hoc Scripts Stack Up

| Aspect                       | Ad Hoc script |
| ---------------------------- | ------------- |
| CRUD                         |               |
| Scale                        |               |
| Idempotency & error handling |               |
| Consistency                  |               |
| Verbosity                    |               |

> [!IMPORTANT]
> Key takeaway #2.1:
> Ad hoc scripts are great for small, one-off tasks, but not for managing all your infrastructure as code.

## Configuration Management Tools

### What is Configuration Management Tools

### Example: Deploy an EC2 Instance Using Ansible

### Example: Configure a Server Using Ansible

### How Configuration Management Tools Stack Up

| Aspect                       | Configuration Management Tools |
| ---------------------------- | ------------------------------ |
| CRUD                         |                                |
| Scale                        |                                |
| Idempotency & error handling |                                |
| Consistency                  |                                |
| Verbosity                    |                                |

> [!IMPORTANT]
> Key takeaway #2.2
> Configuration management tools are great for managing the configuration of servers, but not for deploying the servers
> themselves, or other infrastructure.

## Server Templating Tools

## What is Server Templating Tools

### Example: Create a VM Image Using Packer

### How Server Templating Tools Stack Up

| Aspect                       | Server Templating Tools |
| ---------------------------- | ----------------------- |
| CRUD                         |                         |
| Scale                        |                         |
| Idempotency & error handling |                         |
| Consistency                  |                         |
| Verbosity                    |                         |

> [!IMPORTANT]
> Key takeaway #2.3
> Server templating tools are great for managing the configuration of servers with immutable infrastructure practices.

## Provisioning Tools

## What is Provisioning Tools

### Example: Deploy an EC2 Instance Using OpenTofu

### Example: Update and Destroy Infrastructure Using OpenTofu

### Example: Deploy an EC2 Instance Using an OpenTofu Module

### Example: Deploy an EC2 Instance Using an OpenTofu Module from GitHub

### How Provisioning Tools Stack Up

| Aspect                       | Provisioning Tools |
| ---------------------------- | ------------------ |
| CRUD                         |                    |
| Scale                        |                    |
| Idempotency & error handling |                    |
| Consistency                  |                    |
| Verbosity                    |                    |

> [!IMPORTANT]
> Key takeaway #2.4
> Provisioning tools are great for deploying and managing servers and infrastructure.

## Using Multiple IaC Tools Together

> [!IMPORTANT]
> Key takeaway #2.5
> You usually need to use multiple IaC tools together to manage your infrastructure.

### Provisioning Plus Configuration Management

### Provisioning Plus Server Templating

### Provisioning Plus Server Templating Plus Orchestration

## Conclusion

- Instead of ClickOps (clicking out a web UI, which is tedious & error-prone), you can

  - automate the process
  - make it faster & more reliable

- With IaC, you can reuse code written by others:

  - Open source code, e.g. Ansible Galaxy, Docker Hub, Terraform Registry
  - Commercial code, e.g. Gruntwork IaC Library

- Pick the right IaC tool for the job:

  | IaC tool                           | Great for                                     | Not for                           |
  | ---------------------------------- | --------------------------------------------- | --------------------------------- |
  | **Ad-hoc scripts**                 | Small, one-off tasks                          | Managing IaC                      |
  | **Configuration management tools** | Managing configuration of servers             | Deploying servers/infrastructure. |
  | **Server templating tools**        | Managing configuration of _immutable_ servers |                                   |
  | **Provision tools**                | Deploying & managing servers/infrastructure   |                                   |

- You usually needs to use multiple IaC tools together to manage your infrastructure.

  e.g.

  - Provisioning + configuration management
  - Provisioning + server templating
  - Provisioning + server templating + orchestration
