# Week 1 Day 2 — Git Workflow Learning Journal

## Goal of the Day

Today’s focus is to practice the complete Git workflow, including branches, commits, pull requests, merging, conflict handling, and meaningful commit messages.

## What Git Is

Git is a version control system used to track changes in code and project files. It helps developers save progress, review history, work on different branches, and collaborate safely.

## What GitHub Is

GitHub is an online platform where Git repositories are hosted. It allows developers to push code, create pull requests, review changes, manage issues, and collaborate with others.

## Why Git Workflow Matters

A proper Git workflow helps keep project history clean, makes code review easier, prevents accidental mistakes, and allows multiple developers to work on the same project without overwriting each other’s work. 

## Basic Git Commands Practiced

### git status

`git status` shows the current state of the project. It tells which files are modified, staged, untracked, or ready to commit.

### git add

`git add` moves changes into the staging area before committing. The staging area is where changes are prepared before saving them into Git history.

Example:

git add .


### git commit

`git commit` saves the staged changes as a checkpoint in the project history. Each commit should have a clear message that explains what changed.

Example:

git commit -m "docs: add basic git command notes"


## My Understanding

The normal Git workflow is:

edit files -> git status -> git add -> git commit -> git push


This workflow helps keep my work organized and makes it easier to review project progress step by step.

## Branch Workflow

A branch is a separate workspace in Git. It allows me to work on a new task without directly changing the main branch.

The main branch usually contains stable work. A feature or task branch is used for new changes, practice work, fixes, or experiments.

### Commands Practiced

To check the current branch:

git branch

To create and switch to a new branch:

git checkout -b week-1-day-2-git-workflow

To switch back to the main branch:

git checkout main

To pull the latest changes from GitHub:

git pull origin main

## My Understanding

Using branches keeps work organized and safe. Instead of making changes directly on main, I can work on a separate branch and merge it later after review.

## Push and Pull Workflow

Pushing and pulling are used to sync local work with GitHub.

git push uploads local commits to the remote GitHub repository.

git pull downloads the latest changes from GitHub into the local repository.

### Commands Practiced

To push the current branch to GitHub:

git push -u origin week-1-day-2-git-workflow

To pull the latest changes from the main branch:

git pull origin main

To check whether the local branch is synced:

git status

## My Understanding

The push and pull workflow helps keep local work and GitHub work connected. I should pull before starting important work and push after making commits so my progress is backed up online.

## Pull Request Workflow

A Pull Request is used to review changes before merging them into the main branch.

In a professional workflow, developers usually do not push directly to main. Instead, they create a separate branch, push the branch to GitHub, and open a Pull Request.

### Pull Request Steps

1. Create a task branch

2. Make changes and commits

3. Push the branch to GitHub

4. Open a Pull Request from the task branch into main

5. Review the changes

6. Merge the Pull Request after approval

## My Understanding

A Pull Request makes the workflow safer because it gives a chance to review code before it becomes part of the main project.

## Merge Workflow

Merging is the process of combining changes from one branch into another branch.

In today’s workflow, the Day 2 branch will later be merged into main after the Pull Request is reviewed.

### Merge Commands

To switch to main:

git checkout main

To pull the latest main branch:

git pull origin main

To merge another branch into the current branch:

git merge week-1-day-2-git-workflow

## My Understanding

Merging is used when work from a separate branch is ready to become part of the main project. It should be done carefully after checking that the changes are correct.

