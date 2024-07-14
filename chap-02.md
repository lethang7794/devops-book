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

- With modern DevOps, you can **manage** almost everything as code:

  | Task                     | How to manage as code                       | Example                                           | Chapter          |
  | ------------------------ | ------------------------------------------- | ------------------------------------------------- | ---------------- |
  | **Provision servers**    | Provisioning tools                          | Use `OpenTofu` to deploy a server                 | This chapter (2) |
  | **Configure servers**    | Configuration management & templating tools | Use `Packer` to create an image of a server       | This chapter (2) |
  | **Configure apps**       | Configuration files & services              | Read configuration from a `JSON` file during boot |                  |
  | **Configure networking** | Provisioning tools, service discovery       | Use `Kubernetes`'s **service discovery**          |                  |
  | **Build apps**           | Build systems, continuous integration       | Build your app with `npm`                         |                  |
  | **Test apps**            | Automated tests, continuous integration     | Write automated tests using `Jest`                |                  |
  | **Deploy apps**          | Automated deployment, continuous delivery   | Do a**rolling deployment** with `Kubernetes`      | Chapter 3        |
  | **Scale apps**           | Auto scaling                                | Set up**auto scaling policies** in `AWS`          | Chapter 3        |
  | **Recover from outages** | Auto healing                                | Set up**liveness probes** in `Kubernetes`         | Chapter 3        |
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
| Scale                            | Scale Hard, need to figure everything out yourself                                      | - Keep track of everything`<br>` - Connect everything together `<br>` - Deployment strategies.                                                                   |
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
| Scale                        | Scale very well                                          | e.g. The same image can be used to launch 1 or 1000 servers.                     |
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

Under the hood, provisioning tools work by

- translating the code you write
  - into API calls to the cloud providers you're using

e.g. If you write OpenTofu/Terraform code to create a server in AWS, when you run OpenTofu, it will:

- Parse your code
- (Based on the the configuration you specified,) make a number of APIs calls to AWS
  - to create an EC2 instance

> [!NOTE]
> By making APIs to cloud providers, provisioning tools bring in many advantages:
>
> - You don't need to setup master servers.
> - You don't need to setup connection to the servers ← Take advantages of the authentication mechanism of cloud providers.

### Example: Deploy an EC2 Instance Using OpenTofu

> [!TIP]
> Terraform vs OpenTofu
>
> - `Terraform` is a popular provisioning tool that HashiCorp open sourced in 2014 under Mozilla Public Licenses (MPL) 2.0.
>   - In 2024, HashiCorp switched `Terraform` to non-open source Business Source License (BSL).
> - As a result, the community fork `Terraform` under the named `OpenTofu`, which remains open source under the MPL 2.0 license.

---

To deploy an EC2 Instance using OpenTofu, you

- write an OpenTofu _module_

  - in HCL[^12],
  - in _configuration files_ with a `.tf` extension (instead of `.pkr.hcl` for Packer template)

  > [!NOTE]
  > An OpenTofu module is a folder with all `.tf` files in that folder:
  >
  > - No matter are the name of these `.tf` files.
  > - But there are some conventions, e.g.
  >   - `main.tf`: Main resources
  >   - `variables.tf`: Input variables
  >   - `outputs.tf`: Output variables

- use that OpenTofu module (run OpenTofu code) to deploy the EC2 instance.

---

For this example, the OpenTofu module for an EC2 instance looks like this:

1.  `main.tf`: Main resources

    ```terraform
    # examples/ch2/tofu/ec2-instance/main.tf
    provider "aws" {                                               # 1️⃣
      region = "us-east-2"
    }

    resource "aws_security_group" "sample_app" {                   # 2️⃣
      name        = "sample-app-tofu"
      description = "Allow HTTP traffic into the sample app"
    }

    resource "aws_security_group_rule" "allow_http_inbound" {      # 3️⃣
      type              = "ingress"
      protocol          = "tcp"
      from_port         = 8080
      to_port           = 8080
      security_group_id = aws_security_group.sample_app.id
      cidr_blocks       = ["0.0.0.0/0"]
    }

    resource "aws_instance" "sample_app" {                         # 4️⃣
      ami                    = var.ami_id                          # 4️⃣1️⃣
      instance_type          = "t2.micro"
      vpc_security_group_ids = [aws_security_group.sample_app.id]
      user_data              = file("${path.module}/user-data.sh") # 4️⃣2️⃣

      tags = {
        Name = "sample-app-tofu"
      }
    }
    ```

    <details><summary>What the OpenTofu code do?</summary>

    - 1️⃣ - **Use AWS provider**: to work with AWS cloud provider.

      > [!NOTE]
      > OpenTofu can works with many _providers_, e.g. AWS, Azure, GCP...
      >
      > - An OpenTofu provider is like a Packer plugin.

      > [!TIP]
      > AWS has data centers all over the world, grouped into regions.
      >
      > - An AWS `region` is a separate **geographic area**, e.g. `us-east-1` (Virginia), `us-east-2` (Ohio), `eu-west-1` (Ireland), `ap-southeast-1` (Singapore)
      >   - Within each region, there are multiple **isolated data center**s, called `Availability Zones` (`AZs`)

    - 2️⃣ - **Create a security group**: to control the network traffic go in & out the EC2 instance

      > [!NOTE]
      > For each type of provider, there are
      >
      > - several kinds of _resources_ that you can create
      >   - e.g. servers, databases, load balancers, firewall settings...
      >
      > ***
      >
      > The syntax for creating a resource (of a provider) in OpenTofu is as follows:
      >
      > - ```terraform
      >   resource "<PROVIDER>_<TYPE>" "<NAME>" {
      >     [CONFIG ...]
      >   }
      >   ```
      >
      >   with:
      >
      >   - `PROVIDER`: name of the provider, e.g. `aws`
      >   - `TYPE`: type of the resource (of that provider) to create, e.g. `instance` (an AWS EC2 instance)
      >   - `NAME`: an identifier you can use in OpenTofu code to refer to this resource, e.g. `my_instance`
      >   - `CONFIG`: one or more `arguments` that specific to that resource.

    - 3️⃣ - **Create a rule for the security group**: to allow inbound HTTP request on port 8080.
    - 4️⃣ - **Create an EC2 instance**: that uses the previous security group, and have a `Name` tag of `sample-app-tofu`.

           - 4️⃣1️⃣ - **Set the AMI**: to `var.ami_id`, which is a reference to an `input variable` named `ami_id` in `variables.tf`.
           - 4️⃣2️⃣ - **Set the user data**: to a file named `user-data.sh`, which is in the OpenTofu module's directory, next to other `.tf` files.

    </details>

2.  `variables.tf`: Input variables

    ```terraform
    # examples/ch2/tofu/ec2-instance/variables.tf
    variable "ami_id" {
      description = "The ID of the AMI to run."
      type        = string
    }
    ```

    > [!NOTE]
    > The input variables allow an OpenTofu module
    >
    > - to be customized when that module is used to provision resources.

    <details><summary>Example explain</summary>

    - The input variable `ami_id` allow you to pass in the ID of an AMI that will be used to run the EC2 instance.
      - You will pass in `ID` of the AMI you build Packer template in previous section.

    </details>

3.  `outputs.tf`: Output variables

    ```terraform
    # examples/ch2/tofu/ec2-instance/outputs.tf
    output "instance_id" {
      description = "The ID of the EC2 instance"
      value       = aws_instance.sample_app.id
    }

    output "security_group_id" {
      description = "The ID of the security group"
      value       = aws_security_group.sample_app.id
    }

    output "public_ip" {
      description = "The public IP of the EC2 instance"
      value       = aws_instance.sample_app.public_ip
    }
    ```

    > [!NOTE]
    > The output variables can be used to log & share values betweens OpenTofu modules.

4.  (Not about OpenTofu) The application & the user data

    - The application: is already included in the AMI (built from the Packer template in previous section).
    - The EC2 instance user data (to start the app)

      ```bash
      # examples/ch2/tofu/ec2-instance/user-data.sh
      #!/usr/bin/env bash
      nohup node /home/ec2-user/app.js &
      ```

---

After writing the OpenTofu module code, you need to run that module code to deploy the EC2 instance:

1. Install OpenTofu
2. Install any providers used in OpenTofu code

   ```bash
   tofu init
   ```

3. Apply the OpenTofu code to deploy the EC2 instance

   - Run the `apply` command

     ```bash
     tofu apply
     ```

   - The `tofu apply` command will prompt you for the `ami_id` value and you paste in the value via the CLI

     ```bash
     var.ami_id
       The ID of the AMI to run.

       Enter a value:
     ```

     <details>
     <summary>

     Alternative to provide the values via the CLI prompt, you can do it via `-var` flag, environment variables, or _variable definitions file_.

     </summary>

     - `-var` flag:

       ```bash
       tofu apply -var ami_id=<YOUR_AMI_ID>
       ```

     - Environment variable `TF_VAR_<var_name>`

       ```bash
       export TF_VAR_ami_id=<YOUR_AMI_ID>
       tofu apply
       ```

     - _Variable definition file_ (a file named `terraform.tfvars`)

       - Define `terraform.tfvars`

         ```tfvars
         # ch2/tofu/ec2-instance/terraform.tfvars
         ami_id = "<YOUR_AMI_ID>"
         ```

       - Run `tofu apply` and OpenTofu will automatically find the `ami_id` value.

     </details>

   - The `tofu apply` command will then

     - show you the `execution plan` (`plan` for short)...

       ```bash
       OpenTofu will perform the following actions:
       ```

       <details><summary>

       ...Details of the actions...

       </summary>

       ```bash
         # aws_instance.sample_app will be created
         + resource "aws_instance" "sample_app" {
             + ami                                  = "ami-0ee5157dd67ca79fc"
             + instance_type                        = "t2.micro"
             ... (truncated) ...
           }

         # aws_security_group.sample_app will be created
         + resource "aws_security_group" "sample_app" {
             + description            = "Allow HTTP traffic into the sample app"
             + name                   = "sample-app-tofu"
             ... (truncated) ...
           }

         # aws_security_group_rule.allow_http_inbound will be created
         + resource "aws_security_group_rule" "allow_http_inbound" {
             + from_port                = 8080
             + protocol                 = "tcp"
             + to_port                  = 8080
             + type                     = "ingress"
             ... (truncated) ...
           }
       ```

       </details>

       ```bash
       Plan: 3 to add, 0 to change, 0 to destroy.

       Changes to Outputs:
         + instance_id       = (known after apply)
         + public_ip         = (known after apply)
         + security_group_id = (known after apply)
       ```

       > [!NOTE]
       > The plan output is similar to the output of the `diff` command of Linux and `git diff`:
       >
       > Anything with:
       >
       > - a plus sign (`+`) will be created
       > - a minus sign (`–`) will be deleted
       > - a tilde sign (`~`) will be modified in place

       > [!TIP]
       > The plan output can also be generated by running `tofu plan`.

     - ...prompt you for confirmation

       ```bash
       Do you want to perform these actions?
         OpenTofu will perform the actions described above.
         Only 'yes' will be accepted to approve.

         Enter a value:
       ```

     - If you type `yes` and hit `Enter`, OpenTofu will proceed:

       ```bash
         Enter a value: yes
       ```

       <details>
       <summary>Output</summary>

       ```bash
       aws_security_group.sample_app: Creating...
       aws_security_group.sample_app: Creation complete after 2s
       aws_security_group_rule.allow_http_inbound: Creating...
       aws_security_group_rule.allow_http_inbound: Creation complete after 0s
       aws_instance.sample_app: Creating...
       aws_instance.sample_app: Still creating... [10s elapsed]
       aws_instance.sample_app: Still creating... [20s elapsed]
       aws_instance.sample_app: Creation complete after 22s

       Apply complete! Resources: 3 added, 0 changed, 0 destroyed.

       Outputs:

       instance_id = "i-0a4c593f4c9e645f8"
       public_ip = "3.138.110.216"
       security_group_id = "sg-087227914c9b3aa1e"
       ```

       - The 3 output variables from `outputs.tf` is shown at the end.

       </details>

### Example: Update Infrastructure Using OpenTofu

- Make a change to the configuration - add a `Test` tag with the value of `"update"`

  ```terraform
  resource "aws_instance" "sample_app" {

    # ... (other params omitted) ...

    tags = {
      Name = "sample-app-tofu"
      Test = "update"
    }
  }
  ```

- Run `tofu apply` command again

  ```bash
  tofu apply
  ```

  <details><summary>Output</summary>

  ```bash
  aws_security_group.sample_app: Refreshing state...
  aws_security_group_rule.allow_http_inbound: Refreshing state...
  aws_instance.sample_app: Refreshing state...

  OpenTofu used the selected providers to generate the following execution plan.
  Resource actions are indicated with the following symbols:
    ~ update in-place

  OpenTofu will perform the following actions:

    # aws_instance.sample_app will be updated in-place
    ~ resource "aws_instance" "sample_app" {
        id = "i-0738de27643533e98"
      ~ tags = {
            "Name" = "sample-app-tofu"
          + "Test" = "update"
        }
        # (31 unchanged attributes hidden)

        # (8 unchanged blocks hidden)
      }

  ```

  </details>

  ```bash
  Plan: 0 to add, 1 to change, 0 to destroy.

  Do you want to perform these actions?
  OpenTofu will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value:
  ```

- OpenTofu will update the EC2 instance after you type `yes` and press `Enter`

---

> [!NOTE]
> How OpenTofu know which infrastructure to update?
>
> - Every time you run OpenTofu, it records information about the infrastructure it created/updated?
>   - in an OpenTofu _state file_.

> [!NOTE]
> How OpenTofu manages the information about the infrastructure it has created/updated?
>
> - OpenTofu manages state using _backends_:
>   - The default backend is `local backend`:
>     - State is stored locally in a `terraform.tfstate` file (in the same folder as the OpenTofu module)

---

- For the previous example and this example:
  - When you run `apply` the first on the tofu module:
    - OpenTofu records in the files the IDs of the EC2 instance, security group, security group rules, and any other resources it created
  - When you run `apply` again:
    - OpenTofu updates it view of the world (`Refreshing state...`):
      - OpenTofu performs a diff of
        - the current state (in state file)
        - the desired state (in your OpenTofu code)
      - OpenTofu then show its execution plan: the actions it will perform (to transform the current state to the desired state).

### Example: Destroy Infrastructure Using OpenTofu

- To destroy everything you've deployed with an OpenTofu module, you use `destroy` command

  ```bash
  tofu destroy
  ```

  <details><summary>Detail of the actions</summary>

  ```bash

  OpenTofu will perform the following actions:

    # aws_instance.sample_app will be destroyed
    - resource "aws_instance" "sample_app" {
        - ami                                  = "ami-0ee5157dd67ca79fc" -> null
        - associate_public_ip_address          = true -> null
        - id                                   = "i-0738de27643533e98" -> null
        ... (truncated) ...
      }

    # aws_security_group.sample_app will be destroyed
    - resource "aws_security_group" "sample_app" {
        - id                     = "sg-066de0b621838841a" -> null
        ... (truncated) ...
      }

    # aws_security_group_rule.allow_http_inbound will be destroyed
    - resource "aws_security_group_rule" "allow_http_inbound" {
        - from_port              = 8080 -> null
        - protocol               = "tcp" -> null
        - to_port                = 8080 -> null
        ... (truncated) ...
      }
  ```

  </details>

  ```bash
  Plan: 0 to add, 0 to change, 3 to destroy.

  Changes to Outputs:

  - instance_id = "i-0738de27643533e98" -> null
  - public_ip = "18.188.174.48" -> null
  - security_group_id = "sg-066de0b621838841a" -> null

  ```

  ```bash
  Do you really want to destroy all resources?
    OpenTofu will destroy all your managed infrastructure, as shown above.
    There is no undo. Only 'yes' will be accepted to confirm.

    Enter a value:
  ```

- Type `yes` and hit `Enter` to confirm that you want OpenTofu to execute its _destroy plan_.

> [!CAUTION]
> Be careful when you run `destroy` in production.
>
> - It's a one way door 🚪. There's no `"undo"`.

### Get your hands dirty with OpenTofu - Part 1

1. How would you have to tweak the OpenTofu code if you wanted to run multiple EC2 instances?
2. Figure out how to configure the EC2 instance with an EC2 key pair so you can connect to it over SSH.

### Example: Deploy an EC2 Instance Using an OpenTofu "Reusable Module"

> [!NOTE]
> OpenTofu _modules_ are **containers** for multiple resources that are used together.
>
> There are 2 types modules in OpenTofu:
>
> - _root module_: any module on which you run `apply` directly.
> - _reusable module_: a module meant to be included in others modules (root modules, reusable modules).

---

So far, you've only used the root module - the `ec2-instance` module.

In this example, you will transform the `ec2-instance` as a root module into a reusable module.

- Create 3 folders: `modules`, `live`, `sample-app`:

  ```bash
  mkdir -p examples/ch2/tofu/modules         # For reusable modules
  mkdir -p examples/ch2/tofu/live            # For root modules
  mkdir -p examples/ch2/tofu/live/sample-app # The sample-app (root module) that use the ec2-instance reusable module
  ```

- Move the `ec2-instance` module into the `modules` folder:

  ```bash
  mkdir -p example/ch2/tofu/modules
  mv ch2/tofu/ec2-instance ch2/tofu/modules/ec2-instance
  ```

- In the `sample-app` folder, create `main.tf` for the main resources of the sample app:

  ```terraform
  # examples/ch2/tofu/live/sample-app/main.tf
  module "sample_app_1" {                 # 1️⃣
    source = "../../modules/ec2-instance" # 2️⃣

    # TODO: fill in with your own AMI ID!
    ami_id = "ami-09a9ad4735def0515"      # 3️⃣
  }
  ```

  <details><summary>What does the code do?</summary>

  - 1️⃣ - **`module` block**: calls a reusable module from a parent module.
  - 2️⃣ - **`source` parameter**: path to a local directory containing the child module's configuration files, e.g. `../../modules/ec2-instance`
  - 3️⃣ - **other parameters** that will be passed to the module as input variables, e.g. `ami_id`

  </details>

  If you run `apply` on `sample-app` module, OpenTofu will use the `ec2-instance` module to to create an EC2 instance (, security group and security group rules)

  > [!NOTE]
  > Modules are the main way to _package_ & _reuse_ resource configurations with OpenTofu.
  >
  > e.g.
  >
  > - Create multiple resources that meant to be used together (module ~ **package**)
  > - Create same type of resource multiple times (module ~ **function**)

  > [!TIP]
  > What happen if you run a root module multiple times?
  >
  > - It will create/update the resources in that root module.

  > [!TIP]
  > So how do you reuse a module to create a group of resources multiple times?
  >
  > - You can't re-apply a root module to do that.
  > - You need to apply a root module that call another reusable module multiple times.
  >
  >   e.g.
  >
  >   ```terraform
  >   module "sample_app_1" {
  >     source = "../../modules/ec2-instance"
  >
  >     ami_id = "ami-XXXXXXXXXXXXXXXXX"
  >   }
  >
  >   module "sample_app_2" {
  >     source = "../../modules/ec2-instance"
  >
  >     ami_id = "ami-XXXXXXXXXXXXXXXXX"
  >   }
  >   ```

- _Namespace_ all the resources created by the `ec2-instance` module.

  - Introduce a `name` input variable to use as the base name for resources of the `ec2-instance` module

    ```terraform
    # examples/ch2/tofu/modules/ec2-instance/variables.tf
    variable "name" {
      description = "The base name for the instance and all other resources"
      type        = string
    }
    ```

  - Update the `ec2-instance` module to use the `name` input variable everywhere that was hard-coded:

    ```terraform
    resource "aws_security_group" "sample_app" {
      name        = var.name
      description = "Allow HTTP traffic into ${var.name}"
    }

    resource "aws_instance" "sample_app" {

      # ... (other params omitted) ...

      tags = {
        Name = var.name
      }
    }
    ```

  - Back to `sample-app/main.tf`, set the `name` input to different values in each module block

    ```terraform
    # examples/ch2/tofu/live/sample-app/main.tf
    module "sample_app_1" {
      source = "../../modules/ec2-instance"

      ami_id = "ami-XXXXXXXXXXXXXXXXX"

      name = "sample-app-tofu-1"
    }

    module "sample_app_2" {
      source = "../../modules/ec2-instance"

      ami_id = "ami-XXXXXXXXXXXXXXXXX"

      name = "sample-app-tofu-2"
    }
    ```

- Move the `provider` block (from the `ec2-instance` module) to the `sample-app` root module:

  ```terraform
  # examples/ch2/tofu/live/sample-app/main.tf
  provider "aws" {
    region = "us-east-2"
  }

  module "sample_app_1" {
    # ...
  }
  module "sample_app_2" {
    # ...
  }
  ```

  > [!NOTE]
  > Typically, reusable module
  >
  > - do _not_ declare `provider` blocks,
  > - but _inherit_ from root module. ← Any user of this reusable module can configure the provider in different ways for different usages.

- Finally, proxy the output variables from the `ec2-instance` module

  ```terraform
  output "sample_app_1_public_ip" {
    value = module.sample_app_1.public_ip
  }

  output "sample_app_2_public_ip" {
    value = module.sample_app_2.public_ip
  }

  output "sample_app_1_instance_id" {
    value = module.sample_app_1.instance_id
  }

  output "sample_app_2_instance_id" {
    value = module.sample_app_2.instance_id
  }
  ```

---

The reusable module `ec2-instance` is ready, let's init & apply the `example-app`

```terraform
tofu init
tofu apply
```

### Example: Deploy an EC2 Instance Using an OpenTofu "Reusable Module" from GitHub

> [!NOTE]
> The OpenTofu module's `source` parameter can be set a lot of different source types[^13].
>
> - a local path
> - Terraform Registry
> - GitHub/Git repositories
> - HTTP URLs
> - S3 buckets, GCP buckets.
> - ...

In this example, you will set the `sample-app` module `source` to a GitHub repository (`github.com/brikis98/devops-book`), with the same source code for the `ec2-instance` module at the path `ch2/tofu/modules/ec2-instance`.

- Modify the `source` parameter

  ```terraform
   module "sample_app_1" {
     source = "github.com/brikis98/devops-book//ch2/tofu/modules/ec2-instance"

     # ... (other params omitted) ...
   }
  ```

  - The double lash (`//`) is used to separate the Github repo & the path of module (in that repo)

- Run `init`:

  ```bash
  tofu init
  ```

  ```bash
  Initializing the backend...
  Initializing modules...
  Downloading git::https://github.com/brikis98/devops-book.git...
  Downloading git::https://github.com/brikis98/devops-book.git...

  Initializing provider plugins...
  ```

  - The `init` command will download the module code (from GitHub) & the provider code.

- Run `apply` and you will have the exact same two EC2 instance as the previous example.

> [!WARNING]
> When you're done experimenting, don't forget to run `destroy` to clean everything up.

> [!IMPORTANT]
> A common pattern at many company is:
>
> - The Ops team **_define & manage_ a library** of well-tested, reusable OpenTofu modules:
>   - Module for deploying server
>   - Module for deploying database
>   - Module for configuring networking
>   - ...
> - The Dev teams use these modules as a _self-service_ way to **_deploy & manage_ the infrastructure** they need for their apps

### Get your hands dirty with OpenTofu - Part 2

1. Make the `ec2-instance` module more configurable:

   e.g. add input variables to configure

   - the instance type it uses,
   - the port it opens up for HTTP requests, and so on.

2. Instead of having to provide the AMI ID manually, make OpenTofu find the ID of your AMI automatically (Tip: Use data sources)

### How Provisioning Tools Stack Up

| Aspect                       | Provisioning Tools                                       | Notes                                                                                                                             |
| ---------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| CRUD                         | Fully support all CRUD operations                        |                                                                                                                                   |
| Scale                        | Scale very well                                          | With self-service approach, can scale to thousands, ten thousands of developers.                                                  |
| Idempotency & error handling | Idempotent & handle error automatically                  | ← Declarative approach: you specify the desired state, the tool itself automatically figure out how to get to that desired state. |
| Consistency                  | Consistent, predictable structure code with conventions. | e.g. Docs, file layout, named parameters, secret managements...                                                                   |
| Verbosity                    | More concise                                             | ← Declarative + DSL                                                                                                               |

> [!IMPORTANT]
> Key takeaway #2.4
> Provisioning tools are
>
> - great for deploying & managing servers or infrastructure.

> [!TIP]
> Many provisioning tools support:
>
> - not only manage traditional infrastructure, e.g. servers
> - but also many aspects of software delivery
>   e.g. OpenTofu can manage
>   - Version control system, e.g. GitHub
>   - Metrics & dashboard, e.g. Grafana
>   - On-call rotation, e.g. PagerDuty

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

[^12]: HCL is the language used by Packer, Terraform/OpenTofu and many other products of HashiCorp.
[^13]: https://developer.hashicorp.com/terraform/language/modules/sources
