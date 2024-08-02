# Chapter 4: How to Version, Build, and Test Your Code

With most real-world code, software development is a **team sport**, not a solo effort.

You need to figure out how to support many developers **collaborating** safety and efficiently on the same codebase.

In particular, you need to solve the following problems:

| The problem | How to ...                                                                                                                           | Notes                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Code access | - Allow all developers (in the team) to access the codebase ?                                                                        | 👈 So they can collaborate                                 |
| Integration | - Integrate changes from all developers<br /> - Handle any conflicts<br />- Ensure no one's work is accidentally lost or overwritten |                                                            |
| Correctness | - Prevent bugs & breakages slipping in?                                                                                              |                                                            |
| Release     | - Release the changes (in your codebase) to production on a regular basis?                                                           | 👉 So the code can generate value for users & your company |

These problems are all key part of your _software development life cycle_ (SDLC).

- In the pasts, many companies came up with their own ad-hoc, manual SDLC processes:
  - Email code changes back & forth
  - Spend weeks integrating changes together manually
  - Test everything manually (if they did any testing at all)
  - Release everything manually, e.g. Using FTP to upload code to a server
- Now a day, we have far better tools & techniques for solving these problems:
  - Version control
  - Build system
  - Automated testing

## Version Control

### What is Version Control

version control system (VCS)
: a tool that allows you to
: - store **source code**
: - share it with your team
: - integrate your work together
: - track changes over time

### Version Control Primer

| Your normal workflow with an essay in Microsoft Word                                                                                                                                                              | Your workflow in version control terms                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| You start with a file called `essay.doc`,                                                                                                                                                                         | You start with `essay.doc`.                                                                                                                                                                                                 |
| You realize you need to do some pretty major changes, so you create `essay-v2.doc`                                                                                                                                | After some major edits, you _commit_ your changes to a new revision called `essay-v2.doc`.                                                                                                                                  |
| You decide to remove some big pieces, but you don’t want to lose them, so you put those in `essay-backup.doc`, and move the remaining work to `essay-v3.doc`;                                                     | Then, you realize that you need to break off in a new direction, so you could say that you’ve created a new _branch_ from you original work, and in that new branch, you commit another new revision called `essay-v3.doc`. |
| Maybe you work on the essay with your friend Anna, so you email her a copy of `essay-v3.doc`                                                                                                                      | When you email Anna essay-v3.doc, and she starts her work, you could say that she’s working in yet another branch.                                                                                                          |
| Anna starts making edits; at some point, she emails you back the doc with her updates, which you then manually combine with the work you’ve been doing, and save that under the new name `essay-v4-anna-edit.doc` | When she emails you back, you manually _merge_ the work in your branch and her branch together to create `essay-v4-anna-edit.doc`.                                                                                          |
| You keep emailing back and forth, and you keep renaming the file, until minutes before the deadline, you finally submit a file called something like `essay-final-no-really-definitely-final-revision3-v58.doc`.  |                                                                                                                                                                                                                             |

![Visualizing your process with Word documents as version control](assets/vcs-word.png)
Visualizing your process with Word documents as version control

Your normal workflow with the an essay - copying, renaming, emailing... - is a type of version control, but not a manual version control system.

There are better version control tools, in which you commit, branch, merge... your works.

#### Version Control Concepts

Repositories
: You store **files** (code, documents, images, etc.) in a _repository_ (_repo_ for short).

Branches
: (You start with everything in a single _branch_, often called something like `main`.)
: At any time, you can create a **new branch** from any existing branch, and work in your own branch **independently**.

Commits
: Within any branch,
: - you can edit files,
: - when you’re ready to store your progress in a new revision, you create a commit with your updates (you _commit your changes_)
: The commit typically records
: - not only the changes to the files,
: - but also who made the changes, and a _commit message_ that describes the changes.

Merges
: At any time, you can _merge_ branches together.
: e.g.
: - It’s common to create a branch from `main`, work in that branch for a while, and then merge your changes back into `main`.

Conflicts
: (VCS tools can merge some types of changes completely automatically),
: But if there is a _conflict_ (e.g., two people changed the same line of code in different ways),
: - the VCS will ask you to _resolve_ the conflict manually.

History
: The VCS tracks every commit in every branch in a _commit log_, which lets you see
: the **full history** of how the code changed:
: - all previous revisions of every file,
: - what changed between each revision
: - who made each change.

> [!NOTE]
> There are many version control systems:
>
> - CVS, Subversion, Perforce...
> - Mercurial, Git...
>
> These days, the most popular is Git.

### Example: A Crash Course on Git

#### Git basics

- Install Git: Follow the [office guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

- Let Git know your name & email

  ```bash
  git config --global user.name "<YOUR NAME>"
  git config --global user.email "<YOUR EMAIL>"
  ```

---

---

- Initialize a Git repo

  > [!NOTE]
  > Before initial a Git repo, you need to create a empty folder:
  >
  > ```bash
  > mkdir /tmp/git-practice
  > cd /tmp/git-practice
  > ```
  >
  > (or you can use an existing repo)

  ```bash
  git init
  ```

  > [!NOTE]
  > Now, create a text file that will be including in your first commit:
  >
  > ```bash
  > echo 'Hello, World!' > example.txt
  > ```

  > [!TIP]
  > The contexts of the `git-practice` folder looks like this
  >
  > ```bash
  > $ tree -aL 1
  > .
  > ├── .git
  > └── example.txt
  > ```

  > [!NOTE]
  > The `.git` folder is where Git record all information about your branches, commits, revisions...

- Show the working tree status

  ```bash
  git status
  ```

  > [!NOTE]
  > The `git status` show the _working tree_ status:
  >
  > - What branch you're on.
  > - Any commits you've made.
  > - Any changes that haven't been committed yet.

- Before commit your changes, you first need to add the file(s) you want to commit to the _staging area_ using `git add`

  ```bash
  git add example.txt
  ```

- Re-run `git status`

  ```bash
  git status
  ```

  ```bash
  On branch main

  No commits yet

  Changes to be committed:
    (use "git rm --cached <file>..." to un-stage)
  	new file:   example.txt
  ```

  - The `example.txt` is now in the `staging area`, ready to be committed.

- To commit the staged changes, use the `git commit`

  ```bash
  git commit -m "Initial commit"
  ```

  - Use the `-m` flag to pass in the commit message.

- Check the commit log using `git log`

  ```bash
  git log
  ```

  For each commit in the log, you’ll see

  - commit ID
  - author
  - date
  - commit message.

  > [!NOTE]
  > Each commit has a different ID that you can use to uniquely identify that commit, and many Git commands take a commit ID as an argument.

  > [!TIP]
  > Under the hood, a _commit ID_ is calculated by taking the **SHA-1 hash** of:
  >
  > - the contents of the commit,
  > - all the commit metadata (author, date, and so on), and
  > - the ID of the previous commit

  > [!TIP]
  > Commit IDs are **40 characters** long,
  >
  > - but in most commands, you can use just
  >   - the **first 7 characters**, as that will be unique enough to identify commits in all but the largest repos.

---

Let's make another change and another commit:

- Make a change to the `example.txt`

  ```bash
  echo 'New line of text' >> example.txt
  ```

- Show your working tree status

  ```bash
  git status
  ```

  ```bash
  On branch main
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
  	modified:   example.txt
  ```

  - Git is telling you that the changes is current "in working directory" (working tree), and is "not staged for commit"
  - Git also tell you the changed files: `modified: example.txt`

- To see what exactly these changes are, run `git diff`

  ```bash
  git diff
  ```

  ```bash
  $ git diff
  diff --git a/example.txt b/example.txt
  index 8ab686e..3cee8ec 100644
  --- a/example.txt
  +++ b/example.txt
  @@ -1 +1,2 @@
   Hello, World!
  +New line of text
  ```

  > [!NOTE]
  > Use `git diff` frequently to check what changes you've made before committing them:
  >
  > - If the changes look good:
  >   - Use `git add <file>...` to stage the changes.
  >   - Then use `git commit` to commit them.
  > - If the changes don't look good:
  >   - Continue to modify the changes
  >   - Or use `"git restore <file>..."` to discard changes in working directory.

- Re-stage the changes and commit:

  ```bash
  git add example.txt
  git commit -m "Add another line to example.txt"
  ```

- Use `git log` once more with `--oneline`:

  ```bash
  git log --oneline
  ```

  ```bash
  02897ae (HEAD -> main) Add another line to example.txt
  0da69c2 Initial commit
  ```

> [!IMPORTANT]
> The commit log is very powerful 👈 It's has the commit IDs and commit messages:
>
> - **Debugging**:
>
>   Something breaks -> "What changed?" -> Check commit log's messages
>
> - **Reverting**:
>
>   - You can use `git revert <COMMIT_ID>` to create a new commit that reverts all the changes in the commit `<COMMIT_ID>`.
>
>     (in other words, undoing the changes in that commit while still preserving your Git history)
>
>   - You yan use `git reset --hard <COMMIT_ID>` to get rid of:
>     - all commits after `COMMIT_ID`.
>     - including the history about them.
>
> - **Comparison**:
>
>   You can use `git diff` to compare not only local changes, but also to compare any two commits.
>
> - **Author**:
>
>   You can use `git blame` to annotate each line of a file with information about the **last commit** that _modified_ that file, (including the date, the commit message, and the author).
>
>   - Don't use this to blame someone for causing a bug, as the name implies. It may be war!
>   - The more common use case is to help you understand where any give piece of code came from, and why that change was made.

#### Git branching and merging

- To create a new branch and switch to it, use `git checkout -b`

  ```bash
  git checkout -b testing
  ```

  > [!NOTE]
  > If you want to make sure you never lost your code, you can use `git switch -c` to create a new branch and switch to it.

- Check the you're on new branch with `git status`

  ```bash
  git status
  ```

- You can also list all the branches (and see which one you're on) with `git branch`

  ```bash
  git branch
  ```

  > [!TIP]
  > The branch which you're on is mark with asterisk (`*`)

- Any changes you commit now will go into the `testing` branch:

  - Try it with the example.txt

    ```bash
    echo 'Third line of text' >> example.txt
    ```

  - Stage and commit the changes

    ```bash
    git add example.txt
    git commit -m "Added a 3tr line to example.txt"
    ```

  - You git log to check that you have three commits on `testing` branch:

    ```bash
    git log --oneline
    ```

- Switch back to `main` branch to see that `main` branch still has only 2 commits

  ```bash
  git switch main
  git log --oneline
  ```

---

- Merge the work in your `testing` branch back to the `main` branch

  ```bash
  git merge testing # Merge testing branch (to current branch - main)
  ```

  ```bash
  Updating c4ff96d..c85c2bf
  Fast-forward
   example.txt | 1 +
   1 file changed, 1 insertion(+)
  ```

  - It's a `Fast-forward`, Git was able to merge all the changes automatically, as there were no conflicts between `main` & `testing` branches.

### Get your hands dirty with Git

- Learn how to use the `git tag` command to create tags.

- Learn to use `git rebase`.
  - When does it make sense to use it instead of `git merge`?

### Example: Store your Code in GitHub

- Git is a _distributed VSC_:

  Every team member can

  - have a **full copy** of the repository.
  - do commits, merges, branches completely _locally_.

- But the most common way to use Git is using one of the repositories as a _central repository_, which acts as your _source of truth_.

  - Everyone will initially get their code from this central repo
  - As someone make changes, he/she always pushes them back to this central repo.

- There are many way to run such a central repo:

  - Hosting yourself
  - Use a hosting service, which is the most common approach:

    - Not only host Git repos
    - But also provide:
      - Web UIs
      - User management
      - Development workflows, issue tracking, security tools...

    The most popular hosting service for Git are GitHub, GitLab, BitBucket.

  > [!NOTE]
  > GitHub is the most popular, and what made Git popular.
  >
  > - GitHub provides a great experience for hosting repos & collaboration with team members.
  > - GitHub has become de facto home for most open source projects.

---

In this example, you will push the example code you've worked in while reading this book/blog post series to GitHub.

- Go the folder where you have your code

  ```bash
  cd devops-books
  ```

- The contents of the folder should look like this:

  ```bash
  tree -L 2
  ```

  ```bash
  .
  ├── ch1
  │   ├── ec2-user-data-script
  │   └── sample-app
  ├── ch2
  │   ├── ansible
  │   ├── bash
  │   ├── packer
  │   └── tofu
  └── ch3
      ├── ansible
      ├── docker
      ├── kubernetes
      ├── packer
      └── tofu
  ```

- Initialize an empty Git repository in `.git/`

  ```bash
  git init
  ```

- Show working tree status

  ```bash
  git status
  ```

  - There is "no commits yet", and only "untracked files".

- Create gitignore file (`.gitignore`)

  ```gitignore
  *.tfstate            # 1
  *.tfstate.backup
  *.tfstate.lock.info

  .terraform           # 2

  *.key                # 3

  *.zip                # 4

  node_modules         # 5
  coverage
  ```

  - 1: Ignore OpenTofu state.
  - 2: Ignore `.terraform`, used by OpenTofu as a scratch directory.
  - 3: Ignore the SSH private keys used in Ansible examples.
  - 4: Ignore build artifact created by `lambda` module.
  - 5: Ignore Node.js's scratch directories.

  > [!TIP]
  > Commit the `.gitignore` file first to ensure you don't accidentally commit files that don't belong in version control.

- Stage and commit `.gitignore`

  ```bash
  git add .gitignore
  git commit -m "Add .gitignore"
  ```

- Stage all files/folders in root of the repo:

  ```bash
  git add .
  git commit -m "Example for first few chapters"
  ```

  - The code in now in a local Git repo in your computer.
  - In the next section, you'll push it to a Git repo on GitHub

---

- Create a GitHub account if you haven't one
- Authenticate to GitHub on the CLI: Follow the [official docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line)
- Create a new repository in GitHub
- Add that GitHub repository as a _remote_ to your local Git repository:

  > [!NOTE]
  > A _remote_ is a Git repository hosted somewhere, i.e. somewhere on the Internet

  ```bash
  git remote add origin https://github.com/<USERNAME>/<REPO>.git
  ```

  - This will add your GitHub repo as a remote named `origin`

  > [!TIP]
  > Your remote GitHub repo can be any where, but anyone that access your repo, which now acts as a central repository can refer to it as `origin`.

- Push your local branch to your GitHub repo

  ```bash
  git push origin main
  ```

  > [!TIP]
  > You push to `REMOTE` a `LOCAL_BRANCH` with:
  >
  > ```bash
  > git push REMOTE LOCAL_BRANCH
  > ```

- Refresh your repo in GitHub, you should see your code there.

> [!NOTE]
> You've just push your changes to a remote endpoint, which being halfway to be able to collaborate with other developers.

---

- You can click the `Add a README` button, then:

  - Fill in the README content.
  - And commit changes directly to the Git repo.

- If you do that, your GitHub repo now has a `README.md` file, but the local repo on your computer doesn't.

- To get the latest code from the `origin`, use `git pull`:

  ```bash
  git pull origin main
  ```

  > [!NOTE]
  > The command `git pull REMOTE REMOTE_BRANCH` will:
  >
  > - "Fetch" from `REMOTE` the `REMOTE_BRANCH`.
  > - Merge that `REMOTE_BRANCH` to current branch (in the local repository).

- If your haven't have a local copy of the central repository, first you need to _clone_ that repo:

  ```bash
  git clone https://github.com/<USERNAME>/<REPO>
  ```

  This command will

  - checkout a copy of the repo `<REPO>` to a folder called `<REPO>` in your current working directory.
  - automatically add the repo's URL as a remote named origin

---

You've just seen the basic Git workflows when collaboration:

- `git clone`: Check out a fresh copy of a repo.
- `git push origin <LOCAL_BRANCH>`: Share your changes to other team members.
- `git pull origin <REMOTE_BRANCH>`: Get changes from other team members.

### A Primer on Pull Request

pull request
: a request to merge one branch into another branch
: ~ you're requesting the owner runs `git pull` on your repo/branch

> [!TIP]
> GitHub popularized the PR workflow as the de facto way to _make changes_ to **open source repos**
>
> And these days, many companies use PRs to make changes to private repos as well.

---

A pull request processes is as a follows:

- You check out a copy of repo `R`, create a branch `B`, and commit your changes to this branch.

  - If you have write access to repo `R`, you can create branch `B` directly in repo `R`.
  - However, if you don’t have write access, which is usually the case if repo `R` is an open source repo in someone else’s account, then you
    - first create a _fork_ of repo `R`, which is a copy of the repo in your own account,
    - then you create branch `B` in your fork.

- When you’re done with your work in branch `B`, you open a **pull request** against repo `R`:

  - Requesting that the maintainer of that repo merges your changes from branch `B` into some branch in repo `R` (typically `main`).

- The owner of repo `R` then
  - uses GitHub’s PR UI to review your changes,
  - provide comments and feedback,
  - and ultimately, decide to either
    - merge the changes in,
    - or close the PR unmerged.

### Example: Open a Pull Request in GitHub

- Create a new branch named `update-readme` and switch to it

  ```bash
  git switch -c update-readme
  ```

- Make a change to the `README.md` file

  ```bash
  echo "https://www.fundamentals-of-devops.com/" >> README.md
  ```

- Show un-staged changed

  ```bash
  git diff
  ```

- Stage & commit the changes

  ```bash
  git add README.md
  git commit -m "Add URL to README"
  ```

- Push your `update-readme` branch to the `origin` remote

  ```bash
  git push origin update-readme
  ```

  > [!TIP]
  > In the `git push` output, GitHub conveniently shows you a URL for creating a pull request.
  >
  > You can also create PRs by
  >
  > - going to the `Pull Requests` tab of your repo in GitHub Web UI
  > - clicking `New Pull Request` button.

- Open the URL in a web browser, then

  - Fill in the pull request's title, description.
  - Scroll down to see the changes between your `update-readme` & `main` branches.
  - If those changes look OK, click `Create pull request` button.
  - You'll end up in the GitHub PR UI.

- You and your team members cana use the Github PR page to

  - see the changes
  - discuss the changes
  - request reviewers, modifies to those changes...

- If the PR looks gook:
  - Click `Merge pull request`
  - Then `Confirm merge` to merge the changes in.

### Version Control Best Practices

- Always use version control

  - Using version control brings massive benefits for software engineering.
  - Version control's easy, cheap/free.

  > [!IMPORTANT]
  > Key takeaway #1
  > Always manage your code with a version control system.

- Write good commit messages

  When you're trying to figure out what caused a bug, an outage, `git log` and `git blame` can help you, but only if the commit message are well written.

  > [!NOTE]
  > What is a good commit message?
  >
  > - **Summary**: Short, clear summary of the change (< 50 characters).
  > - **Context**:
  >   - If you need more than a summary, put a new line after the summary, then provide more information to understand the context.
  >   - Focus on _what_ changed; _why_ it changed (_How_ it changed should be clear from the the code itself).
  >
  > e.g.
  >
  > ```
  > Fix bug with search auto complete
  >
  > A more detailed explanation of the fix, if necessary. Provide
  > additional context that may not be obvious from just reading the
  > code.
  >
  > - Use bullet points
  > - If appropriate
  >
  > Fixes #123. Jira #456.
  > ```

  > [!TIP]
  > You can go a little further with the commit messages by:
  >
  > - Following [How to Write a Good Commit Message](https://cbea.ms/git-commit/)
  > - Adopting [Conventional Commits](https://www.conventionalcommits.org/)

- Commit early and often

  Committing as you're solving a large problem, break it down to small, manageable parts.

  > [!NOTE]
  > What to commit and PR?
  >
  > Atomic commit/PR.
  >
  > In other words, each commit or pull request should do exactly one small, relatively self-contained thing.

  > [!TIP]
  > Atomic commit: You should be able to describe the commit in one short sentence and use it as the commit message's summary.
  >
  > e.g. Instead of a single, massive commit that implements an entire large feature,
  >
  > - aim for a series of small commits, where each one implements some logical part of that feature:
  >   - a commit for backend logic
  >   - a commit for UI logic
  >   - a commit for search logic

  > [!TIP]
  > Atomic PR:
  >
  > - A single PR can contain multiple commits, but it should still represent a single set of _cohesive_ changes - changes that naturally & logically go together.
  > - If your PR contains unrelated changes, you should break it up into multiple PRs.
  >
  > e.g. Follow the _Boy Scout Rule_[^1] is a good idea, but
  >
  > - don't make a PR that contains a new feature, a bug fix, and a refactor
  >   - put each of these changes into its own PR:
  >     - a PR for the new feature
  >     - a PR for the bug fix
  >     - a PR for the refactor

  > [!NOTE]
  > What is the benefit of atomic commits, PRs?
  >
  > | Benefit                       | Description                                                                             |
  > | ----------------------------- | --------------------------------------------------------------------------------------- |
  > | **More useful Git history**   | Each commit/PR can fit in oneline in the history.                                       |
  > | **Cleaner mental model**      | Force you to break the work down.                                                       |
  > | **Less risk**                 | Easy to revert.                                                                         |
  > | **Easier code reviews**       | Quick to approve.                                                                       |
  > | **Less risky refactors**      | You can try something new then go back to any commits quickly without losing much work. |
  > | **Lower risk of data loss**   | Commit (and push) act as a data backup.                                                 |
  > | **More frequent integration** | Quick to merge, release.                                                                |

- Use a code review process

  > [!NOTE]
  > Why any one should have their code review?
  >
  > In the writing world, even if you're the smarted, most capable, most experienced, you can't proofread your own work:
  >
  > - You're too close to the concept.
  > - You can't put yourself in the shoes of someone who is hearing them for the first time.
  >
  > The same applies for writing code.

  > [!TIP]
  > Having your code review by someone else is a highly effective way to catch bugs, reducing defect rates by as much as 55-80% - which is even a higher rate than automated test.

  > [!NOTE]
  > Code reviews are also an efficient mechanism to
  >
  > - spread knowledge, culture, training
  > - provide a sense of ownership throughout the team

  > [!NOTE]
  > How to do code reviews?
  >
  > - **Enforce a pull request workflow**
  >
  >   You can enforce that
  >
  >   - all changes are done through pull requests
  >     - so the maintainers of each repo can asynchronously review each change before it gets merged.
  >
  > - **Use _pair programming_**
  >
  >   _Pair programming_:
  >
  >   - a development technique where two programmers work together at one computer:
  >
  >     - one person as the **driver**, responsible for writing the code
  >     - the other as the **observer**, responsible for
  >       - reviewing the code and
  >       - thinking about the program at a higher level
  >
  >     (the programmers regularly switch roles)
  >
  >   - results in code review process happens all the time:
  >     - driver will also try to make clear what the code is doing
  >
  >   Pair programming is used:
  >
  >   - by some companies for all their coding
  >   - by other companies for only complex tasks, or ramping up a new hire.
  >
  > - **Use formal inspections**
  >
  >   Formal inspection is when you schedule a live meeting for a code review where you:
  >
  >   - present the code to multiple developers
  >     - go through it together, line-by-line.
  >
  >   Formal inspection can be apply for mission critical parts of your systems.

  > [!TIP]
  > Whatever process you pick for code reviews, you should
  >
  > - define your _code preview guidelines_ up front,
  >   - so everyone can have a process that is consistent & repeatable across the entire team:
  >     - what to look for, e.g. design, functionality, complexity, tests.
  >     - what _not_ to look for, e.g. code formatting (should be automated)
  >     - how to communicate feedback effectively
  >
  > For example, have a look at [Google’s Code Review Guidelines](https://google.github.io/eng-practices/review/).

- Protect your code:

  For many companies these day, the code you write is:

  - your most important asset.
  - a highly sensitive asset: if someone can slip malicious code into the codebase, it would be a nightmare.

  > [!NOTE]
  > How to protect your code?
  >
  > - **Signed commits**:
  >
  >   By default, any one can set the email used by Git to any email they want.
  >
  >   - What if a bad actor introduces some malicious code in your name (email).
  >   - Fortunately, most VSC hosts (GitHub, GitLab...) allow you to enforce signed commits on your repos, where they reject any commit that doesn't have a valid cryptographic signature.
  >
  >     Under the hood:
  >
  >     - You give Git the private key; and give the VSC host the public key.
  >     - When you commit, Git will sign that your commits with the private key.
  >     - When you push to central repo on VSC host, VSC host will use the public key to verify that these commit are signed by your private key.
  >
  > - **Branch protection**:
  >
  >   Most VCS hosts (GitHub, GitLab, etc.) allow you to enable _branch protection_, where you can
  >
  >   - enforce certain **requirements** before code can be pushed to certain branches (e.g., `main`)
  >
  >   For example, you can require that all changes to `main` branch:
  >
  >   - Submitted via pull requests
  >   - Those pull requests are review by at least N other developers.
  >   - Certain checks - e.g. security scans - pass
  >
  >   before these pull requests can be merged.

### Get your hands dirty with Git amend, squash

## Build System

### What is Build System?

build system (build tools)
: the system used by most software project to automate important operations, e.g.
: - Compiling code
: - Downloading dependencies
: - Packaging the app
: - Running automated tests...

### Why use Build System?

The build system serves 2 audiences:

- The **developers** on your team, who run the build steps as part of local development.
- The **automated tools** (scripts), which run the build steps as part of automating your software delivery process.

### Which Build System to use?

You can:

- create your own build system from ad-hoc scripts, duct tape & glue.
- or use an off-the-shelf build system.

There are many off-the-shelf build systems out there:

- Some were originally designed for use with a specific programming language, framework. e.g
  - Rake for Ruby
  - Gradle, Mavan for Java
  - SBT for Scale
  - NPM for JavaScript (Node.js)
- Some are language agnostic:
  - Make: granddad of all build systems.
  - Bazel: fast, scalable, multi-language and extensible build system.

> [!TIP]
> Usually, the language-specific tools will give you the best experience with that language.
>
> You should only go with the language-agnostic ones in specific circumstances, such as:
>
> - Massive teams
> - Dozens of languages
> - Gigantic monorepo

> [!IMPORTANT]
> Key takeaway #2
> Use a build system to capture, as code, important operations and knowledge for your project, in a way that can be used both by developers and automated tools.

### Example: Configure your Build Using NPM

The `example-app` is written is JavaScript (Node,js), so NPM is a good choice for build system.

- The code for this example will be in `examples/ch4/sample-app`

  ```bash
  cd examples
  mkdir -p ch4/sample-app
  ```

- Clone the `app.js` from previous example

  ```bash
  cp ch1/sample-app/app.js ch4/sample-app/app.js
  ```

- [Install Node.js](https://nodejs.org/en/download/package-manager) which comes with NPM

- To use NPM as a build system, you need a `package.json` file.

  > [!NOTE]
  > The `package.json` file can be
  >
  > - created manually
  > - scaffold by running `npm init`

  In this example, you will run `npm init`

  ```bash
  npm init
  # npm will prompt you for the package name, version, description...
  ```

  You should have a `package.json` file looks like this:

  ```json
  {
    "name": "sample-app",
    "version": "1.0.0",
    "description": "Sample app for 'Fundamentals of DevOps and Software Delivery'",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    }
  }
  ```

  > [!NOTE]
  > NPM has a number of [built-in scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts), such as `npm install`, `npm start`, `npm test`, and so on.
  >
  > All of these have default behaviors, but in most cases, you can define what these script do by
  >
  > - adding them to the scripts block.
  > - specify which commands that script should run.
  >
  > For example
  >
  > - `npm init` gives you an initial `test` script in the scripts block that just run a command that exits with an error.

- Add a script named `start` to the script block in `package.json`

  ```json
  {
    "scripts": {
      "start": "node app.js"
    }
  }
  ```

- Now you run the `npm start` script to run your app.

  ```bash
  npm start
  ```

  > [!NOTE]
  > By using `npm start` to run your app, you're using a well-known convention:
  >
  > - Most Node.js and NPM users know to use `npm start` on a project.
  > - Most tools that work with Node.js know to use `npm start` to start a Node.js app.
  >
  > In other words, you capture _how to run your app_ in the build system.

- Create a `Dockerfile`

  ```Dockerfile
  # examples/ch4/sample-app/Dockerfile
  FROM node:21.7

  WORKDIR /home/node/app

  # 1
  COPY package.json .
  COPY app.js .

  EXPOSE 8080

  USER node

  # 2
  CMD ["npm", "start"]
  ```

  This Dockerfile is identical to the one in previous example, except:

  - 1: In addition to `app.js`, you also copy the `package.json` to the Docker image.
  - 2: Instead of using `node app.js`, you use `npm start` to start the app.

- Create a script called `build-docker-image.sh`

  ```bash
  # examples/ch4/sample-app/build-docker-image.sh
  #!/usr/bin/env bash
  set -e

  # (1)
  version=$(npm pkg get version | tr -d '"')

  # (2)
  docker buildx build \
    --platform=linux/amd64,linux/arm64 \
    -t sample-app:"$version" \
    .
  ```

  - 1: Run `npm pkg get version` to get the value of the `version` key in `package.json`.
  - 2: Run `docker buildx`, setting version to the value from 1.

- Make the script executable

  ```bash
  chmod u+x build-docker-image.sh
  ```

- Add a `dockerize` script to the `scripts` block in `package.json`

  ```json
  {
    "scripts": {
      "dockerize": "./build-docker-image.sh"
    }
  }
  ```

- Now instead of trying to figure out how to build the Docker image, your team members can execute `npm run dockerize` to build the Docker image.

  ```bash
  npm run dockerize
  ```

  > [!NOTE]
  > Notice it's `npm run dockerize` (with the extra `run`) as `dockerize` is a custom script, not a built-in script of NPM.

### Dependency Management

dependencies
: software packages & libraries that your code uses.

#### Kind of dependencies

- **Code in the same repo**

  You can

  - break your code in a single repo into multiple modules/packages
  - have these modules depend on each other

  These modules/packages allow you

  - develope different parts of your codebase in
    - isolation from the others,
    - (possible with completely separate teams working on each part)

- **Code in different repos**

  You can store code across multiple repos, which

  - give you **more isolation** between different parts of your software
    - make it even easier for separate teams to take **ownership** for each part.

  Typically, when code in repo A depends on code in repo B:

  - it's a specific **version of the code** in repo B, which may correspond to a specific Git tag.

  - or it's a **versioned _artifact_** published form the repo B

    e.g.

    - a Jar file in the Java world
    - a Ruby Gem in the Ruby world

- **Open source code**

  Most common type of dependency these days.
  A type of code in different repos.

#### Why use a dependency?

Yoy use a dependency so

- you can reply on someone else to solve certain problems for you
- instead of having to
  - solve everything yourself from scratch
  - (maintain it)

> [!IMPORTANT]
> Key takeaway #3
> Use a dependency management tool to pull in dependencies—not copy & paste.

#### The problems with copy-paste dependency

- **Transitive dependencies**

  Copy/pasting a single dependency is easy, but if

  - that dependency has its own dependencies, and
    - those dependencies have their own dependencies, and
      - so on (collectively known as _transitive dependencies_),

  then copy/pasting becomes rather hard.

- **Licensing**

  Copy/pasting may violate the license terms of that dependency, especially if you end up modifying that code (because it now sits in your own repo).

  > [!WARNING]
  > Be especially aware of dependencies that uses **GPL**-style licenses (known as _copyleft_ or _viral_ licenses),
  >
  > - if you modify the code in those dependencies,
  >   - you need to release your own code under the same license
  >     i.e. you’ll be forced to open source your company’s proprietary code!.

- **Staying up to date**

  If you copy/paste the code, to get any future updates, you’ll have to

  - copy/paste new code, and new transitive dependencies, and
  - make sure you don’t lose any changes your team members made along the way.

- **Private APIs**

  (Since you can access those files locally), you may end up

  - using private APIs
    - instead of the public ones that were actually designed to be used,

  which can lead to unexpected behavior, (and make staying up to date even harder)

- **Bloating your repo**

  Every dependency you copy/paste into your version control system makes it larger and slower.

#### How to use dependencies

- Instead of copy-paste, use a _dependency management tool_, which is usually built-in with build systems.

- You define your dependencies

  - as code
  - in the build configuration
  - including the version (of the dependencies)

  the dependency management tools is then responsible for:

  - downloading those dependencies (plus any transitive dependencies)
  - making them available to your code.

### Example: Add Dependencies in NPM

So far, the Node.js `example-app` has not any dependencies other than the `http` standard library built in Node.js.

In this example, you will introduce an dependency named Express, which is a popular web framwork for Node.js

- Install Express & save it to `dependencies` in `package.json`

  ```bash
  npm install express --save
  ```

  - The package will now have a new `dependencies` section:

    ```json
    {
      "dependencies": {
        "express": "^4.19.2"
      }
    }
    ```

- There will be 2 new file/folder next to the `package.json` file:

  - `node_modules` folder: where NPM download & install dependencies

    - Should be in your `.gitignore`; anyone check out this repo the first time can run `npm install` to install the dependencies.

  - `package-lock.json` file: a _dependency lock file_, which captures the _exact_ dependencies what were installed.

    - In `package.json`, you can specify a _version range_ instead of a specific version.
    - Without the `package-lock.json`, every time you run `npm install`,
      - you may get a new version of the dependencies,
        - which make the builds not _reproducible_
    - With the `package-lock.json` file, you can use `npm clean-install` (`npm ci` in short) to
      - tell NPM to perform a _clean_ install (and install the exact versions in the lock file)
        - so the build is reproducible (every time)

- Re-write the code in `app.js` to use Express framework

  ```javascript
  const express = require("express");

  const app = express();
  const port = 8080;

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

  > [!TIP]
  > By using the Express framework, it'll be a lot easier to evolve this code into a real app by leverage all the features built into Express
  > e.g. routing, templating, error handling, middleware, security...

- Update the Dockerfile to run `npm ci`

  ```Dockerfile
  FROM node:21.7

  WORKDIR /home/node/app

  # (1)
  COPY package.json .
  COPY package-lock.json .

  # (2)
  RUN npm ci --only=production

  COPY app.js .

  EXPOSE 8080

  USER node

  CMD ["npm", "start"]
  ```

  - 1: Copy not only `package.json`, but also `package-lock.json` into the Docker image.
  - 2: Run `npm ci` to have a clean install with the exact dependencies in the lock file.

  > [!NOTE]
  > The `--only=production` flag tells NPM to only install the production dependencies.
  >
  > - An NPM package can also have dev-dependencies - which are only used in the dev environment.
  > - When running in production environment, these dev dependencies are not needed.

### Get your hands dirty with modern frontend build systems

- PNPM
- Yarn
- Turborepo
- Lerna
- Parcel

## Automated Testing

### Why use automated testing

legacy code
: spaghetti code without automated tests, documentation
: code that you don't have the confidence to make changes

To prevent legacy code, you use automated testing, where you:

- write test code to validate that
  - your production code works
    - the way you expect it to.

By writing automated tests, you might catch some of the bugs,

- but the most important benefit of having a good suite of automated tests is, you have the _confidence_ to make changes quickly, because:

  - you don't have to keep the whole program in your head
  - you don't have to worry about breaking other people's
  - you don't have to repeat the same boring, error-prone manual testing over & over agian.

> [!IMPORTANT]
> Key takeaway #4
> Use automated tests to give your team the _confidence_ to make changes quickly.

### Types of automated tests

There're a lot of type of automated tests:

- **Compiler**

  If you’re using a _statically-typed language_ (e.g., Java, Scala, Haskell, Go, TypeScript), you can pass your code through the **complier** (compile) to automatically identify

  - (a) syntactic issues
  - (b) type errors.

  If you’re using a _dynamically-typed language_ (e.g., Ruby, Python, JavaScript), you can pass the code through the **interpreter** to identify syntactic issues.

- **Static analysis / linting**

  These are tools that _read_ & _check_ your code "statically" — that is, _without executing_ it — to automatically identify potential issues.

  Examples:

  - ShellCheck for Bash
  - ESLint for JavaScript
  - SpotBugs for Java
  - RuboCop for Ruby.

- **Policy tests**

  In the last few years, policy as code tools have become more popular as a way to define and enforce company policies & legal regulations in code.

  Examples: Open Policy Agent, Sentinel, Intercept.

  - Many of these tools are based on static analysis, except they give you flexible languages to define what sorts of rules you want to check.
  - Some rely on plan testing, as described next.

- **Plan tests**

  Whereas static analysis is a way to test your code without executing it at all, plan testing is a way to _partially execute_ your code. This typically only applies to tools that can generate an execution plan without actually executing the code.

  For example:

  - OpenTofu has a plan command that shows you what changes the code would make to your infrastructure without actually making those changes: so in effect, you are running all the read operations of your code, but none of the write operations.

  You can write automated tests against this sort of plan output using tools such as Open Policy Agent and Terratest.

- **Unit tests**

  This is the first of the test types that _fully execute_ your code to test it.

  The idea with unit tests is to execute only a single "unit" of your code:

  - What a unit is depends on the programming language, but it’s typically a small part of the code, such as one function or one class. - You typically mock any dependencies outside of that unit (e.g., databases, other services, the file system), so that the test solely executes the unit in question.

  To execute the unit tests:

  - Some programming languages have unit testing tools built in
    e.g. `testing` for Go; `unittest` for Python
  - Whereas other languages rely on 3rd party tools for unit testin
    e.g. `JUnit` for Java; `Jest` for JavaScript

- **Integration tests**

  Just because you’ve tested a unit in isolation and it works, doesn’t mean that multiple units will work when you put them together. That’s where integration testing comes in.

  With integeration tests, you test

  - multiple units of your code (e.g., multiple functions or classes),
  - often with a mix of
    - real dependencies (e.g., a database)
    - mocked dependencies (e.g., a mock remote service).

- **End-to-end (E2E) tests**

  End-to-end tests verify that **your entire product works as a whole**, which mean you:

  - run
    - your app,
    - all the other services you rely on,
    - all your databases and caches, and so on,
  - test them all together.

  These often overlap with the idea of _acceptance tests_, which verify **your product works from the perspective of the user** or customer ("does the product solve the problem the user cares about").

- **Performance tests**

  Most unit, integration, and E2E tests verify the **correctness** of a system under **ideal conditions**: one user, low system load, and no failures.

  Performance tests verify the **stability & responsiveness** of a system in the face of **heavy load & failures**.

### Example: Add Automated Tests for the Node.js App

> [!IMPORTANT]
> Key takeaway #5
> Automated testing makes you more productive while coding by providing a rapid feedback loop: make a change, run the tests, make another change, re-run the tests, and so on.

> [!IMPORTANT]
> Key takeaway #6
> Automated testing makes you more productive in the future, too: you save a huge amount of time not having to fix bugs because the tests prevented those bugs from slipping through in the first place.

### Example: Add Automated Tests for the OpenTofu Code

### Testing Best Practices

## Conclusion

[^1]: THE BOY SCOUTS HAVE A RULE: “Always leave the campground cleaner than you found it.”[^2]

[^2]: https://learning.oreilly.com/library/view/97-things-every/9780596809515/ch08.html
