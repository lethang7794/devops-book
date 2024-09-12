# Chapter 7: How to Set Up Networking

Networking is what needed to:

- _connect_ 👉 services need to communicate over the network
- _secure_ 👉 environment need to be isolated from each other (so they can't talk to each other)

your applications.

This chapter will walkthrough the concepts and examples:

| Concept               | Description                                 | Example                                       |
| --------------------- | ------------------------------------------- | --------------------------------------------- |
| Public networking     | Expose your apps to the public internet via |                                               |
|                       | - public IPs                                | - Deploy servers with public IPs in AWS       |
|                       | - domain names                              | - Register a domain name for them in Route 53 |
| Private networking    | Run apps in private network to              | - Create a Virtual Private Cloud (VPC) in AWS |
|                       | - protect them from public internet access  | - Deploy servers into VPC                     |
| Network access        | Securely access private networks            | Connect to a server in a VPC in AWS using     |
|                       | - using SSH, RDP, VPN                       | - SSH and a bastion host                      |
| Service communication | Connect & secure communicate between apps   | Use Istio as a service mesh                   |
|                       | - in a (micro)services architecture         | - for microservices running in Kubernetes     |

## Public Networking

### Public IP Addresses

> [!IMPORTANT]
> Key takeaway #1
> You get public IP addresses from network operators such as cloud providers and ISPs.

### Domain Name System (DNS)

> [!IMPORTANT]
> Key takeaway #2
> DNS allows you to access web services via memorable, human-friendly, consistent names.

### Example: Register and Configure a Domain Name in Amazon Route 53

#### Register a domain name

> [!WARNING]
> Watch out for snakes: registering domain names is not part of the AWS free tier!

#### Deploy EC2 instances

> [!WARNING]
> Watch out for snakes: a step backwards in terms of orchestration and security

#### Configure DNS records

### Get your hands dirty: Managing domain names

## Private Networking

> [!IMPORTANT]
> Key takeaway #3
> Use a defense-in-depth strategy to ensure you’re never one mistake away from a disaster.

Private networks' advantages:

- **Defense in depth**

- **Isolate workloads**

- **Better control and monitoring**

> [!IMPORTANT]
> Key takeaway #4
> Deploy all your servers into private networks by default, exposing only a handful of locked-down servers directly to the public Internet.

### Physical Private Networks

> [!NOTE]
> Lossy compression
> Networking is a huge topic, what you’re seeing here is a highly simplified picture.

#### Private networks's key characteristics

##### Only authorized devices may connect to the private network

##### The private network uses private IP address ranges

##### The private network defines connectivity rules

##### Most devices in a private network access the public Internet through a gateway

#### Common types of gateways

##### Load balancers

##### NAT gateway

##### Outbound proxy

##### ISP router

### Virtual Private Networks

#### Virtual networks in the cloud

#### Virtual networks in orchestration tools

#### Example: Create a VPC in AWS

#### Get your hands dirty: Working with VPCs

## Accessing Private Networks

### Castle-and-Moat Model

#### Bastion Host

### Zero-Trust Model

#### Core principles of zero-trust architecture (ZTA)

##### Authenticate every user

##### Authenticate every device

##### Encrypt every connection

##### Define policies for authentication and authorization

##### Enforce least-privilege access controls

##### Continuously monitor and validate

#### Zero-trust should be integrated into every part of your architecture

##### User and device management

##### Infrastructure access

##### Service communication

> [!IMPORTANT]
> Key takeaway #5
> In the castle-and-moat model, you create a strong network perimeter to protect all the resources in your private network; in the zero-trust model, you create a strong perimeter around each individual resource.

### SSH

#### How to use SSH

#### Example: SSH bastion host in AWS

> [!WARNING]
> Watch out for snakes: EC2 key pairs are not recommended in production

#### Get your hands dirty: SSH

#### Advantages of SSH

- Widely available

- Secure

- No extra infrastructure

- Powerful dev tools

#### Disadvantages of SSH

- Managing keys can be difficult, especially at scale

- It’s primarily a dev tool

### RDP

#### How to use RDP

#### Advantages of RDP

- You get a fully-working Windows UI

- Works for all employees

#### Disadvantages of RDP

- Windows-only

- Not secure without extra infrastructure

- Not your own computer

### VPN

#### Use cases for VPNs

##### Connect remote employees to an office or data center network

##### Connect two data centers together

##### Hide Internet browsing behavior

#### How to use VPN

#### Advantages of VPN

- You get transparent network access from your own computer

- Works for all employees

- Works with all operating systems

- Secure

#### Disadvantages of VPN

- Extra infrastructure to run

- Certificate management can be difficult

- Performance overhead

## Service Communication in Private Networks

### Service Discovery

> [!IMPORTANT]
> Key takeaway #6
> As soon as you have more than one service, you will need to figure out a service discovery solution.

#### Service discovery tools

##### Generic tools

###### Configuration files

###### (Internal) load balancers

###### DNS

##### Dedicated service discovery tools

###### Library: Consul, Curator and ZooKeeper, Eureka

###### Local proxy: Consul, Synapse, Envoy; built-in mechanism of orchestration tools

#### Service discovery tool comparison

Tradeoffs:

- Manual error
- Update speed
- Scalability
- Transparency
- Latency
- CPU and memory usage
- Extra infrastructure

### Service Communication Protocol

#### Message encoding vs Network encoding

#### REST APIs: HTTP + JSON

#### Serialization libraries

#### RPC libraries

#### Key factor of service communication protocol

##### Programming language support

##### Client support

##### Schema and code generation

##### Ease of debugging

##### Performance

##### Ecosystem

### Service Mesh

#### Why use a service mesh

- Security
- Observability
- Resiliency
- Traffic management

> [!IMPORTANT]
> Key takeaway #7
> A service mesh can improve security, observability, resiliency, and traffic management in a microservices architecture, without having to update the application code of each service.

#### Three types of service meshes

##### Use with Kubernetes

##### From cloud providers

##### Use with any orchestration approach in any deployment environment

#### Example: Istio Service Mesh with Kubernetes Microservices

#### Get your hands dirty: Service meshes and Istio

## Conclusion

- Networking plays a key role in connectivity and security:

  - You get **public IP** addresses from network operators such as cloud providers and ISPs.

  - **DNS** allows you to access web services via memorable, human-friendly, consistent names.

  - Use a **defense-in-depth strategy** to ensure you’re never one mistake away from a disaster.

  - Deploy all your servers into **private networks** by default, exposing only a handful of locked-down servers directly to the public Internet.

  - In the **castle-and-moat model**, you create a strong network perimeter to protect all the resources in your private network; in the **zero-trust model**, you create a strong perimeter around each individual resource.

  - As soon as you have more than one service, you will need to figure out a **service discovery** solution.

  - A **service mesh** can improve security, observability, resiliency, and traffic management in a microservices architecture, without having to update the application code of each service.

- A full network architecture
