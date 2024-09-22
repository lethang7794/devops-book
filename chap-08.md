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

### Encryption

### Hashing

## Secure Storage

### Secrets Management

### Encryption at Rest

## Secure Communication

### Transport Layer Security (TLS)

### Example: HTTPS with LetsEncrypt and AWS Secrets Manager

### End-to-End Encryption

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
