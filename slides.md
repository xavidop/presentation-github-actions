---
theme: the-unnamed
highlighter: shiki
transition: slide-left
mdc: true
presenter: dev
title: "From Code to Cloud: Automated Deployments with GitHub Actions"

addons:
  - slidev-addon-components

fonts:
  sans: "Lato,cursive"

themeConfig:
  color: "#000000"
  background: "#215287"

  font-size: "2em"

  cover-background: "#ffffff"
  cover-headingBg: "#215287"
  cover-headingColor: "#F8F8F8"

  default-background: "#F8F8F8"
  default-headingBg: "#215287"
  default-headingColor: "#F8F8F8"
  default-font-size: "1.4rem"

  center-background: "#F8F8F8"
  center-headingBg: "#215287"
  center-headingColor: "#F8F8F8"

  section-background: "#F8F8F8"
  section-headingBg: "#215287"
  section-headingColor: "#F8F8F8"

  aboutme-background: "#F8F8F8"
  aboutme-color: var(--slidev-theme-color)
  aboutme-helloBg: "#215287"
  aboutme-helloColor: "#F8F8F8"
  aboutme-nameColor: "#215287"

  code-background: "#215287"
  code-color: "#F8F8F8"
  code-font-size: 1.1em

layout: about-me
imageSrc: ./slides/cover.webp
helloMsg: ''
name: 'From Code to Cloud: Automated Deployments with GitHub Actions'
---
---
layout: about-me
imageSrc: ./profile/xavidop.jpg
helloMsg: 👋 Hello!
name: Xavier Portilla Edo
job: Head of Cloud Infrastructure
line1: "Voiceflow"

social1: "@xavidop"
social2: xavidop.me
---

<div class="recognitions">
  <img src="/profile/github.svg" height="50px" width="50px" />
  <img src="/profile/awscb.png" height="50px" width="50px"/>
  <img src="/profile/alexa.png" height="50px" width="50px"/>
  <img src="/profile/gde.svg" height="50px" width="50px" />
</div>

<style>
  .recognitions {
    display: flex;
    gap: 1rem;
    background: #F8F8F8;
    padding: 0.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    position: absolute;
    z-index: 999;
    bottom: 1rem;
  }
</style>

---
layout: cover
background: ./slides/githubactions.svg
---

# Understanding GitHub Actions: <br /> Fundamentals and terminology

<style>
  h1 {
    font-size: 3.5rem !important;
  }
</style>

---
---

# What are GitHub Actions?

- **CI/CD** service
- **Automate** builds, tests, deployments, issues, etc.
- **Workflow** defined in YAML
- **Triggers** based on events like push, pull requests, etc.
- **Actions** are reusable tasks
- **Runners** are VMs to execute workflows on Windows, macOS, Linux

---
---

# Why GitHub Actions?

- **Integrated** with GitHub
- **Free** for public repositories and self-hosted runners
- **Community** contributed actions
- **Cost-effective** for private repositories ("free" minutes)

---
---

# "Free" minutes per plan

| **Plan** | **Free minutes** |
| --- | --- |
| GitHub Free | 2,000 |
| GitHub Pro | 3,000 |
| GitHub Free for orgs | 2,0002 |
| GitHub Team | 3,000 |
| GitHub Enterprise Cloud | 50,000 |

---
layout: cover
background: ./slides/warning.jpg
---

# Mind the minute multipliers!!!

<style>
  h1::before {
    background: #EE4266 !important;
  }
</style>

---

# Minute what?

## **macOS** and **Windows** runners are more expensive

<br />

| **Runner** | **Multiplier** |
| --- | --- |
| Linux | 1x |
| Windows | 2x |
| macOS | 10x |

<br />

**Large runners** are more expensive (only for orgs and enterprises)

---
layout: cover
background: ./slides/terminology.jpg
---

# GitHub Actions Terminology

---
---

# GitHub Actions Terminology

```mermaid
flowchart LR
  Events --> |triggers| Workflow --> |starts| Job --> |uses| Runner --- Step --- Action
```

<br />

- **Event**: Trigger for a workflow
- **Workflow**: Automation process
- **Job**: Set of steps that execute on the same runner
- **Runner**: VM to execute workflows
- **Step**: A task that can run commands
- **Action**: A reusable task

---
---

# Types of event triggers

- **push**: Triggered on push to a branch
- **pull_request**: Triggered on pull request
- **schedule**: Triggered on a schedule
- **release**: Triggered on release
- **workflow_call**: Triggered by another workflow
- **workflow_dispatch**: Triggered manually
- **repository_dispatch**: Triggered by an external event

[More triggers](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

---
---

# GitHub Actions Workflow

Create a `.github/workflows` directory in your repository.

```yaml {all|2-5|6-8|9-16}{lines:true}
name: Build and Deploy
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist
```

---
layout: cover
background: ./slides/craft.jpg
---

# Building Blocks: <br /> Crafting your first GitHub Actions workflow

<!--
- Explain the process of what we are going to do in the GH Actions workflow
- Create the `.github/workflows` directory and add a YAML file
- Create a workflow with a name and trigger
- Define jobs and steps
- Add `env` variables
- Add caching
- Test the flow and show the artifacts
- GitHub Variables - https://docs.github.com/en/actions/learn-github-actions/variables
- GitHub Context - https://docs.github.com/en/actions/learn-github-actions/contexts

Highlights:
- How to create a workflow
- Triggers
- Environment variables
- Actions and how to use options like caching
- Artifacts
- Running the first workflow
-->

---

# Variables

- Non-sensitive configuration information
- Levels:
  - Workflow: `env`
  - Repository
  - Environment
  - Organization
- [Default environment variables](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables): `GITHUB_*` and `RUNNER_*`
  - `GITHUB_REPOSITORY`: `owner/repo`
  - `GITHUB_REPOSITORY_OWNER`: `owner`

---
---

# Highlights

1. Workflows created in `.github/workflows` directory
2. Define workflow variables by using `env`
3. Actions options can be added like `with`, `env`, etc.
4. Variables and contexts can be used in the workflow
5. Setting your variables like with `>> $GITHUB_ENV`

```bash
echo "{environment_variable_name}={value}" >> $GITHUB_ENV
```

<br />

[GitHub Variables](https://docs.github.com/en/actions/learn-github-actions/variables) - 
[GitHub Context](https://docs.github.com/en/actions/learn-github-actions/contexts)

---
layout: cover
background: ./slides/deploy.jpg
---

# From Artifact to Deployment: <br /> Deploy your website

<!--
- Start by a dependent job
- Explain how to use the artifacts
- Export the PDF
- Deploy the website to GitHub Pages
  - Using the `GITHUB_TOKEN` secret. It is a GitHub App installation access token, and is limited to the repository that triggers the workflow. [More info](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#modifying-the-permissions-for-the-github_token)
  - Explain that each job runs with default permissions: [workflow permissions](https://github.com/xavidop/github-actions-presentation-test/settings/actions)
  - We can change the permissions
- Using an environment and setting the URL
- Upload artifacts

Highlights:
- Dependent jobs
- Using artifacts
- Permissions on the `GITHUB_TOKEN`
- Environments
- Publish to GitHub Pages
-->

---
---

# Automatic token authentication

- Each workflow job creates a `GITHUB_TOKEN` secret
- Used to authenticate with GitHub API
- `${{ secrets.GITHUB_TOKEN }}`

<v-click>

Comes with **default** permissions depending on the repo settings

![](/slides/workflow-permissions.png)

</v-click>

---
---

# Elevate the GITHUB_TOKEN permissions

```yaml {5-8}{lines:true}
preview-deploy:
  runs-on: ubuntu-latest
  needs: build

  permissions:
    contents: read
    pages: write
    id-token: write
```

---
---

# Job output variables

#### Step 1: Set the variable

```yaml
    steps:
      - id: step1 # Required
        run: |
          # {name}={value}
          echo "website=https://..." >> $GITHUB_OUTPUT
```

<v-click>

#### Step 2: Define the output

```yaml
jobs:
  job1:
    outputs:
      website: ${{ steps.step1.outputs.website }}
```

</v-click>

<v-click>

#### Step 3: Use the output

```yaml
  job2:
    needs: job1
    steps:
      - run: echo ${{ needs.job1.outputs.website }}
```

</v-click>

---
---

# Highlights

- You can depend on other jobs by using the `needs` key
- Use the `actions/upload-artifact` action to upload artifacts
- Permissions on the `GITHUB_TOKEN` can be changed
- Set job output variables with `>> $GITHUB_OUTPUT`
- Add information to the job summary via `>> $GITHUB_STEP_SUMMARY`

---
layout: cover
background: ./slides/testing.jpg
---

# Ensuring Success: <br /> Validating the deployment

<!--
- Create a new dependent job for testing
- Showing the environment and its variables/secrets
- Adding extra caching
- Conditions for the job/action
- Job summary
- Run the new flow and show the results

Highlights:
- Dependent jobs
- Environment variables and secrets
- Caching
- Conditions
- Job summary
-->

---
---

# Caching dependencies

Use `actions/cache` to cache dependencies

```yaml {all|2|4-6}{lines:true}
- name: Cache Playwright
  id: cache-playwright
  uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: playwright-${{ env.PLAYWRIGHT_VERSION }}
```

---
---

# Conditions

Conditions can be added to jobs and steps to control when they run

```yaml {all|2}{lines:true}
- name: Install Playwright Browsers
  if: steps.cache-playwright.outputs.cache-hit != 'true'
  run: npx playwright install --with-deps
```

<br />

<v-click>

- `if: always()` to always run the step (even if the previous step/job failed)
- Functions: `contains()`, `startsWith()`, `endsWith()`, ...

</v-click>

---

# Highlights

- Use `actions/cache` to cache dependencies
- Conditions can be added to jobs and steps to control when they run
- Each environment can have its variables and secrets
  - Using variables: `vars.{name}`
  - Using secrets: `secrets.{name}`

---
layout: cover
background: ./slides/azure.jpg
---

# Expanding Horizons: <br /> Using environments

<!--
- Create a new job for deploying to Azure
- Show how to use secrets
- Reusing actions -> templates
- Approval in the workflow for Azure deployment

Highlights:
- Using variables per environment
- Secrets
- Reusing actions with templates
- Approval in the workflow
-->

---
---

# Environments

- Used for a **deployment target**
- Allow you to set **environment-specific variables/secrets**
- **Wait timer** can be set
- **Protection rules** can be set
  - You can set an **approval/review process**
  - Limit branches/tags per environment

<br />

```yaml {all|4-5}{lines:true}
jobs:
  production-deploy:
    runs-on: ubuntu-latest
    environment:
      name: azure
```

---

# Secrets

- Sensitive information
- Levels:
  - Repository
  - Environment
  - Organization
- Access policy on organization-level
- Values are masked in build outputs
- Set as input or environment variable to use them

---
---

# Highlights

- Use **environment-specific** variables and secrets
- Reuse actions with **custom actions**
- Set an **approval process** for the deployment
- Set `secrets.{name}` to use the secret in the workflow

---
layout: cover
background: ./slides/ideas.jpg
---

# There is a lot more to discover

<!--
- Show the GitHub Actions Marketplace
- Creating your own actions
- Matrix builds
- Debugging GitHub Actions -> Set the `ACTIONS_RUNNER_DEBUG` variable to `true` in the workflow
- Running actions locally with act - https://github.com/nektos/act
-->

---
---

# Debugging

- Detailed logging via `ACTIONS_RUNNER_DEBUG` secret/variable is `true`
- Enable **debug logging** on workflow re-run

<img src="/slides/debug-logging.png" style="height: 65%; margin: 0 auto;" />

---
---

# Running actions locally

By using the [act](https://nektosact.com/) tool, you can run your workflows locally

```bash
# Install
brew install act

# Run
act
```

---
---

# There is still more to explore

- GitHub Actions Marketplace
- Create your actions and distribute them
- Matrix builds -> automatically create multiple jobs
- Use [GitHub Actions for VSCode extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)

---
---

# Slides: github-actions.xavidop.me

<style>
  .slidev-layout.default {
    background: url(/slides/thankyou.jpg) no-repeat center center !important;
    position: relative;
  }

  h1 {
    position: absolute !important;
    bottom: 0.5rem;
    left: 7rem;
    color: #000 !important;
  }

  h1::before {
    background: #84DFD2 !important;
  }
</style>

---
layout: about-me
imageSrc: ./profile/xavidop.jpg
helloMsg: The end! 👋
name: Xavier Portilla Edo
job: Head of Cloud Infrastructure
line1: "Voiceflow"
social1: "@xavidop"
social2: xavidop.me
social3: 'Thanks Elio Struyf for the slides!'
---
