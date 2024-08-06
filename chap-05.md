# Chapter 5: How to Set Up Continuous Integration (CI) and Continuous Delivery (CD)

## Continuous Integration (CI)

### Late Integration vs Continuous Integration

late integration
: Come up with a _final_ design for all the components of the system
: - Have each team works on the components in _isolated_ until it's _finished_
: When all components are done, assemble at the _same time_.

continuous integration (CI)
: Come up with an initial design fo all the components of the system
: - Have each team works on the components
: - As teams make progress, they regularly test each component will all the other components & update the design (if there are any problems)
: As components are completed, assemble _incrementally_

#### The problem with late integration

With late integration, there will a lot of conflicts and design problems:

- What if there are problems when integration between components of 2 teams, which teams should solve that problem?
- If the design has problems, how to go back and fix things?

---

In software development, late integration is

- developers work in totally isolated _feature branches_ for weeks or months at a time.
- when a release rolls around, these features branches are all merged to the release branch.

When you don't merge your code together for a long time, you end up with a lot of _merge conflicts_, e.g.

- 2 teams modified the same file in _incompatible_ ways:
  - 1 team made changes in a file, another team deleted it
  - 1 team - after a giant refactor - remove all usages of a deprecated service; another teams introduce new usages for that services...

All these conflicts after resolved may still leads to bugs, problems that take days/weeks to stabilized. And the release process turned into a nightmare.

#### Continuous integration and its benefits

In software development, _continuous integration_ is:

- developers merge their work together on a very regular basic: daily (or multiple times per day)

which will

- exposes problems with these works early in the process
- allows developers to make improvements incrementally (before any problems gone too far)

> [!IMPORTANT]
> Key takeaway #1
> Ensure all developers merge all their work together on a regular basis: typically daily or multiple times per day.

#### Continuous integration and trunk-based development

trunk-based development
: developers collaboration on a single long-live branches - e.g. `main`, `master`, `trunk`
: developers works on short-live branches; and open pull requests to merge them back into the shared branch on a regular basis

Trunk-based development is the most common way to implement continuous integration (CI)

> [!NOTE]
> You might think having all developers work on a single branch (`main`) have a problem with scaling,
>
> - but in fact, it might be the only way to scale.
>
> e.g. By using trunk-based development
>
> - LinkedIn scale from 100 developers to 1000.
> - Google scale to tens of thousands of developers, with 2+ billion lines of code, 86TB of source data, 40000 commits per day.

### Three questions about continuous integration and trunk-based development

1. Wouldn’t you have **merge conflicts** _all the time_?
2. Wouldn’t the **build** always be _broken_?
3. How do you make **large changes** that take weeks or months?

### Dealing with Merge Conflicts

> [!NOTE]
> With late integration (and long-live feature branches), resolving merge conflicts
>
> - occurs right before a release
> - is a painful work that you only need to deal with once every few weeks/months.
>
> But with continuous integration (and trunk-based development), you merge your code every day, so you need to resolve conflicts every day? So you need to do the painful work every day?

- If your branches are short-live, the odds of merge conflicts are much lower.
- Even if there are a merge conflicts, it's much easier to resolve them (if you merge regularly).

> [!TIP]
> Merge conflicts are unavoidable:
>
> - (Don't try to avoid merge conflicts).
> - Make them easy to be done by do them more often.

### Preventing Breakages with Self-Testing Builds

- CI (and trunk-based development) is always used with a _self-testing build_, which runs automated tests after every commit.

  For any commit on any branch,

  - every time a developer opens a pull request (PR) to merge a branch to `main`
    - **automated tests** are run (against their branch)
      - test results are shown directly in the PR UI.

> [!TIP]
> By having a self-testing build after every commit:
>
> - Code doesn't pass your test suite doesn't get merged to `main`.
> - For code does pass you test suite, but cause a breakage:
>   - as soon as you detect it, you can revert that commit automatically.

#### How to set up a self-testing build

The most common way to set up a self-testing build is to run a _CI server_.

---

CI server
: e.g. Jenkins, TeamCity Argo; GitHub Actions, GitLab, CircleCI.
: a software that integrates with your VCS to _run_ various **automations**, e.g. automated tests
: - in response to an event (in your VSC), e.g. new commits/branches/PRs...

> [!TIP]
> CI server are such an integral part of CI,
>
> - for many developers, CI server and CI are nearly synonymous.

#### The benefits of CI (and Automated Tests)

- Without continuous integration, your software is _broken until somebody proves it works_, usually during a testing or integration stage.

- With continuous integration, your software is _proven to work_ (assuming a sufficiently comprehensive set of automated tests) with every new change — and you know the moment it breaks and can fix it immediately.

> [!NOTE]
> With continuous integration, your code is _always_ in a releasable state 👉 You can deploy at any time you want.

> [!TIP]
> The CI server act as a gatekeeper 👮🆔:
>
> - protecting your code from any changes that threaten your ability to deploy at any time.

> [!IMPORTANT]
> Key takeaway #2
> Use a self-testing build after every commit to ensure your code is always in a **working & deployable** state.

### Making Large Changes

For large changes that take weeks/months, e.g. major new feature, big refactor - how can you merge your in-compete work on a daily basis

- without breaking the build
- without releasing unfinished features to users?

> [!IMPORTANT]
> Key takeaway #3
> Use branch by abstraction and feature toggles to make large-scale changes while still merging your work on a regular basis.

#### Branch by abstraction

branch by abstraction
: a technique for making a large-scale change to a software system's codebase in _gradual_ way, that allows you
: - to release the system regularly while the change is still in-progress

Branch by abstraction works at **code-level**, allow you to

- switch the implementation of the abstract easily (at code-level)
- or even have 2 implementation (versions) of the feature in parallel (at code-level)

For more information, see:

- [Branch By Abstraction | Martin Fowler](https://martinfowler.com/bliki/BranchByAbstraction.html)
- [Branch by abstraction pattern |AWS Prescriptive Guidance - Decomposing monoliths into microservices](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-decomposing-monoliths/branch-by-abstraction.html)

#### Feature toggles

feature toggle
: aka _feature flag_
: you wrap a new feature in **conditionals**, that let you
: - toggle that feature on/off dynamically at **deploy time/runtime**

By wrap features in conditionals, at **code-level**,

- you can make some part of your system invisible to the users without changing the code.

e.g.

- In the Node.js sample-app, you can add a feature toggle to pick between new homepage and the "Hello, World!" text

  ```javascript
  app.get("/", (req, res) => {
    if (lookupFeatureToggle(req, "HOME_PAGE_FLAVOR") === "v2") {
      res.send(newFancyHomepage());
    } else {
      res.send("Hello, World!");
    }
  });
  ```

  - The `lookupFeatureToggle` will check if the feature toggle is enables by querying a dedicated _feature toggle service_.

For more information, see:

- [Feature Toggles | Martin Flower's Article](https://martinfowler.com/articles/feature-toggles.html)

##### Feature toggle service

A feature toggle service can:

- Store a feature toggle mapping
- Be used to look up feature toggles programmatically
- Update feature toggle values without having to update/deploy code

e.g.

- growthbook, Flagsmith, flagr, OpenFeature
- Managed feature: Split, LaunchDarkly, ConfigCat, Statsig.

#### Feature toggle and continuous integration

By

- wrapping new features in conditionals (feature toggle check), and
- keep the default value of all feature toggles to off

you can merge your new unfinished feature into `main` and practice continuous integration.

> [!TIP]
> Feature toggles also give you many super powers, which you can see in the Continuous Delivery section

### Example: Run Automated Tests for Apps in GitHub Actions

In this example, you will use GitHub Actions to run the automated tests (that added in Chap 4) after each commit and show the result in pull requests.

- Copy the Node.js `sample-app` and the automated tests

  ```bash
  cd examples
  mkdir -p ch5
  cp -r ch4/sample-app ch5/sample-app
  ```

- From the root of the repo, create a folder called `.github/workflows`

  ```bash
  mkdir -p .github/workflows
  ```

- Inside `.github/workflows`, create a GitHub workflow file named `app-tests.yml`

  ```yaml
  # .github/workflows/app-tests.yaml
  name: Sample App Tests

  on: push #                                  (1)

  jobs: #                                     (2)
    sample_app_tests: #                       (3)
      name: "Run Tests Using Jest"
      runs-on: ubuntu-latest #                (4)
      steps:
        - uses: actions/checkout@v2 #         (5)

        - name: Install dependencies #        (6)
          working-directory: ch5/sample-app
          run: npm install

        - name: Run tests #                   (7)
          working-directory: ch5/sample-app
          run: npm test
  ```

  > [!NOTE]
  > With GitHub Actions, you use YAML to
  >
  > - define _workflow_ - configurable automated processes - that
  >   - run one or more _jobs_
  >     - in response to certain _triggers_.

  > [!TIP]
  > If you don't know about YAMl, see
  >
  > - [YAML | Learn X in Y minutes](https://learnxinyminutes.com/docs/yaml/)
  > - or [YAML Syntax | Ansible Docs](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)
  > - or [YAML basics in Kubernetes | IBM Developer - Tutorials](https://developer.ibm.com/tutorials/yaml-basics-and-usage-in-kubernetes/)
  > - or [YAML for beginners | Red Hat](https://www.redhat.com/sysadmin/yaml-beginners)
  > - https://yaml.org/spec/1.2.2/#nodes

- (1) `on` block: The trigger that will cause the workflow to run.

  In this example, `on: push` configure this workflow to run every time you do a `git push` to this repo

- (2) `jobs` block: One or more jobs - aka automations - to run in this workflow.

  > [!NOTE]
  > By default, jobs run _parallel_, but you can
  >
  > - configure jobs to run sequentially
  > - (and define dependencies on other jobs, passing data between jobs)

- (3) `sample_app_tests`: This workflow define a single job named `sample_app_tests`, which will run the automated tests for the sample app.

  > [!NOTE]
  > GitHub Actions use YAML syntax to define the workflow:
  >
  > - A YAML node can be one of three types:
  >   - Scalar: arbitrary data (encoded in Unicode) such as strings, integers, dates
  >   - Sequence: an ordered list of nodes
  >   - Mapping: an unordered set of key/value node pairs
  > - Most of the GitHub Actions's workflow syntax is a part of a mapping node - with:
  >   - a pre-defined key, e.g. `name`, `on`, `jobs`,
  >   - excepting some where you can specify your own key, e.g. `<job_id>`, `<input_id>`, `<service_id>`, `<secret_id>`

  > [!TIP]
  > In this example, `sample_app_test` is the `<job_id>` specified by you

- (4) `runs-on` block: Uses `ubuntu-latest` runner that has:

  - default hardware configuration (2 CPUs, 7GB RAM, as of 2024)
  - software with Ubuntu & a lot of tools (including Node.js) pre-installed.

  > [!NOTE]
  > Each job runs on a certain type of _runner_, which is how you configure:
  >
  > - the hardware (CPU, memory)
  > - the software (OS, dependencies)
  >
  > to use for the job.

- (5) `uses` block: Uses a reusable unit of code (aka _action_) - `actions/checkout` - as the first step.

  > [!NOTE]
  > Each job consists of a series of _steps_ that are executed sequentially.

  > [!NOTE]
  > GitHub Actions allow you to share & reuse workflows, including
  >
  > - public, open source workflows (available on GitHub Actions Marketplace)
  > - private, internal workflows within your own organization

- (6): The second step has a `run` block to execute shell commands (`npm install`)

  > [!NOTE]
  > A step can has:
  >
  > - either a `run` block: to run any shell commands
  > - or a `uses` block: to run an action

- (7) The thirst step also has a `run` block to execute shell commands (`npm test`)

### Get your hands dirty: Run automated app tests in CI

To help catch bugs, update the GitHub Actions workflow to run a JavaScript linter, such as JSLint or ESLint, after every commit.

To help keep your code consistently formatted, update the GitHub Actions workflow to run a code formatter, such as Prettier, after every commit.

Run both the linter and code formatter as a pre-commit hook, so these checks run on your own computer before you can make a commit. You may wish to use the pre-commit framework to manage your pre-commit hooks.

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
