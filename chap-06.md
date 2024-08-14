# Chapter 6: How to Work with Multiple Teams and Environments

CI/CD will allow developers work together efficiently and safety, but as your company grows, there are other type of problems:

- From _outside_ world: more **users** (more traffic/data/laws/regulations)
- From _inside_ your company: more **developers/teams/products** 👉 It's harder to code/test/deploy without hitting lots of bugs/outages/bottlenecks.

These problems are problems of _scale_, good problems to have, which indicates your business is becoming more successful.

The most common approach to solve these problem of scale is _divide and conquer_:

- **Break up your deployments**: into multiple separated, isolated **environments**.
- **Break up your codebase**: into multiple **libraries**, **(micro)services**

## Breaking Up Your Deployments

- In this book, you deploy everything - servers, Kubernetes, cluster, serverless functions, ... - into a single AWS account 👈 Fine for learning & testing
- In real world, it's common to have multiple deployment _environments_, each environment has its own set of _isolated_ infrastructure.

### Why Deploy Across Multiple Environments

#### Isolating Tests

Typically, you need a way to test changes to your software

- _before_ you expose those changes (to users)
- in a way that limits the _blast radius_ (that affects users, production environment).

You do that by deploying more environments that closely resemble production.

A common setup is having 3 environments:

- **Production**: the environment that is exposed to _users_.

- **Staging**: a scaled-down clone of production that is exposed to inside your _company_.

  👉 The releases are staged in **staging** so other teams - e.g. QA - can test them.

- **Development**: another scaled-down clone of production that is exposed to _dev team_.

  👉 Dev teams test code changes in **development** during _development_ process (before those changes make it to staging).

> [!TIP]
> These trio environments have many other names:
>
> - **Production**: `prod`
> - **Staging**: `stage`, `QA`
> - **Development**: `dev`

#### Isolating Products and Teams

> [!IMPORTANT]
> Key takeaway #1
> Breaking up your deployment into multiple environments allows you to isolate tests from production and teams from each other.

#### Reducing Latency

#### Complying With Local Laws and Regulations

#### Increasing Resiliency

### How to Set Up Multiple Environments

#### Logical Environments

#### Separate Servers

#### Separate Networks

#### Separate Accounts

#### Separate Data Centers In The Same Geographical Region

#### Separate Data Centers In Different Geographical Regions

### Challenges with Multiple Environments

#### Increased Operational Overhead

#### Increased Data Storage Complexity

> [!IMPORTANT]
> Key takeaway #2
> Breaking up your deployment into multiple regions allows you to reduce latency, increase resiliency, and comply with local laws and regulations, but usually at the cost of having to rework your entire architecture.

#### Increased Application Configuration Complexity

- Performance settings
- Security settings
- Networking settings
- Service discovery settings
- Feature settings

---

2 methods of configuring application

- At build time: configuration files checked into version control

  > [!IMPORTANT]
  > Key takeaway #3
  > Configuration changes are just as likely to cause outages as code changes.

- At run time: configuration data read from a data store

### Example: Set Up Multiple AWS Accounts

- Create child accounts
- Access your child accounts
- Deploy into your child accounts
- Use different configurations for different environments
- Close your child accounts

### Get Your Hand Dirty: Manage Multiple AWS accounts

## Breaking Up Your Codebase

### Why Break Up Your Codebase

#### Managing Complexity

#### Isolating Products And Teams

#### Handling Different Scaling Requirements

#### Using Different Programming Languages

### How to Break Up Your Codebase

#### Breaking A Codebase Into Multiple Libraries

> [!IMPORTANT]
> Key takeaway #4
> Breaking up your codebase into libraries allows developers to focus on one smaller part of the codebase at a time.

#### Breaking A Codebase Into Multiple Services

> [!IMPORTANT]
> Key takeaway #5
> Breaking up your codebase into services allows different teams to own, develop, and scale each part independently.

### Challenges with Breaking Up Your Codebase

#### Challenges With Backward Compatibility

#### Challenges With Global Changes

> [!IMPORTANT]
> Key takeaway #6
> The trade-off you make when you split up a codebase is that you are optimizing for being able to make changes much faster within each part of the codebase, but this comes at the cost of it taking much longer to make changes across the entire codebase.

#### Challenges With Where To Split The Code

#### Challenges With Testing And Integration

> [!IMPORTANT]
> Key takeaway #7
> Splitting up a codebase into multiple parts means you are choosing to do late integration instead of continuous integration between those parts, so only do it when those parts are truly independent.

#### Dependency Hell

#### Operational Overhead

#### Dependency Overhead

#### Debugging Overhead

#### Infrastructure Overhead

#### Performance Overhead

#### Distributed System Complexities

> [!IMPORTANT]
> Key takeaway #8
> Splitting up a codebase into libraries and services has a considerable cost: you should only do it when the benefits outweigh those costs, which typically only happens at a larger scale.

### Example: Deploy Microservices in Kubernetes

### Get Your Hands Dirty: Running Microservices

## Conclusion

When your company grows, there will be scaling problems, which you can solve by:

- breaking up your deployment into multiple environments
- breaking up your codebase into multiple libraries & services

Both approaches have pros and cons:

|                             | Pros                                                                                       | Cons                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Breaking up your deployment | 1. _Isolate_:                                                                              |                                                                                                                                      |
|                             | - tests from production                                                                    |                                                                                                                                      |
|                             | - teams from each other                                                                    |                                                                                                                                      |
|                             |                                                                                            |                                                                                                                                      |
|                             | 2. If the environments are in different _regions_:                                         |                                                                                                                                      |
|                             | - Reduce latency                                                                           | (at the cost of) having to rework your entire architecture                                                                           |
|                             | - Increase resiliency                                                                      |                                                                                                                                      |
|                             | - Comply with local laws/regulations                                                       |                                                                                                                                      |
|                             |                                                                                            | 3. Configuration changes can cause outages (just as code changes)                                                                    |
|                             |                                                                                            |                                                                                                                                      |
| Breaking up your codebase   | 4. ... into libraries: Developers can _focus_ on a smaller part (of codebase) at a time    |                                                                                                                                      |
|                             |                                                                                            |                                                                                                                                      |
|                             | 5. ... into services: Different teams can _own_, developer & scale each part independently |                                                                                                                                      |
|                             |                                                                                            |                                                                                                                                      |
|                             | 6. You can make change much faster _within_ each part (library, service)                   | (at the cost of) it taking longer to make change _across_ the entire codebase                                                        |
|                             |                                                                                            |                                                                                                                                      |
|                             |                                                                                            | 7. You choose to do _late integration_ (instead of continuous integration), so it only works for those parts are truly _independent_ |
|                             |                                                                                            |                                                                                                                                      |
|                             |                                                                                            | 8. Has a considerable **cost**, so only do it when the benefits outweigh the cost, which only happens at a **larger scale**          |
