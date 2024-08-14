# Chapter 6: How to Work with Multiple Teams and Environments

CI/CD will allow developers work together efficiently and safety, but as your company grows, there are other type of problems:

- From _outside_ world: more **users** (more traffic/data/laws/regulations)
- From _inside_ your company: more **developers/teams/products** 👉 It's harder to code/test/deploy without hitting lots of bugs/outages/bottlenecks.

These problems are problems of _scale_, good problems to have, which indicates your business is becoming more successful.

The most common approach to solve these problem of scale is _divide and conquer_:

- **Break up your deployments**: into multiple separated, isolated **environments**.
- **Break up your codebase**: into multiple **libraries**, **(micro)services**
## Breaking Up Your Deployments

### Why Deploy Across Multiple Environments

#### Isolating tests

#### Isolating products & teams

#### Reducing latency

#### Complying with local laws & regulations

#### Increasing resiliency

### How to Set Up Multiple Environments

#### Logical environments

#### Separate servers

#### Separate networks

#### Separate accounts

#### Separate data centers in the same geographical region

#### Separate data centers in different geographical regions

### Challenges with Multiple Environments

#### Increased operational overhead

#### Increased data storage complexity

#### Increased application configuration complexity

- Performance settings
- Security settings
- Networking settings
- Service discovery settings
- Feature settings

---

2 methods of configuring application

- At build time: configuration files checked into version control
- At run time: configuration data read from a data store

### Example: Set Up Multiple AWS Accounts

- Create child accounts
- Access your child accounts
- Deploy into your child accounts
- Use different configurations for different environments
- Close your child accounts

## Breaking Up Your Codebase

### Why Break Up Your Codebase

#### Managing complexity

#### Isolating products and teams

#### Handling different scaling requirements

#### Using different programming languages

### How to Break Up Your Codebase

#### Breaking a codebase into multiple libraries

#### Breaking a codebase into multiple services

### Challenges with Breaking Up Your Codebase

#### Challenges with backward compatibility

#### Challenges with global changes

#### Challenges with where to split the code

#### Challenges with testing and integration

#### Dependency hell

#### Operational overhead

#### Dependency overhead

#### Debugging overhead

#### Infrastructure overhead

#### Performance overhead

#### Distributed system complexities

### Example: Deploy Microservices in Kubernetes

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
