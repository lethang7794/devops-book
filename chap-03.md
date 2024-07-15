# Chapter 3: How to Deploy Many Apps: Orchestration, VMs, Containers, and Serverless

## An Introduction to Orchestration

### Why use an orchestration?

- The problem with a **single server** 🎵 - _single point of failure_:

  - Your single server cannot run ~~all the time~~:
    - There will be a lot of outages 🛑 due to:
      - hardware issues
      - software issues
      - load: 🪨
      - deployments

- To remove this ~~single point of failure~~, typically you needs

  - **multiple copies**, called _replicas_, of your app.
  - a way to
    - manages those replicas 👈 Who gonna be the manager 🧠🎼?
    - solve all the problems (of each server) 👈 Multiple failures ← Multiple servers 🎵🎵🎶
    - ...

- The tools that done all of the previous things is called _orchestration tools_:

  - Capistrano, Ansible (👈 Server orchestration)
  - AWS Auto Scaling Group, EC2 (👈 VM orchestration)
  - Kubernetes, Nomad... & managed services: EKS, GKE, AKS, OpenShift, ECS (👈 Container orchestration)
  - AWS Lambda, Google Cloud Functions, Azure Serverless (👈 Serverless orchestration)

### What is an orchestration?

orchestration tool
: tool responsible for _orchestration_:
: - manage the **cluster** (where the applications runs)
: - coordinate individual apps to **start/stop** (how each application runs)
: - increase/decrease **hardware resources** available to each app (which is available to each applications)
: - increase/decrease the **number of replicas** (how many copies of each application)
: - ...

---

- An orchestration tool solves the following problems:

  | The problem                    | What exactly is the problem?                                                                 | Notes                                                                                                                         |
  | ------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
  | 🚀 **Deployment**              | How to _initially deploy_ one/more replicas of your app onto your servers?                   |                                                                                                                               |
  | 🎢 **Deployments strategies**  | How to _roll out updates_ to all replicas? Without downtime[^1]?                             |                                                                                                                               |
  | 🔙 **Rollback**                | How to _roll back a broken updates_? Without downtime?                                       |                                                                                                                               |
  | 🆔 **Scheduling**              | How to decide which apps should run on _which servers_? With enough computing resources[^2]? | Scheduling can be done: <br> - **manually**<br> - **automatically** by a _scheduler_[^3].                                     |
  | ⬆️⬇️ **Auto scaling**          | How to auto-scale your app up/down in response to the load?                                  | There are 2 types of scaling:<br> - _vertical scaling_ (a "bigger" machine)<br> - _horizontal scaling_ (more small machines). |
  | 🩹 **Auto healing**            | How to know if an app/a server is not healthy? Auto restart/replace the app/server?          |                                                                                                                               |
  | ⚙️ **Configuration**           | How to configure the app for multiple environments?                                          | e.g. Each environment has a different domain name; computing resources settings.                                              |
  | 🔒🤫 **Secrets management**    | How to pass secrets to your apps?                                                            | aka credentials - e.g. passwords, API keys                                                                                    |
  | ☦️ **Load balancing**          | How to distribute traffic across all replicas?                                               |                                                                                                                               |
  | 🌐🕸️ **Service communication** | How each app communicate/connect with each other?                                            | aka _service discovery_                                                                                                       |
  |                                | How to control/monitor the these communication/connections?                                  | aka _service mesh_: authentication, authorization, encryption, error handling, observability...                               |
  | 💾 **Disk management**         | How to connect the right hard drive to the right servers?                                    |                                                                                                                               |

### Four types of orchestration tools

- In the pre-cloud ere, most companies has their own solutions: gluing together various scripts & tools to solve each problem.

- Nowadays, the industry standardize around four broad types of solutions:

  | Type of orchestration    | How do you do?                                                                                                   |
  | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
  | Server orchestration     | You have a **pool of servers** that you manage.                                                                  |
  | VM orchestration         | Instead of managing servers directly, you manage **VM images**.                                                  |
  | Container orchestration  | Instead of managing servers directly, you manage **containers**.                                                 |
  | Serverless orchestration | You no longer think about servers at all, and just focus on managing **apps**, or even individual **functions**. |

## Server Orchestration

## What is Server Orchestration

> [!IMPORTANT]
> Key takeaway #1
> Server orchestration is an older, mutable infrastructure approach where you have a fixed set of servers that you
> maintain and update in place.

### Example: Deploy Multiple Servers in AWS Using Ansible

### Example: Deploy an App Securely and Reliably Using Ansible

### Example: Deploy a Load Balancer Using Ansible and Nginx

### Example: Roll Out Updates with Ansible

### Get your hands dirty with Ansible and server orchestration

1. How to scale the number of instances running the sample app from three to four.
2. Try restarting one of the instances using the AWS Console.
   - How does nginx handle it while the instance is rebooting?
   - Does the sample app still work after the reboot?
   - How does this compare to the behavior you saw in Chapter 1?
3. Try terminating one of the instances using the AWS Console.
   - How does nginx handle it?
   - How can you restore the instance?

## VM Orchestration

### What is VM Orchestration

> [!IMPORTANT]
> Key takeaway #2
> VM orchestration is an immutable infrastructure approach where you deploy and manage VM images across virtualized servers.

### Example: Build a VM Image Using Packer

### Example: Deploy a VM Image in an Auto Scaling Group Using OpenTofu

### Example: Deploy an Application Load Balancer Using OpenTofu

### Example: Roll Out Updates with OpenTofu and Auto Scaling Groups

### Get your hands dirty with OpenTofu and VM orchestration

1. How to scale the number of instances in the ASG running the sample app from three to four.
   - How does this compare to adding a fourth instance to the Ansible code?
2. Try restarting one of the instances using the AWS Console.
   - How does the ALB handle it while the instance is rebooting?
   - Does the sample app still work after the reboot?
   - How does this compare to the behavior you saw when restarting an instance with Ansible?
3. Try terminating one of the instances using the AWS Console.
   - How does the ALB handle it?
   - Do you need to do anything to restore the instance?

## Container Orchestration

### What is Container Orchestration

> [!IMPORTANT]
> Key takeaway #3
> Container orchestration is an immutable infrastructure approach where you deploy and manage container images across a cluster of servers.

### Example: A Crash Course on Docker

### Example: Create a Docker Image for a Node.js app

### Example: Deploy a Dockerized App with Kubernetes

### Example: Deploy a Load Balancer with Kubernetes

### Example: Roll Out Updates with Kubernetes

### Get your hands dirty with Kubernetes and YAML template tools

> [!NOTE]
> Using YAML and `kubectl` is a great way to learn Kubernetes, and I’m using it in the examples in this chapter to avoid introducing extra tools,
>
> - but raw YAML is not a great choice for production usage.
>   - In particular, YAML doesn’t have support for variables, templating, for-loops, conditionals, and other programming language features that allow for code reuse.

Therefore, when using Kubernetes in production, instead of raw YAML, try out one of the following tools that can solve these gaps for you:

- Helm

- OpenTofu with the Kubernetes provider

- Pulumi with the Kubernetes provider

- Kustomize

- kapp

### Example: Deploy a Kubernetes Cluster in AWS Using EKS

> [!CAUTION]
> Watch out for snakes: EKS is not part of the AWS free tier!
>
> - While most of the examples in this book are part of the AWS free tier, Amazon EKS is not: as of June 2024, the pricing is $0.10 per hour for the control plane.
> - So please be aware that running the examples in this section will cost you a little bit of money.

### Example: Push a Docker Image to ECR

### Example: Deploy a Dockerized App into an EKS Cluster

### Get your hands dirty with Kubernetes and container orchestration

1. By default, if you deploy a Kubernetes Service of type LoadBalancer into EKS, EKS will create a Classic Load Balancer, which is an older type of load balancer that is not generally recommended anymore.

   - In most cases, you actually want an Application Load Balancer (ALB), as you saw in the VM orchestration section.
   - To deploy an ALB, you need to make a few changes, as explained in the AWS documentation.

2. Try terminating one of the worker node instances using the AWS Console.

   - How does the ELB handle it?
   - How does EKS respond?
   - Do you need to do anything to restore the instance or your containers?

3. Try using `kubectl exec` to get a shell (like an SSH session) into a running container.

## Serverless Orchestration

## What is Serverless Orchestration

> [!IMPORTANT]
> Key takeaway #4
> Serverless orchestration is an immutable infrastructure approach where you deploy and manage functions without having to think about servers at all.

### Example: Deploy a Serverless Function with AWS Lambda

### Example: Deploy an API Gateway in Front of AWS Lambda

### Example: Roll Out Updates with AWS Lambda

### Get your hands dirty with serverless web-apps and Serverless Orchestration

> [!NOTE]
> To avoid introducing too many new tools, this chapter uses OpenTofu to deploy Lambda functions
>
> - which works great for functions used for background jobs and event processing,
> - but for serverless web apps where you use a mix of Lambda functions and API Gateway, the OpenTofu code can get very verbose (especially the API Gateway parts).
>   - Moreover, if you’re using OpenTofu to manage a serverless webapp, you have no easy way to run or test that webapp (especially the API Gateway endpoints) locally.

If you’re going to be building serverless web apps for production use cases, try out one of the following tools instead, as they are purpose-built for serverless web apps, keep the code more concise, and give you ways to test locally:

- Serverless Framework
- SAM

## Comparing Orchestration Options

## Conclusion

- You learn how to run your apps in a way that more closely handles the demand of production ("in a _scalable way_"):

  - ⛓️‍💥 avoid a single point of failure

    - by using multiple replicas

  - ☦️ distribute traffic across the replicas

    - by deploying load balancers

  - 🎢 roll out updates to your replicas without downtime 🔛

    - by using deployment strategies

- You've seen a number of _orchestration approaches_ to handle all of the above problems:

  | Orchestration approach   | ...infrastructure approach | How it works?                                                         | Example                                               |
  | ------------------------ | -------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
  | **Server** orchestration | **Mutable** ... (Old way)  | A fixed set of servers are maintained, updated in place.              | Deploy code onto a cluster of servers (using Ansible) |
  | **VM** ...               | **Immutable** ...          | VM images are deployed & managed across virtualized servers.          | Deploy VMs into an Auto Scaling Group.                |
  | **Container** ...        | **Immutable** ...          | Containers images are deployed & managed across a cluster of servers. | Deploy containers into a Kubernetes cluster.          |
  | **Serverless** ...       | **Immutable** ...          | Functions are deploy & managed without thinking about servers at all. | Deploy functions using AWS Lambda.                    |

[^1]: The no downtime is from users perspective.
[^2]: The computing resources are CPU, memory, disk space.
[^3]: The scheduler usually implements some sort of _bin packing algorithm_ to try to use resources available as efficiently as possible.
