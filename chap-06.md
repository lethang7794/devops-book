# Chapter 6: How to Work with Multiple Teams and Environments

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
