# Chapter 9: How to Store Data: SQL, NoSQL, Queues, Warehouses, and File Stores

- Almost all software needs to store data.

- For most companies, **data** is one of the _most valuable, longest-lived assets_.

- There are **many types** of data and many **different ways to store** them:

  | Type of data / data store                                                               | How to store?                                                                                                                         |
  | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
  | [_Local_ storage](#local-storage-hard-drives)                                           | If your application needs to store data locally, you write it to a hard drive.                                                        |
  | [_Primary data_ store](#primary-data-store-relational-databases)                        | The general-purpose workhorse and the source of truth for most companies is the **relational database**.                              |
  | [**Caching**](#caching-key-value-stores-and-cdns)                                       | If you need to speed up data retrieval, you can cache responses in **key-value stores** and **content distribution networks (CDNs)**. |
  | [**File storage**](#file-storage-file-servers-and-object-stores)                        | To store and serve files, you turn to **file servers** & **object stores**.                                                           |
  | [**Semi-structured data and search**](#semi-structured-data-and-search-document-stores) | If you need to store non-uniform data or to search and filter that data, you turn to a **document store**.                            |
  | [**Analytics**](#analytics-columnar-databases)                                          | To extract insights from your data, you turn to **columnar databases**.                                                               |
  | [_Asynchronous_ processing](#asynchronous-processing-queues-and-streams)                | To process data and events in the background, and to decouple your systems, you turn to **queues** and **streams**.                   |

- To meet [_scalability_ & _availability_](#scalability-and-availability) requirements, you use **partitioning** & **_replication_**.

- To ensure your data isn’t lost in a [_disaster_](#backup-and-recovery) scenario, you use **snapshots**, **continuous backups**, and **_replication_**.

---

This chapter will walk you through various hands-on examples:

- [deploying a PostgreSQL database, automating schema migrations](#example-postgresql-lambda-and-schema-migrations)
- [serving files from S3, and using CloudFront as a CDN](#example-serving-files-with-s3-and-cloudfront)
- [configuring backups and replication](#example-backups-and-read-replicas-with-postgresql)

## Local Storage: Hard Drives

### The challenges of storing data using custom file format

- **Querying the data**

  It's hard to extract insights from data.

- **Evolving the data format**

  It's hard to evolve the data format without incompatible issues with older files.

- **Handling concurrent access to the data**

  It's impossible to reading/writing the data from different computers.

> [!WARNING]
> Storing data using custom file format directly on local storages is usually a bad idea if the software requirements need to be changed.

### Stateful and stateless software

_stateful_ software
: Software that reads & writes persistent data to the _local_ **hard drive**.
: - Use custom format for data, stored them as files in local hard drive.

_stateless_ software
: Software that does not rely on persistent data on the local hard drive.
: Persistent data is stored in a _dedicated_ **data store**.
: - The only _stateful_ system in your software architecture.
: Easier to deploy, update, scale, and maintain.

> [!NOTE]
> Both type of software can still write _ephemeral data_[^1] - e.g. log files - to local hard drives.

> [!IMPORTANT] Key takeaway #1
> Keep your applications stateless. Store all your data in dedicated data stores.

### Types of hard drives

| **Storage Type**                                             | Where?                                           | **Description**                                                                            | **Examples**                                                                                                                | Protocols / Technologies                                                                              | **Pros**                                                                                             | **Cons**                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **_Physical_ Hard Drives**                                   | On-premises                                      | Hard drives physically attached to **on-prem servers**.                                    | _Magnetic_, _SSD_..                                                                                                         | - _SATA_, _NVMe_...<br/>- _RAID_                                                                      | Direct control, fast access                                                                          | Requires on-prem infrastructure                                                            |
| **_Network-attached_ Hard Drives**                           | Cloud                                            | Hard drives attached to **cloud VMs** over the network.                                    | [Amazon EBS] [^3]<br/>[Google Persistent Disk]<br/>[Azure Disk Storage]                                                     |                                                                                                       | Detachable, re-attachable[^4] for VMs (for stateful apps)                                            | Higher latency compared to local drives                                                    |
| **_Shared_ Hard Drives**                                     | Cloud, on-premises                               | Single drive shared among **multiple servers** for shared access.                          | [Amazon EFS] [^2]<br/>[Google Cloud Filestore]<br/>[Azure Files]                                                            | _Network File System (NFS)_<br/>_Common Internet File System (CIFS)_<br/>_Server Message Block (SMB)_ | Shared access[^5] for multiple servers                                                               | Higher latency compared to local drives                                                    |
| **Volumes in<br/>_Container_ Orchestration**[^8]             | Cloud, on-premises                               | _Persistent volumes_[^6] for data storage in **container** environments.                   | Amazon EBS (AWS EKS)<br/>Google Persistent Disk (GKE)<br/>Azure Disk Storage (AKS)</br></br>Local disk, e.g. Docker Desktop |                                                                                                       | Data persists[^6] even when containers are redeployed                                                |                                                                                            |
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_                                                        | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_                  | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

> [!TIP]
> Whether you're using a physical hard drives, or any other types of storages, all look and behave exactly like a local, physically-attached hard drive:
>
> - To your software, it looks like any local file system that you can read from and write to.

> [!WARNING] Don't run data stores in containers
>
> - You’re _one config mistake from losing_ your company’s data - the most valuable asset.
>
>   Containers are designed to be easy to distribute, scale, and throw away (hence the default of ephemeral disks), which
>
>   - is great fit for stateless apps and local development
>   - but is not a good fit for data stores in production
>
> - Using persistent volume for data store is _not easy_:
>
>   - Persistent volume
>     - needs to support varies widely amongst orchestration tools
>     - is generally less mature than other orchestration features
>   - Integration with tooling can be trickier (if that tooling wasn’t designed for containers)
>   - Support from database vendors may be trickier (not all of them support containerized deployments).

## Primary Data Store: Relational Databases

relational database
: The most _dominant_ data storage solution for decades:
: Flexible
: - Handle a remarkably wide range of use cases[^11]
: - Remarkable scalability & availability
: Reliable
: - Ensure data integrity & consistency
: - Store data efficiently (temporally & spatially)
: - Strong security model
: The most _mature_[^9] data storage technology available
: - Massive ecosystem of tools, vendors, expert developers

> [!NOTE]
> Most companies use relational databases as their _primary data stores_ — the _source of truth_ for their data.

---

Just as cryptography:

- always use mature, battle-tested, proven off-the-shelf solutions.

- Don't roll out your own data store, except if you have:
  - use cases that all existing data stores can't handle, which only happens at massive scale, e.g. Google, Facebook, Twitter
  - at least a decade[^10] to spare

> [!IMPORTANT] Key takeaway #2
> Don’t roll your own data stores: always use mature, battle-tested, proven off-the-shelf solutions.

### Writing & Reading Data

A relational database

- stores data in _tables_, where
  - each item is stored in a _row_,

---

table
: represents a collection of related items

row
: represents an item

---

> [!NOTE]
> Each row in a table has the same _columns_

---

e.g. A website for a bank store data about the customers

- in a `customers` table, where

- each row represents one customer as a tuple of `id`, `name`, `date_of_birth`, and `balance`

  | **id** | **name**       | **date_of_birth** | **balance** |
  | ------ | -------------- | ----------------- | ----------- |
  | 1      | Brian Kim      | 1948-09-23        | 1500        |
  | 2      | Karen Johnson  | 1989-11-18        | 4853        |
  | 3      | Wade Feinstein | 1965-02-29        | 2150        |

---

To interact with a relational database, you use a language called _Structured Query Language (SQL)_.

- To _write_ data in to a table, you use the `INSERT INTO` statement

  ```sql
  INSERT INTO <table> ( <columns> )
  VALUES              ( <values>  );
  ```

  e.g.

  - ```sql
    INSERT INTO customers (name, date_of_birth, balance)
                   VALUES ('Brian Kim', '1948-09-23', 1500);

    INSERT INTO customers (name, date_of_birth, balance)
                   VALUES ('Karen Johnson', '1989-11-18', 4853);

    INSERT INTO customers (name, date_of_birth, balance)
                   VALUES ('Wade Feinstein', '1965-02-25', 2150);
    ```

  - (This example assume the schema is already exists)

  > [!NOTE]
  > Relational databases require you to define a _schema_ to describe the structure of each table before you can write any data to that table (as in [Schemas and Constraints](#schemas-and-constraints)).

- To _read_ all data from a table, you use `SELECT` statement to form an SQL _query_.

  ```sql
  SELECT <columns> FROM <table>;
  ```

  > [!NOTE]
  > Use the wildcard `*` for all columns

  e.g.

  - ```sql
    SELECT * FROM customers;
    ```

    ```plaintext
     id |      name      | date_of_birth | balance
    ----+----------------+---------------+---------
      1 | Brian Kim      | 1948-09-23    |    1500
      2 | Karen Johnson  | 1989-11-18    |    4853
      3 | Wade Feinstein | 1965-02-25    |    2150
    ```

- To read and keep only some of the data (aka _filtering query_), you use `SELECT` statement with a `WHERE` clause:

  ```sql
  SELECT <columns> FROM <table> WHERE <conditions>;
  ```

  e.g.

  - ```sql
    SELECT * FROM customers WHERE date_of_birth > '1950-12-31';
    ```

    ```plaintext
     id |      name      | date_of_birth | balance
    ----+----------------+---------------+---------
      2 | Karen Johnson  | 1989-11-18    |    4853
      3 | Wade Feinstein | 1965-02-25    |    2150
    ```

> [!TIP]
> Relational databases allow query data in countless ways:
>
> - `WHERE` to filter data
> - `ORDER BY` to sort data
> - `GROUP BY` to group data
> - `JOIN` to query data from multiple tables
> - `COUNT`, `SUM`, `AVG`, and a variety of other aggregate functions to perform calculations on your data,
> - _indices_ to make queries faster,
> - and much more.

---

> [!WARNING] Watch out for snakes: SQL has many dialects
> SQL:
>
> - In theory, is a language standardized by ANSI and ISO that is the same across all relational databases.
> - In practice, is a slightly different dialect of SQL for each every relational database .

> [!NOTE]
> This books focuses on SQL concepts that apply to all relational databases, but technically, the examples use the PostgreSQL dialect.

### ACID Transactions

transaction
: a set of _coherent operations_ that should be performed as a **unit**

In relational databases, transactions must meet the following four properties:

- | Property    | Description                                                                                                           | Note                                                                                                   |
  | ----------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
  | Atomicity   | _Either_ **all** the operations in the transaction happen, or **none** of them do.                                    | Partial successes or partial failures are not allowed.                                                 |
  | Consistency | The operations always leave the data in a state that is **valid**                                                     | Valid state is a state that according to all the rules and constraints you’ve defined in the database. |
  | Isolation   | Even though many transactions may be happening _concurrently_, the database should end up in the exact **same** state | As if the transactions had happened sequentially (in any orders).                                      |
  | Durability  | Once a transaction has _completed_, it is recorded to **persistent** storage (typically, to a hard drive)             | It isn’t lost, even in the case of a system failure.                                                   |

- These 4 properties form the acronym _ACID_, which is one of the defining property of a relational database.

e.g.

- Deduct $100 from every customer (transaction across single statement)

  ```sql
  UPDATE customers
  SET balance = balance - 100;
  ```

  For a relational database, this statement will be execute to all customers in a single ACID transaction:

  - either the transaction will complete successfully, and all customers will end up with $100 less,
  - or no customers will be affected at all.

  > [!TIP]
  > For a data store that doesn't support ACID transactions:
  >
  > - It would be possible for those data stores to crash part way through this transaction
  > - The data end up with some customers with $100 less and some unaffected (No atomicity)

- Transfer $100 from customer 1 to customer 2 (transaction across multiple statements)

  ```sql
  START TRANSACTION;
    UPDATE customers
    SET balance = balance - 100
    WHERE id = 1;

    UPDATE customers
    SET balance = balance + 100
    WHERE id = 2;
  COMMIT;
  ```

  For a relational database, all the statements between `START TRANSACTION` and `COMMIT` will execute as a single ACID transaction, ensuring that:

  - one account has the balance decreased by $100, and the other increased by $100
  - or neither account will be affected at all.

  > [!TIP]
  > For a data store that doesn't support ACID transactions, the data could end up in an in-between state that is inconsistent:
  >
  > e.g.
  >
  > - The first statement completes, subtracting $100.
  > - Then the data store crashes before the second statement runs, and as a result, the $100 simply vanishes into thin air (No atomicity)

### Schemas and Constraints

- Relational databases require you to define a _schema_ for each table before you can read and write data to that table.

- To define a schema, you use `CREATE TABLE` statement

  ```sql
  CREATE TABLE <table> (
     <colunm_name>   <column_type>,
     <...>
  );
  ```

  e.g.

  - Create a table called `customers` with columns called `id`, `name`, `date_of_birth`, and `balance`

    ```sql
    CREATE TABLE customers (
      id            SERIAL PRIMARY KEY,
      name          VARCHAR(128),
      date_of_birth DATE,
      balance       INT
    );
    ```

---

- The schema includes a number of _integrity constraints_ to enforce business rules:

  - **Domain constraints**:

    _Domain constraints_ limit what _kind of data_ you can store in the table.

    e.g.

    - Each column has a _type_, such as `INT`, `VARCHAR`, and `DATE`, so the database will prevent you from inserting data of the wrong type

    - The `id` column specifies `SERIAL`, which is a _pseudo type_ (an _alias_) that gives you a convenient way to capture three domain constraints:
      - first, it sets the type of the id column to `INT`
      - second, it adds a `NOT NULL` constraint[^12], so the database will not allow you to insert a row which is missing a value for this column
      - third, it sets the _default value_ for this column to an _automatically-incrementing sequence_[^13].

  - **Key constraints**

    A _primary key_ is a column or set of columns that can be used to _uniquely_ identify each row in a table

    e.g.

    - The `id` column specifies `PRIMARY KEY`, which means this column is the primary key for the table, so the database will ensure that every row has a different value for this column.

  - **Foreign key constraints**

    A _foreign key constraint_ is where a column in one table can contain values that are _references_ to a column in **another table**.

    e.g. Bank customers could have more than one account, each with their own balance,

    - Instead of having a single `balance` column in the `customers` table
    - You could create a second table called `accounts`, where each row represents one account

      ```sql
      CREATE TABLE accounts (
          account_id      SERIAL PRIMARY KEY,          (1)
          account_type    VARCHAR(20),                 (2)
          balance         INT,                         (3)
          customer_id     INT REFERENCES customers(id) (4)
      );
      ```

      The `accounts` table has 4 columns:

      - 1: A unique ID for each **account** (the primary key).
      - 2: The `account_type`: e.g., checking or savings.
      - 3: The `balance` for the account.
      - 4: The ID of the **customer** that owns this account.

        > [!NOTE]
        > The `REFERENCES` keyword labels this column as a **foreign key** into the `id` column of the `customers` table.
        >
        > - This will prevent you from accidentally inserting a row into the `accounts` table that has an _invalid_ customer ID (i.e., one that isn’t in the `customers` table).

    > [!TIP]
    > Foreign key constraint
    >
    > - is one of the defining characteristics of relational databases, as they
    >
    >   - allow you to define and enforce **relationships between tables**.
    >
    >   👉 This is what the "_relational_" in "_relational_ database" refers to.
    >
    > - is critical in maintaining the _referential integrity_ of your data
    >
    >   👉 another major reason to use a relational database as your primary source of truth.

> [!IMPORTANT] Key takeaway #3
> Use relational databases as your primary data store (the source of truth), as
>
> - they are
>
>   - reliable
>   - secure
>   - mature
>
> - they support
>
>   - schemas
>   - integrity constraints
>   - foreign key relationships
>   - joins
>   - ACID transactions
>   - and a flexible query language (SQL).

#### Schema modifications and migrations

To modify the schema for existing tables, you can use `ALTER TABLE`

> [!WARNING]
> You should be careful when modifying a schema, or you will run into backward compatibility issues.

---

When use have a lot of modification to the schema, you can:

1. Manage the schemas manually

   - Connecting directly to the database
   - Executing `CREATE TABLE`, `ALTER TABLE` by hand

2. Manage the schemas as code using a _schema migration tool_, such as [Flyway], [Liquibase], [Atlas], [Bytebase], [Alembic], [migrate], [Squitch], [ActiveRecord], [Sequel], [Knex.js], [GORM].

---

When using a schema migration tool:

- You define

  - your initial schemas
  - all the modifications as code, in an ordered series of _migration files_ that you check into version control.

    e.g.

    - Flyway uses standard SQL in `.sql` files

      ```plaintext
      v1_create_customers.sql
      v2_create_accounts.sql
      v3_update_customers.sql
      ```

    - Knex.js uses a JavaScript DSL in `.js` files

      ```plaintext
      20240825_create_customers.js
      20240827_create_accounts.js
      20240905_update_customers.js
      ```

- You apply these migration files using the schema migration tool, which keeps track of

  - which of your migration files have already been applied, and
  - which haven’t

  so no matter

  - what state your database is in, or
  - how many times you run the migration tool,

  you can be confident your database will end up with the desired schema.

---

As you make changes to your app, new versions of the app code will rely on new versions of your database schema.

To ensure these versions are automatically deployed to each environment, you will need to integrate the schema migration tool into your CI/CD pipeline

The schema migration tools can be run:

1. As part of app's boot code

   Advantages:

   - This will works in any environments:

     - shared environments, e.g. `dev`, `stage`, `prod`
     - or any developer's local environment

   - The migration are constantly being tested.

   Disadvantages:

   - The migrations sometimes take a long time, which cause the app boot slowly, which might be a big problem:

     - some orchestration tools may redeploy the app before the migration can finish.

     - for serverless apps because of the cold starts.

2. As a separate strep in deployment pipeline, just before you deploy the app

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

### Reading and Writing Data -

### ACID Transactions -

### Schemas and Constraints -

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
[Amazon EBS]: https://aws.amazon.com/ebs
[Google Persistent Disk]: https://cloud.google.com/persistent-disk?hl=en
[Azure Disk Storage]: https://azure.microsoft.com/en-us/products/storage/disks
[Amazon EFS]: https://aws.amazon.com/efs
[Google Cloud Filestore]: https://cloud.google.com/filestore?hl=en
[Azure Files]: https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction
[Flyway]: https://www.red-gate.com/products/flyway/community/
[Liquibase]: https://www.liquibase.com/
[Atlas]: https://atlasgo.io/
[Bytebase]: https://www.bytebase.com/
[Alembic]: https://alembic.sqlalchemy.org/en/latest/
[migrate]: https://github.com/golang-migrate/migrate
[Squitch]: https://sqitch.org/
[ActiveRecord]: https://guides.rubyonrails.org/active_record_basics.html
[Sequel]: https://sequel.jeremyevans.net/
[Knex.js]: https://knexjs.org/
[GORM]: https://gorm.io/

[^1]: Ephemeral data is data that is OK to lose if that server is replaced.
[^2]: Elastic File System
[^3]: Elastic Block System
[^4]: When using network-attached drives, you can use software (e.g., OpenTofu, Pulumi) to detach and reattach them when replacing VMs (e.g., as part of a deployment)
[^5]: e.g. With file serving, it can be advantageous to share a single network-attached hard drive amongst multiple servers, so they can all read from and write to the same disk.
[^6]:
    By default, the file system of a container is considered _ephemeral_, and any data you write to it will be lost when that container is redeployed or replaced.

    - If you need to persist data to disk, you need to configure your orchestration tool to create a _persistent volume_ and mount it at a specific path within the container.
    - The software within that container can then write to that path just like it’s a normal local hard drive, and the data in that persistent volume will be retained even if the container is redeployed or replaced.

[^8]: Under the hood, the orchestration tool may handle the persistent volume differently in different deployment environments.
[^9]: Relational databases

    - have been in development for 25-50 years

      - [Oracle](https://www.oracle.com/ie/database/) (1979)
      - [MS SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (1989)
      - [MySQL](https://www.mysql.com/) (1995)
      - [PostgreSQL](https://www.mysql.com/) (1996, though it evolved from a codebase developed in the 1970s)
      - [SQLite](https://www.sqlite.org/) (2000)

    - are still in active development today.

[^10]: [Good software takes _at least_ a decade to develop](https://www.joelonsoftware.com/2001/07/21/good-software-takes-ten-years-get-used-to-it/)
[^11]:
    Relational databases are flexible enough to handle a remarkably wide variety of use cases, from being

    - _embedded_ directly within your application,

      e.g. SQLite can run in-process or even in a browser

    - all the way up to clusters of **thousands of servers** that store **petabytes** of data.

[^12]: <https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-NOT-NULL>
[^13]: The _automatically-incrementing sequence_ will generate a monotonically increasing ID that is guaranteed to be unique (even in the face of concurrent inserts) for each new row.
