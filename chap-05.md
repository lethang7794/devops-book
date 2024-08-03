# Chapter 5: How to Set Up Continuous Integration (CI) and Continuous Delivery (CD)

## Continuous Integration (CI)

Late Integration vs Continuous Integration

> [!IMPORTANT]
> Key takeaway #1
> Ensure all developers merge all their work together on a regular basis: typically daily or multiple times per day.

### Dealing with Merge Conflicts

### Preventing Breakages with Self-Testing Builds

> [!IMPORTANT]
> Key takeaway #2
> Use a self-testing build after every commit to ensure your code is always in a working and deployable state.

### Making Large Changes

> [!IMPORTANT]
> Key takeaway #3
> Use branch by abstraction and feature toggles to make large-scale changes while still merging your work on a regular basis.

#### Branch by abstraction

#### Feature toggles

##### Feature toggle service

- Store a feature toggle mapping
- Look up feature toggles programmatically
- Update feature toggles without having to change code

### Example: Run Automated Tests for Apps in GitHub Actions

### Get your hands dirty: Run automated app tests in CI

To help catch bugs, update the GitHub Actions workflow to run a JavaScript linter, such as JSLint or ESLint, after every commit.

To help keep your code consistently formatted, update the GitHub Actions workflow to run a code formatter, such as Prettier, after every commit.

Run both the linter and code formatter as a precommit hook, so these checks run on your own computer before you can make a commit. You may wish to use the pre-commit framework to manage your precommit hooks.

### Machine User Credentials and Automatically-Provisioned Credentials

> [!IMPORTANT]
> Key takeaway #4
> Use machine user credentials or automatically-provisioned credentials to authenticate from a CI server or other automations.

#### Machine user credentials

#### Automatically-provisioned credentials

### Example: Configure OIDC with AWS and GitHub Actions

### Example: Run Automated Tests for Infrastructure in GitHub Actions

### Get your hands dirty: Run automated infrastructure tests in CI

To help keep your code consistently formatted, update the GitHub Actions workflow to run a code formatter, such as `tofu fmt`, after every commit.

## Continuous Delivery (CD)

### Continuous Delivery and Continuous Deployment

> [!IMPORTANT]
> Key takeaway #5
> Ensure you can deploy to production at any time in a manner that is fast, reliable, and sustainable.

### Deployment Strategies

#### Downtime deployment

#### Rolling deployment without replacement

#### Rolling deployment with replacement

#### Blue-green deployment

#### Canary deployment

#### Feature toggle deployment

#### Promotion deployment

#### Infrastructure deployment

### Deployment Pipelines

#### Example: Configure an automated deployment pipeline in GitHub Actions

#### Example: Use a remote backend for OpenTofu state

#### Get your hands dirty: Terragrunt

If you’re like me, you’re probably annoyed by all the copy/paste you need to do with these backend configurations. Unfortunately, OpenTofu does not support using variables or any other kind of logic in backend blocks, so some amount of copy/paste is necessary. However, you can try out one of the following approaches to significantly reduce the code duplication:

- Partial backend configuration
- Terragrunt

#### Example: Add IAM roles for infrastructure deployments in GitHub Actions

#### Example: Define a pipeline for infrastructure deployments

### Deployment pipeline best practices

#### Automate all the steps that can be automated

#### Deploy only from a deployment server

#### Protect the deployment server

## Conclusion

Automating your entire SDLC through the use of CI/CD:

- CI: Ensure all developers _merge_ all their work together on a regular basis: typically **daily** or multiple times per day.

  - Use a **self-testing build** after every commit to ensure your code is always in a working and **deployable state**.

  - Use **branch by abstraction** and **feature toggles** to _make large-scale changes_ while still merging your work on a regular basis.

- Security: Use machine user credentials or automatically-provisioned credentials to _authenticate_ from a CI server or other automations.

- CD: Ensure you can _deploy_ to production **at any time** in a manner that is fast, reliable, and sustainable.
