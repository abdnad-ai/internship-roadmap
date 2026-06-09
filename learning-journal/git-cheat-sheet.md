# Git Cheat Sheet

## Basic Git Commands

git status

Purpose:
Checks the current status of the repository and shows modified, staged, untracked, or clean files.

git add .

Purpose:
Adds all changed files to the staging area.

git add filename

Purpose:
Adds one specific file to the staging area.

git commit -m "message"

Purpose:
Creates a saved checkpoint with a clear message explaining the change.

git push

Purpose:
Uploads local commits to GitHub.

git pull

Purpose:
Downloads the latest changes from GitHub to the local repository.

## Branch Commands

git branch

Purpose:
Shows all local branches and highlights the current branch.

git checkout -b branch-name

Purpose:
Creates a new branch and switches to it.

git checkout main

Purpose:
Switches back to the main branch.

git merge branch-name

Purpose:
Merges another branch into the current branch.

## Simple Workflow

1. Check status
2. Make changes
3. Add changes
4. Commit changes
5. Push changes to GitHub
6. Create Pull Request if needed
7. Merge after review

## My Understanding

This cheat sheet helps me remember the most commonly used Git commands. These commands are important because they support daily development, version control, collaboration, and safe project updates.

## Meaningful Commit Messages

A meaningful commit message clearly explains what was changed. It helps other developers understand the project history without opening every file.

### Good Commit Message Examples

docs: add git workflow overview

docs: add branch workflow notes

docs: add pull request workflow notes

docs: add conflict resolution notes

fix: correct spelling in daily report

chore: create week 1 day 2 files

### Bad Commit Message Examples

update

changes

final

new work

stuff

### Commit Message Pattern

type: short explanation

Common types:

docs -> documentation changes

fix -> bug fixes

feat -> new feature

chore -> setup or maintenance work

refactor -> code improvement without changing behavior

## My Understanding

Good commit messages make the repository easier to understand and review. For internship work, meaningful commits also show clear progress and professional discipline.
