# Chapter 8: How to Secure Communication, Storage, and Authentication

Data is one of the biggest asset of your company.

A secure networking is the first layer of defense for your company's data, (system & business secret).

But it's important to have more layers of defense for your data, via:

- **Secure communication**:

  Protect your data from unauthorized snooping, interference while it travels over the network, with:

  - Encryption-in-transit
  - Secure transport protocols: TLS, SSH, IPSec...

- **Secure storage**:

  Protect your data from unauthorized snooping, interference while it's in the storage, with:

  - Encryption-at-rest
  - Secrets management
  - Password storage
  - Key management

This chapter will walk you through a several hand-on examples about secure data:

- Encrypt data with AES, RSA
- Verify file integrity with SHA-256, HMAC, digital signatures
- Store secrets with AWS Secrets Manager
- Serve your apps over HTTPs, by setting up TLS certificates with Let's Encrypt

## Cryptography Primer

cryptography
: the study of how to protect data from adversaries (aka _bad actors_)

> [!WARNING]
> Don't confuse _cryptography_ with _crypto_, which these days typically refers to _cryptocurrency_.

- Cryptography aims to provide 3 key benefits - aka _CIA_:

  - **C**onfidentiality

    Data can be _seen_ only by **intended** parties.

  - **I**ntegrity

    Data can't be **unauthorized** _modified_.

  - **A**uthenticity

    Data are _communicated_ only between **intended** parties.

- Cryptography combines multiple disciplines: mathematics, computer science, information security, electrical engineering...

- If you're _not_ a professional, do _not_ invent your own cryptography.

  - > Anyone, from the most clueless amateur to the best cryptographer, can create an algorithm that he himself can’t break. It’s not even hard. What is hard is creating an algorithm that no one else can break, even after years of analysis.
    >
    > - Schneir's law

  - Cryptography isn't like other software:

    - For most softwares, you're dealing with
      - users with mildly engaged at best
      - minor bugs
    - For cryptography, you're dealing with
      - determined opponents who are doing everything to defeat you
      - any bug found by them can be completely catastrophic

  - After centuries of existence, the number of techniques, attacks, strategies, schemes, tricks in cryptography are exceeds what any one person - without extensive training - could conceive.

    e.g.

    - side-channel attacks, timing attacks, man-in-the-middle attacks, replay attacks, injection attacks, overflow attacks, padding attacks, bit-flipping attacks...
    - and [countless others](https://en.wikipedia.org/wiki/Category:Cryptographic_attacks)

    > [!TIP]
    > Some of these attacks are brilliant, some are hilarious, some are devious and many are entirely unexpected.

  - Just as all software, all cryptography has vulnerabilities, but only after years of extensive usage and attacks - those vulnerabilities are found and fixed.

> [!IMPORTANT] Key takeaway #1
>
> Don’t roll your own cryptography: always use mature, battle-tested, proven algorithms and implementations.

---

This section provides 2 foundational concepts of cryptography at a high level:

- Encryption
- Hashing

### Encryption

#### What is encryption

#### Three types of encryptions

##### Symmetric-key encryption

- AES
- ChaCha

##### Asymmetric-key encryption

- RSA
- Elliptic Curve Cryptography

##### Hybrid encryption

Advantages of hybrid encryption:

- Performance
- No reliance on out-of-band channels
- Forward secrecy

#### Example: Encryption and decryption with OpenSSL

### Hashing

#### What is hashing

#### Cryptography hashing functions

- Pre-image resistance
- Second pre-image resistance
- Collision resistance

#### Cryptographic hashing algorithms

- SHA-2 and SHA-3
- SHAKE and cSHAKE

#### Use cases of cryptographic hash functions

##### Verifying the integrity of messages and files

##### Message authentication codes (MAC)

Common MAC algorithms:

- HMAC
- KMAC

##### Authenticated encryption

##### Digital signatures

##### Password storage

#### Example: File integrity, HMAC, and signatures with OpenSSL

## Secure Storage

### Secrets Management

#### Two rules when working with secrets

> [!IMPORTANT] Key takeaway #2
>
> Do not store secrets as plaintext.

---

#### Three types of secrets

- Personal secrets
- Infrastructure secrets
- Customer secrets

#### How to avoid storing secrets

- Single-sign on (SSO)
- Third-party services
- Don't store the data at all

> [!IMPORTANT] Key takeaway #3
>
> Avoid storing secrets whenever possible by using SSO, 3rd party services, or just not storing the data at all.

#### Working with secrets

##### Working work personal secrets

- _Password manager_:

  - Standalone: 1Password, Bitwarden
  - OS built-in
  - Web-browser built-in

- What make a password strong?

  - Unique
  - Long
  - Hard-to-guess

- How to come-up with a _strong password_? What is Diceware?

> [!IMPORTANT] Key takeaway #4
>
> Protect personal secrets, such as passwords and credit card numbers, by storing them in a password manager.

- What make a good password manager?

  - Security practices
  - Reputation
  - Unique, randomly-generated passwords
  - Secure account access
  - Secure sharing with families and teams
  - Platform support

##### Working work infrastructure secrets

- Two kinds of secret store for infrastructure secrets:

  - Key management systems (KMS)
  - General-purpose secret store

- How to use a secret store for infrastructure secrets?

> [!IMPORTANT] Key takeaway #5
>
> Protect infrastructure secrets, such as database passwords and TLS certificates, by using a KMS and/or a general-purpose secret store.

- Why general-purpose secret store is becoming more popular?

  The benefits of centralization secret store?

  - Audit logging
  - Revoking & rotating secrets
  - On-demand & ephemeral secrets

##### Working work customer secrets

- How to store customer secrets (password)?

  - Store the hash of the password
  - Use specialized password hash functions
  - Use salt and pepper

> [!IMPORTANT] Key takeaway #6
>
> Never store user passwords (encrypted or otherwise). Instead, use a password hash function to compute a hash of each password with a salt and pepper, and store those hash values.

### Encryption at Rest

- Why stored data is a tempting target for attackers?

  - Many copies of the data
  - Long time frames, little monitoring

- Three level of encryption-at-rest

  - Full-disk encryption

  - Data store encryption

  - Application-level encryption

> [!IMPORTANT] Key takeaway #7
>
> You can encrypt data at rest using full-disk encryption, data store encryption, and application-level encryption.

## Secure Communication

### Encryption-in-transit

### Common protocols for encryption-in-transit

- TLS
- SSH
- IPSec

### Transport Layer Security (TLS)

#### How TLS work

- Handshake
  - Negotiation
  - Authentication
  - Key exchange
- Exchange messages

---

- Chain of trust

  - Root certificate authorities (CAs)

- How to get a TLS certificate (for a website) from a CA?

- How the TLS certificate (for your website) is used?

> [!IMPORTANT] Key takeaway #8
>
> You can encrypt data in transit using TLS. You get a TLS certificate from a certificate authority.

---

- Public key infrastructure (PKI)
  - Web PKI
  - Private PKI

### Example: HTTPS with Let's Encrypt and AWS Secrets Manager

- Get a TLS certificate from LetsEncrypt

- Store the TLS certificate in AWS Secrets Manager

- Deploy EC2 instances that use the TLS certificate

### Get your hands dirty: Securing communications and storage

### End-to-End Encryption

#### What is End-to-End Encryption

> [!IMPORTANT] Key takeaway #9
>
> Use end-to-end encryption to protect data so that no one other than the intended recipients can see it—not even the software provider.

---

#### Working with End-to-End Encryption

##### What encryption key do you use for E2E encryption?

##### What data needs to be E2E encrypted and what doesn’t?

##### How do you establish trust with E2E-encrypted software?

- The software vendor could be lying
- The software vendor could have back-doors
- The software could have bugs

## Conclusion

- Key takeaways for secure data:

  | You ...                       | ... type of data                                  | Example                            | Note                                                                                             |
  | ----------------------------- | ------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
  | Don't roll your own           | cryptography                                      |                                    | always use mature, battle-tested, proven algorithms & implementations.                           |
  |                               |                                                   |                                    |                                                                                                  |
  | Avoid storing                 | secrets                                           |                                    | by using SSO, 3rd-party services, or not storing it at all                                       |
  | If you can't avoid storing    | secrets                                           |                                    | do not store them as plaintext                                                                   |
  | Protect                       | - personal secrets                                | password, credit card              | by using a password manager                                                                      |
  | Protect                       | - infrastructure secrets                          | TLS certificate, database password | by using a KMS and/or a general-purpose secret store                                             |
  | Never store                   | - passwords                                       | (encrypted or unencrypted)         | instead use a hash function (with a salt & pepper), and store the hash values                    |
  |                               |                                                   |                                    |                                                                                                  |
  | Encrypt                       | data-at-rest                                      |                                    | using:<br/>- full-disk encryption<br/>- data store encryption<br/>- application-level encryption |
  | Encrypt                       | data-in-transit                                   |                                    | using TLS (that you get from a certificate authority - CA)                                       |
  | Use end-to-end encryption for | data that only the intended recipients can see it | Signal messages                    | Not even you, NSA, or FBI can see it.                                                            |

- A cheat sheet of how to handle common cryptographic use cases

  | Use case                                                               | Solution                                     | Example recommended tools                   |
  | ---------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------- |
  | Store personal secrets (e.g., passwords)                               | Use a password manager                       | [1Password], [Bitwarden]                    |
  | Store infrastructure secrets (e.g., TLS certificate)                   | Use a secret store or KMS                    | [OpenBao], [AWS Secrets Manager], [AWS KMS] |
  | Store customer passwords                                               | Store the hash of (password + salt + pepper) | [Argon2id], [scrypt], [bcrypt]              |
  |                                                                        |                                              |                                             |
  | Encrypt data at rest                                                   | Use authenticated encryption                 | [AES-GCM], [ChaCha20-Poly1305]              |
  | Encrypt data in transit over the public Internet                       | Use TLS with a certificate from a public CA  | [Let's Encrypt], [AWS Certificate Manager]  |
  | Encrypt data in transit in a private network                           | Use TLS with a certificate from a private CA | [Istio], [Linkerd], [OpenBao], [step-ca]    |
  |                                                                        |                                              |                                             |
  | Validate data integrity (e.g., no one tampered with a file)            | Use a cryptographic hash function            | [SHA-2], [SHA-3]                            |
  | Validate data integrity and authenticity (e.g., no one faked a cookie) | Use a MAC                                    | [HMAC], [KMAC]                              |

[1Password]: https://1password.com/
[Bitwarden]: https://bitwarden.com/
[OpenBao]: https://openbao.org/
[AWS Secrets Manager]: https://aws.amazon.com/secrets-manager/
[AWS KMS]: https://aws.amazon.com/kms/
[Argon2id]: https://en.wikipedia.org/wiki/Argon2
[scrypt]: https://en.wikipedia.org/wiki/Scrypt
[bcrypt]: https://en.wikipedia.org/wiki/Bcrypt
[AES-GCM]: https://en.wikipedia.org/wiki/Galois/Counter_Mode
[ChaCha20-Poly1305]: https://en.wikipedia.org/wiki/ChaCha20-Poly1305
[Let's Encrypt]: https://letsencrypt.org/
[AWS Certificate Manager]: https://aws.amazon.com/certificate-manager/
[Istio]: https://istio.io/latest/about/service-mesh/
[Linkerd]: https://linkerd.io/
[step-ca]: https://smallstep.com/docs/step-ca//fundamentals-of-devops
[SHA-2]: https://en.wikipedia.org/wiki/SHA-2
[SHA-3]: https://en.wikipedia.org/wiki/SHA-3
[HMAC]: https://en.wikipedia.org/wiki/HMAC
[KMAC]: https://www.nist.gov/publications/sha-3-derived-functions-cshake-kmac-tuplehash-and-parallelhash
