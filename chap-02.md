# Chapter 2: How to Manage Your Infrastructure as Code

## ClickOps and IaC

### ClickOps

ClickOps
: clicking through an web UI of a cloud provider's website to configure computing infrastructure

The problems of ClickOps:

- Deployments are slow & tedious → You can't deploy more often
- Deployments are error-prone → Bugs, outages...
- Only one person knows how to deploy → If that person is overloaded, everything takes ages; there is also _bus factor_

### Infrastructure as Code

Infrastructure as Code (IaC)
: You write & execute code to define, deploy, update, destroy your infrastructure
: This marks a shift in mindset in which
: - all aspects of operations are treated as software
: - even those represent hardware, e.g. setting up a server

---

- With modern DevOps, you can manage almost everything as code:
  | Task | How to manage as code | Example | Chapter |
  | ------------------------------ | ------------------------------------------- | ---------------------------------------------------- | ---------------- |
  | **Provision servers** | Provisioning tools | Use `OpenTofu` to deploy a server | This chapter (2) |
  | **Configure servers** | Configuration management & templating tools | Use `Packer` to create an image of a server | This chapter (2) |
  | **Configure apps** | Configuration files & services | Read configuration from a `JSON` file during boot | |
  | **Configure networking** | Provisioning tools, service discovery | Use `Kubernetes`'s **service discovery** | |
  | **Build apps** | Build systems, continuous integration | Build your app with `npm` | |
  | **Test apps** | Automated tests, continuous integration | Write automated tests using `Jest` | |
  | **Deploy apps** | Automated deployment, continuous delivery | Do a**rolling deployment** with `Kubernetes` | Chapter 3 |
  | **Scale apps** | Auto scaling | Set up**auto scaling policies** in `AWS` | Chapter 3 |
  | **Recover from outages** | Auto healing | Set up**liveness probes** in `Kubernetes` | Chapter 3 |
  | **Manage databases** | Schema migrations | Use `Flyway` to update your database schema | |
  | **Test for compliance** | Automated tests, policy as code | Check compliance using `Open Policy Agent (OPA)` | |
- For infrastructure, there are 4 type of IaC tools:
  | IaC tool | Example |
  | ---------------------------------------- | ---------------------------------------------- |
  | **Ad-hoc scripts** | Use a `Bash` script to deploy a server. |
  | **Configuration management tools** | Use `Ansible` to deploy a server. |
  | **Server templating tools** | Use `Packer` to create an image of a server. |
  | **Provision tools** | Use `OpenTofu` to deploy a server. |

### The Benefits of IaC

When your infrastructure is defined as code:

- the entire deployment process can be automated
- you can apply software engineering practices (to your software delivery processes)

which bring a lot of benefits:

|                    | How?                                                                             | The benefit                                                                           |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 🤳 Self-service    | Code → Automated                                                                 | Developers can kickoff their own deploy whenever necessary                            |
| 💨 Speed & safety  | Code → Automated → Computers do it better than human                             | Deployments can be significantly faster; consistently & not prone to manual error     |
| 📚 Documentation   | The state of your infrastructure is in the source code                           | Every one can understand how things work                                              |
| 🏷️ Version control | The infrastructure (as code) can be tracked by a version control, e.g. git       | The entire history of infrastructure is now in the commit log.                        |
| ✅ Validation      | The state of your infrastructure can be*"tested" just as code*                   | You can perform: code review, automated tests, analysis tools                         |
| 🔁 Reuse           | Your infrastructure can be packaged into*reusable modules*                       | You can easily build your infrastructure on top of documented, batted-tested modules. |
| 😀 Happiness       | IaC allows both computer & developers to what they do best (automation & coding) | Everyone is happy. No more repetitive & tedious deploy task.                          |

## Ad Hoc Scripts

### What is Ad Hoc Script

ad hoc (ad-hoc)
: (adj) arranged or happening when necessary and not planned in advance

ad hoc script
: code written in a scripting language - e.g. Bash/Ruby/Python - to automate a task you were doing manually

### Example: Deploy an EC2 Instance Using a Bash Script

In this example, you will automate all the manual steps,
in [example in chap 1 that deploy an app using AWS](/chap-01.md#example-deploying-an-app-using-aws).

- Migrate the user data

  ```bash
  cd examples
  mkdir -p ch2/bash
  ```

  ```bash
  cp examples
  cp ch1/ec2-user-data-script/user-data.sh ch2/bash/
  ```

- Write the Bash script to deploy an app using AWS

  - Create security group
  - Create rule for that security group
  - Run the instance
  - Get the public ip of the instance
  - Print: instance id, security group id, public ip

  ```bash
  # examples/ch2/bash/deploy-ec2-instance.sh
  # TODO
  ```

> [!CAUTION]
> Watch out for snakes: these are simplified examples for learning, not for production

### Get your hands dirty: Ad hoc scripts

1. What happens if you run the Bash script a second time?

   1. Do you get a error?
   2. If so, why?

2. How would you have to tweak the script if you wanted to run multiple EC2 instances?

---

1.i. If the script is run the second time, there will be an error.
1.i. Because in a VPC - the default VPC in this case - the security group's name need to be unique.

2. To have multiple EC2, you can duplicate the whole script an change the name of the security-group.

> [!WARNING]
> When you're done experimenting with the script, you should manually un-deployed the EC2 instance by using the [EC2 Console]

### How Ad Hoc Scripts Stack Up

| IaC category criteria            | Ad Hoc script                                                                           | Example                                                                                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD[^1]                         | - Only handle basically create`<br>` - Hard to have full CRUD                           | If you run the script a second time, the script will try to`<br>`- create a new security group`<br>`- without knowing that the security group is already exists. |
| Scale                            | Hard, need to figure everything out yourself                                            | - Keep track of everything`<br>` - Connect everything together `<br>` - Deployment strategies.                                                                   |
| Idempotency[^2] & error handling | Most ad hoc scripts:`<br>` - are not idempotent `<br>` - don't handle errors gracefully | - A script runs → Error → Partial state → Forget what it has done → Rerun the script → Another error.                                                            |
| Consistency                      | No consistency                                                                          | You can:`<br>` - use any programming language you want`<br>` - write the code however you want.                                                                  |
| Verbosity                        | Very verbose                                                                            | You need to do everything yourself (CRUD, idempotency, error handling), which make the code very verbose.                                                        |

> [!IMPORTANT]
> Key takeaway #2.1:
> Ad hoc scripts are
>
> - great for small, one-off tasks,
>   - but not for managing all your infrastructure as code.

## Configuration Management Tools

### What is Configuration Management Tools

Configuration Management Tools
: e.g. Chef, Puppet, Ansible
: Appear before cloud computing → Designed with the assumption that:
: - someone else had set up the hardware, e.g. Ops team racked the servers in data center.
: - primary purpose is to handle the software - configure the servers: OS, dependencies, your app (deploy, update).

> [!NOTE]
> The configuration management tools can also deploy & manage servers or other infrastructure.

### How Configuration Management Tools work

- Most configuration tools makes changes _directly_ on a set of server you specify, which is called _mutable infrastructure_ paradigm:

  - The same long-running servers will be mutate over & over again, over many years.

- To be able to make changes on these servers, you need 2 things: something to drive the changes & a way to connect to the server.

  |                                | Chef, Puppet                                                                | Ansible                                       |
  | ------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------- |
  | Something to drive the changes | You run a*master* server(s)                                                 | You use an CLI                                |
  |                                | ➕ Can have a*reconciliation loop*: check & match the desired configuration | ➕ Can run anywhere (dev PC, build server...) |
  | A way to connect to the server | Via*agent* software that installed on each server                           | Via SSH                                       |
  |                                | ➖ Need to install the agent                                                | ➖ Need to open extra port                    |

  > [!WARNING]
  > Chicken-and-egg 🐥🥚 problem
  > You have a tool that configure your servers:
  >
  > - before you can use that tool
  >   - you need to configure your servers.

### Example: Deploy an EC2 Instance Using Ansible

> [!NOTE]
> This example use Ansible to deploy an EC2 instance so you can have a server to use the configuration management tool - Ansible.

> [!WARNING]
> Although configuration tools can also deploy & manage servers:
>
> - they're not originally designed to that.
>
> For this example, spinning up a single server for learning & testing, Ansible is good enough.

> [!TIP]
> Before start this example, you can read the docs about the basic concepts in Ansible.
>
> See:
>
> - https://docs.ansible.com/ansible/latest/getting_started/index.html
> - https://docs.ansible.com/ansible/latest/getting_started/basic_concepts.html

To deploy an EC2 instance using Ansible, you need to:

- Define an Ansible _playbook_[^3]

  - in Ansible's domain specific language (DSL), which is based on YAML.
  - to tell Ansible to do what you want:
    - create a security group
    - create an EC2 key-pair (& save it)
    - create the EC2 instance (& tag it)

  ```yaml
  # examples/ch2/ansible/create_ec2_instance_playbook.yml
  # TODO
  ```

### Example: Configure a Server Using Ansible

1. To let Ansible know which servers it needs configure, you provide an _inventory_[^4] that:

- Specify a list of static IP addresses of the servers (in group).

  e.g.

  ```yaml
  webservers: # A group of servers named webservers
    hosts:
      10.16.10.1:
  dbservers: # A group of servers named dbservers
    hosts:
      10.16.20.1:
      10.16.20.2:
  ```

  - Now, you can use Ansible playbook to target the servers in those 2 groups: `webservers`, `dbservers`

- Use an _inventory plugin_ to dynamically discover your servers with IP addresses that change frequently.

  - e.g.

    - Use the aws_ec2 inventory plugin to discovered EC2 instance on AWS

      ```yaml
      # examples/ch2/ansible/inventory.aws_ec2.yml
      plugin: amazon.aws.aws_ec2
      regions:
        - us-east-2
      keyed_groups:
        - key: tags.Ansible # 1️⃣
      leading_separator: "" # 2️⃣
      ```

    - 1️⃣: Ansible will create groups bases on the **value** of the tag `Ansible`
    - 2️⃣: By default, Ansible adds a leading underscore to the group names. This disables it so the group name matches the tag value.

  - For each group (of servers) in the inventory, you can specify _group variables_[^5] to configure how to connect to the servers in that group.

    ```yaml
    # examples/ch2/ansible/group_vars/ch2_instances.yml
    ansible_user: ec2-user # The user Ansible ‘logs in’ as.
    ansible_ssh_private_key_file: ansible-ch2.key
    ansible_host_key_checking: false # Turn off host key checking so Ansible don't prompt you
    ```

2. To let Ansible know what to do (with the servers), you provides a playbook (that specifies the _roles_[^6] of these server).

- The playbook

  ```yaml
  # examples/ch2/ansible/configure_sample_app_playbook.yml
  - name: Configure the EC2 instance to run a sample app
    hosts: ch2_instances # Target the servers in group ch2_instances - the one created in previous example, grouped by the inventory plugin
    gather_facts: true
    become: true
    roles:
      - sample-app # Configure the server using an Ansible role called sample-app
  ```

- The role:

  - Tasks

    ```yaml
    # ch2/ansible/roles/sample-app/tasks/main.yml
    - name: Add Node packages to yum
      shell: curl -fsSL https://rpm.nodesource.com/setup_21.x | bash - # 1️⃣

    - name: Install Node.js
      yum:
        name: nodejs # 2️⃣

    - name: Copy sample app
      copy: #          3️⃣
        src: app.js #  Relative path to the role's files directory
        dest: app.js # Relative path on the server

    - name: Start sample app
      shell: nohup node app.js &
    ```

    - 1️⃣: Use the `shell` module to install `yum`
    - 2️⃣: Use the `yum` module to install `nodejs`
    - 3️⃣: Use the `copy` module to copy `app.js` to the server.

  - Files

    Copy `app.js` from chapter 1 to `examples/roles/sample-app/files/app.js`

3. The final structure of the example

```bash
.
├── configure_sample_app_playbook.yml
├── group_vars
│   └── ch2_instances.yml
├── inventory.aws_ec2.yml
└── roles
    └── sample-app
        ├── files
        │   └── app.js
        └── tasks
            └── main.yml
```

4. Run the playbook

> [!TIP]
> Don't forget to authenticate to AWS on the command line.

```bash
ansible-playbook -v -i inventory.aws_ec2.yml configure_sample_app_playbook.yml
```

<details><summary>Output</summary>

```bash
PLAY RECAP
xxx.us-east-2.compute.amazonaws.com : ok=5    changed=4    failed=0
```

</details>

### Get your hands dirty with Ansible

1. What happens if you run the Ansible playbook a second time? How does this compare to running the Bash script a second time?
2. How would you have to tweak the playbook if you wanted to run multiple EC2 instances?
3. Figure out how to use the SSH key created by Ansible (`ansible.key`) to manually SSH to your EC2 instance and make changes locally.

> [!WARNING]
> When you're done experimenting with Ansible, you should manually un-deployed the EC2 instance by using the [EC2 Console]

### How Configuration Management Tools Stack Up

| Aspect                       | Configuration Management Tools                           | Explain, examples                                                                                                              |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| CRUD                         | Most supports 3/4 CRUD operation:                        |                                                                                                                                |
|                              | - Create                                                 | ✅                                                                                                                             |
|                              | - Read                                                   | 😢 Hit or miss, e.g. For Ansible, you need to manually give each resource a unique name or tag                                 |
|                              | - Update                                                 | 😢 Hit or miss                                                                                                                 |
|                              | - (Don't support delete)                                 | ❌                                                                                                                             |
| Scale                        | - Designed for managing multiple servers.                | Increase the number of instances, and Ansible will configure all of them.                                                      |
|                              | - Some has builtin support for*rolling deployments*      | If you have 20 servers → update Ansible role → re-run Ansible → Ansible rolls out the change in batch, and ensure no downtime. |
| Idempotency & error handling | Some tasks are idempotent                                | `yum`                                                                                                                          |
|                              | Some task are not idempotent                             | Some task using `shell` module                                                                                                 |
| Consistency                  | Consistent, predictable structure code with conventions. | Docs, file layout, named parameters, secret managements...                                                                     |
| Verbosity                    | Concise ← DSL                                            | The Ansible code may have the same length with Bash, but handles a lot of things: CRU, scaling...                              |

#### Drawbacks of configuration management tools

- Setup cost
- _Configuration drift_ due to mutable infrastructure paradigm: each long-running server can be a little different from the others.

#### Immutable infrastructure paradigm

With immutable infrastructure paradigm:

- Instead of long-running physical servers,
  - you use short-lived virtual servers (that will be replaced every time you do an update).
- Once you've deployed a server, you've never make changes to it again.
  - If you need to update something, even it's just a new version of your application
    - you deploy a new server.

> [!TIP]
> Cattle vs pets

|               | Cattle                                                                                                                                                   | Pet                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Examples      | 🐄🐃                                                                                                                                                     | 🐶🐱                                                                                                                |
| Paradigm      | _Immutable_ infrastructure                                                                                                                               | _Mutable_ infrastructure                                                                                            |
| What it mean? | Treat a server like a _cattle_:<br> - each one is indistinguishable to others, with random, sequential IDs <br> - kill them off & replace them regularly | Treat a server like a _pet_:<br> - give it unique name<br> - (take care of it) & keeps it alive as long as possible |
|               |                                                                                                                                                          |                                                                                                                     |

> [!NOTE]
> Immutable infrastructure paradigm is inspired by:
>
> - Function programming:
>   - Variables are immutable
>     - After you set a variable to a value, you can't change that variable again.
>     - If you need to update something, you create a new variable.
>   - It's a lot easier to reason about your code.

> [!IMPORTANT]
> Key takeaway #2.2
>
> Configuration management tools are
>
> - great for managing the configuration of servers,
>   - but not for deploying the servers themselves, or other infrastructure.

## Server Templating Tools

### What is Server Templating Tools

Server Templating Tools
: e.g. Docker, Packer, Vagrant
: instead of:
: 1. launching servers
: 2. configure them (by running the same code on each)
: you:
: 1. create an _image_ of a server that captures a fully self-contained “**snapshot**” of the
operating system (OS), the software, the files, and all other relevant details.
: 2. use some other IaC to install that image on all of your servers.

#### Two types of image tools - Virtual machine and container

##### Virtual machine

virtual machine (VM)
: a VM emulates an entire computer system, including the hardware (and of course the software)

VM image
: the blueprint for a VM
: defined with tools: Packer, Vagrant

hypervisor
: aka virtualizer
: a type of computer software/firmware/hardware that creates & runs virtual machines.

---

- You run a _hypervisor_[^7] with the _VM image_ to create a VM that virtualize/emulate

  - the underlying hardware: CPU, memory, hard driver, networking...
  - the software: OS, dependencies, apps...

- Pros and cons of VM:

  |      | VM                                                                                  |                                                                                       |
  | ---- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
  | Pros | - Each VM is _fully isolated_ from the host machine & other VM.                     | <- Can run any 3rd-party code without worry of malicious actions                      |
  |      | - All VMs from the same VM image will run exactly the same way in all environments. | e.g. Your PC, a QA server, a production server.                                       |
  | Cons | - _Overhead_ of CPU/memory usage.                                                   | <- For each VM, the hypervisor needs to virtual all hardware & running a guest OS ... |
  |      | - Overhead of startup time.                                                         | <- ... that whole OS needs to start.                                                  |

##### Container

container
: a _container_ emulates the _user space_[^8] of an OS

container image
: the blueprint for a container

container engine
: a Container Engine takes a Container Image
: - (simulates an user space with memory, mount points & networking)
: - turns it into a Container (aka running processes)
: e.g. Docker, cri-o, Podman

---

|      | VM                                                                                                |                                                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Pros | - Each container is _partial isolated_ from the host machine & other containers.                  | <- ☑️ Good enough to run your application code.                                                                       |
|      | - All containers from the same container image will run exactly the same way in all environments. | e.g. Your PC, a QA server, a production server.                                                                       |
|      | - No overhead of CPU/memory usage & startup time.                                                 | <- For all containers, the container engine only needs to virtual a user space (instead of all hardware & a guest OS) |
| Cons | - Each container is only _partial isolated_ from the host machine & other containers.             | <- ❌ Not good enough to run any 3rd-party code without worry about malicious actions.                                |

### Example: Create a VM Image Using Packer

In this example, you will use Packer to create a VM image for AWS (called an Amazon Machine Image - AMI)

- Create a Packer template

  ```hcl
  # examples/ch2/packer/sample-app.pkr.hcl
  packer {
    required_plugins { # 0️⃣
      amazon = {
        version = ">= 1.3.1"
        source  = "github.com/hashicorp/amazon"
      }
    }
  }

  source "amazon-ebs" "amazon_linux" { # 1️⃣
    ami_name        = "sample-app-packer-${uuidv4()}"
    ami_description = "Amazon Linux 2023 AMI with a Node.js sample app."
    instance_type   = "t2.micro"
    region          = "us-east-2"
    source_ami      = "ami-0900fe555666598a2"
    ssh_username    = "ec2-user"
  }

  build { # 2️⃣
    sources = ["source.amazon-ebs.amazon_linux"]

    provisioner "file" { # 3️⃣
      source      = "app.js"
      destination = "/home/ec2-user/app.js"
    }

    provisioner "shell" { # 4️⃣
      inline = [
        "curl -fsSL https://rpm.nodesource.com/setup_21.x | sudo bash -",
        "sudo yum install -y nodejs"
      ]
      pause_before = "30s"
    }
  }
  ```

  - 0️⃣ - **Plugin**: Use the `Amazon` plugin[^9] to build Amazon Machine Image (AMI)
  - 1️⃣ - **Builder**: Use the `amazon-ebs` builder to create EBS-backed AMIs by
    - (launching a source AMI)
    - (re-packaging it into a new AMI after provisioning[^10])
  - 2️⃣ - **Build steps**:
    - After provision the EC2 instance, Packer connects to the server and runs the build steps in the order specified in the Packer template.
    - (When all the builds steps have finished, Packer will take a snapshot of the servers and use it to create an AMI)
  - 3️⃣ - **File provisioner**: Copy the files to the server.
  - 4️⃣ - **Shell provisioner**: Execute shell commands on the server.

  > [!NOTE]
  > The Packer template is nearly identical to the Bash script & Ansible playbook,
  >
  > - except it doesn't actually run the app.

- Install Packer

- Install Packer plugins (used in the Packer template)

  ```bash
  packer init sample-app.pkr.hcl
  ```

  > [!NOTE]
  > Packer can create images for many cloud providers, e.g. AWS, Azure, GCP.
  > The code for each providers is
  >
  > - not in the Packer binary itself
  > - but in a separate plugin (that the `packer init` command can install)

- Build image from Packer template

  ```bash
  packer build sample-app.pkr.hcl
  ```

  <details><summary>Output</summary>

  ```bash
  ==> Builds finished. The artifacts of successful builds are:
    --> amazon-ebs.amazon_linux: AMIs were created:
    us-east-2: ami-XXXXXXXXXXXXXXXXX
  ```

  - The `ami-XXX` value is the ID of the AMI that was created from the Packer template.

  </details>

  > [!NOTE]
  > The result of running Packer is not a server running your app, but the _image_ of the server.
  >
  > - This image will be used by another IaC tolls to launch one or more servers (running the image)
  > - The app will be run when the image is deployed (or the server is launched).

### Get your hands dirty with Packer

1. What happens if you run packer build on this template a second time? Why?

2. Figure out how to update the Packer template so it builds images that

   - not only can run on AWS,
   - but also can run on other clouds (e.g., Azure or GCP)
     - or on your own computer (e.g., VirtualBox or Docker).

### How Server Templating Tools Stack Up

| Aspect                       | Server Templating Tools                                  |                                                                                  |
| ---------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| CRUD                         | Only supports Create                                     | → Create's all a server templating tool needs[^11]                               |
| Scale                        | Very well                                                | e.g. The same image can be used to launch 1 or 1000 servers.                     |
| Idempotency & error handling | Idempotent by design                                     | → If there is an error, just rerun & try again.                                  |
| Consistency                  | Consistent, predictable structure code with conventions. | e.g. Docs, file layout, named parameters, secret managements...                  |
| Verbosity                    | Very concise                                             | ← Use an DSL; don't have to deal with all CRUD operations; idempotent "for free" |

> [!WARNING]
> Server templating tools cannot be used in isolated (because it only supports create).
>
> - If you use a server templating tool, you need another tool to support all CRUD operations, e.g. a provisioning tool

> [!NOTE]
> All server templating tools will create images but for slightly different purposes:
>
> - Packer: create VM images run on production servers, e.g. AMI
> - Vagrant: create VM images run on development computers, e.g. VirtualBox image
> - Docker: create container images of individual applications, which can be run any where as long as that computer has installed an container engine.

> [!IMPORTANT]
> Key takeaway #2.3
> Server templating tools are
>
> - great for managing the configuration of servers with _immutable infrastructure_ practices.
>   - (but needs to be used with another provisioning tools)

## Provisioning Tools

### What is Provisioning Tools

provisioning tool
: e.g. OpenTofu/Terraform, CloudFormation, OpenStack Heat, Pulumi...
: a provisioning tool is responsible for
: - deploying
: - managing (all CRUD operations)
: the servers & other infrastructure in the clouds:
: - (servers), databases, caches, load balances, queues, monitoring
: - subnet configurations, firewall settings, routing rules, TLS certificates
: - ...

> [!NOTE]
> What are the different between ad-hoc script, configuration management tools, server templating tools & provisioning tools?
>
> - Configuration management tools: manage **configurations** of servers
> - Server templating tools: manage **configurations** of servers with immutable infrastructure practices
> - Provisioning tools: deploy & manage the **servers** (& other infrastructure)

### How Provisioning Tools work

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
> Provisioning tools are
>
> - great for deploying and managing servers and infrastructure.

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

  | IaC tool                           | Great for                                                                 | Not for                           |
  | ---------------------------------- | ------------------------------------------------------------------------- | --------------------------------- |
  | **Ad-hoc scripts**                 | Small, one-off tasks                                                      | Managing IaC                      |
  | **Configuration management tools** | Managing configuration of servers                                         | Deploying servers/infrastructure. |
  | **Server templating tools**        | Managing configuration of servers with immutable infrastructure practices |                                   |
  | **Provision tools**                | Deploying & managing servers/infrastructure                               |                                   |

- You usually needs to use multiple IaC tools together to manage your infrastructure.

  e.g.

  - Provisioning + configuration management
  - Provisioning + server templating
  - Provisioning + server templating + orchestration

[EC2 Console]: https://console.aws.amazon.com/ec2/home

[^1]: _CRUD_ stands for create, read, update, delete.
[^2]: A code is _idempotence_ when it can be re-run multiple times and still produce the desired result
[^3]:
    A playbook tells Ansible _what_ to do (to _which_ devices).
    For more information, see https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html

[^4]:
    An inventory tells Ansible which servers to configure (and how to connect to them)
    For more information, see https://docs.ansible.com/ansible/latest/inventory_guide/index.html

[^5]:
    You can store _variable_ values that relate to a specific host or group in inventory.
    A _group variable_ is a variable that is assigned to all machines of that group.

[^6]: In Ansible, a _role_ is a structured way to organize:

    - Tasks: to be run on the server
    - Files: to be copied to the server
    - Templates: to be dynamically filled in data
    - Other configurations that will be applied to the server:

[^7]: Popular hypervisors: VMware, VirtualBox, Parallels
[^8]:
    On most modern operating systems, code runs in one of two “spaces”: kernel space or user space.

    - Code running in kernel space has _direct_, unrestricted access to all of the **hardware**.
      - There are no
        - security restrictions (i.e., you can execute any CPU instruction, access any part of the hard drive, write to any address in memory)
        - or safety restrictions (e.g., a crash in kernel space will typically crash the entire computer),
      - so kernel space is generally reserved for the lowest-level, most trusted functions of the OS (typically called the kernel).
    - Code running in user space does not have any direct access to the hardware and must use APIs exposed by the OS kernel instead.
      - These APIs can enforce
        - security restrictions (e.g., user permissions)
        - and safety (e.g., a crash in a user space app typically affects only that app),
      - so just about all application code runs in user space.

[^9]: https://developer.hashicorp.com/packer/integrations/hashicorp/amazon
[^10]: The amazon-ebs builder builds an AMI by launching an EC2 instance from a source AMI, provisioning that running machine, and then creating an AMI from that machine.
[^11]:
    Server templating is a key component to the shift to immutable infrastructure.

    With server templating tool, if you need to roll out a change, (instead of updating the existing server), you:

    - create a new image
    - deploy that image to a new server

    With server templating,

    - you're always creating new images
    - (there's never a reason to read/update/delete)
