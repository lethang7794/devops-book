# Chapter 9: How to Store Data: SQL, NoSQL, Queues, Warehouses, and File Stores

## Local Storage: Hard Drives

> [!IMPORTANT] Key takeaway #1
> Keep your applications stateless. Store all your data in dedicated data stores.

## Primary Data Store: Relational Databases

> [!IMPORTANT] Key takeaway #2
> Don’t roll your own data stores: always use mature, battle-tested, proven off-the-shelf solutions.

### Reading and Writing Data

> [!WARNING] Watch out for snakes: SQL has many dialects

In theory, SQL is a language standardized by ANSI and ISO that is the same across all relational databases. In practice, every relational database has its own dialect of SQL that is slightly different. In this blog post series, I’m focusing on SQL concepts that apply to all relational databases, but I had to test my code somewhere, so technically, these examples use the PostgreSQL dialect.

### ACID Transactions

### Schemas and Constraints

> [!IMPORTANT] Key takeaway #3
> Use relational databases as your primary data store (the source of truth), as they are secure, reliable, mature, and they support schemas, integrity constraints, foreign key relationships, joins, ACID transactions, and a flexible query language (SQL).

### Example: PostgreSQL, Lambda, and Schema Migrations

## Caching: Key-Value Stores and CDNs

### Key-Value Stores

> [!IMPORTANT] Key takeaway #4
> Use key-value stores to cache data, speeding up queries and reducing load on your primary data store.

### CDNs

> [!IMPORTANT] Key takeaway #5
> Use CDNs to cache static content, reducing latency for your users and reducing load on your servers.

## File Storage: File Servers and Object Stores

### File Servers

### Object Stores

> [!IMPORTANT] Key takeaway #6
> Use file servers and object stores to serve static content, allowing your app servers to focus on serving dynamic content.

### Example: Serving Files With S3 and CloudFront

> [!WARNING] Watch out for snakes: don’t upload files to S3 using OpenTofu in production

## Semi-Structured Data and Search: Document Stores

### Reading and Writing Data (Document Stores)

### ACID Transactions (Document Stores)

### Schemas and Constraints (Document Stores)

> [!IMPORTANT] Key takeaway #7
> Use document stores for semi-structured and non-uniform data, where you can’t define a schema ahead of time, or for search, when you need free-text search, faceted search, etc.

## Analytics: Columnar Databases

### Columnar Database Basics

### Analytics Use Cases

> [!IMPORTANT] Key takeaway #8
> Use columnar databases for time-series data, big data, fast data, data warehouses, and anywhere else you need to quickly perform aggregate operations on columns.

## Asynchronous Processing: Queues and Streams

### Message Queues

> [!IMPORTANT] Key takeaway #9
> Use message queues to run tasks in the background, with guarantees that tasks are completed and executed in a specific order.

### Event Streams

> [!IMPORTANT] Key takeaway #10
> Use event streams to build highly-scalable, decoupled, event-driven architectures.

## Scalability and Availability

### Relational Databases

> [!IMPORTANT] Key takeaway #11
> Use replication and partitioning to make relational databases more scalable and highly available.

### NoSQL and NewSQL Databases

> [!IMPORTANT] Key takeaway #12
> Use NoSQL and NewSQL databases when your scalability and availability requirements exceed what you can do with a relational database—but only if you can invest in the time and expertise of deploying and maintaining a distributed data store.

### Distributed Systems

## Backup and Recovery

### Backup Strategies

### Backup Best Practices

> [!IMPORTANT] Key takeaway #13
> Ensure your data stores are securely backed up to protect against data loss and data corruption, protect your backups, test your backup strategy regularly, and follow the 3-2-1 rule.

### Example: Backups and Read Replicas with PostgreSQL

## Conclusion

- Keep your applications stateless. Store all your data in dedicated data stores.

- Don’t roll your own data stores: always use mature, battle-tested, proven off-the-shelf solutions.

---

- Use relational databases as your primary data store (the source of truth), as they

  - are secure, reliable, mature
  - support schemas, integrity constraints, foreign key relationships, joins, ACID transactions, and a flexible query language (SQL).

  When it comes to data storage, boring is good, and you should [choose boring technologies].

- Only use other data stores if you have use cases that a relational database can’t handle:

  | Other data stores                | Use cases                                                     | ... benefit                                                           |
  | -------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- |
  | **Key-value stores**             | Cache data                                                    | - Speeding up queries                                                 |
  |                                  |                                                               | - Reducing load on your **primary data store**.                       |
  | **CDNs**                         | Cache static content                                          | - Reducing latency for your **users**                                 |
  |                                  |                                                               | - Reducing load on your **servers**.                                  |
  | **File servers & object stores** | Serve static content                                          | Allowing your app **servers** to focus on serving dynamic content.    |
  | **Document stores**              | For semi-structured & non-uniform data                        | Where you can’t define a schema ahead of time                         |
  |                                  | For search                                                    | When you need free-text search, faceted search...                     |
  | **Columnar databases**           | For time-series data, big data, fast data, data warehouses... | To quickly perform aggregate operations on columns.                   |
  | **Message queues**               | Run tasks in the background                                   | Guarantees that tasks are completed and executed in a specific order. |
  | **Event streams**                |                                                               | Build highly-scalable, decoupled, event-driven architectures.         |

---

- Use replication and partitioning to make relational databases more scalable and highly available.

- Use NoSQL and NewSQL databases when your scalability and availability requirements exceed what you can do with a relational database—but only if you can invest in the time and expertise of deploying and maintaining a distributed data store.

---

- Ensure your data stores are securely backed up to protect against data loss and data corruption, protect your backups, test your backup strategy regularly, and follow the 3-2-1 rule.

[choose boring technologies]: https://boringtechnology.club/
