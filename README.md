# Git Perfector
:scissors: A Git client for making things just so.

This project is an attempt to make a [Git](https://git-scm.com/) client which removes the friction from the workflow I have currently found myself using. I know there are a million Git GUIs out there but I haven't found one that focusses on this type of work.

## My workflow
We use feature branching for our general workflow and one thing that I've found is that the commits I make in my work do not generally reflect my understanding of the work when it comes time to put up my pull request. We don't squash commits on a branch for merging, and I like commits which are clear and make a single logical change. I generally don't want to leave missteps and wrong paths taken in my commit history. I don't believe that anyone actually studies a Git history to learn from those and I think that they could be actively harmful for someone trying to understand a code change without realising that it was later (without ever having been released) made redundant or refactored. Generally this rebasing to tidy up a branch is only done before it is put up for review as a PR.

Things I might do with a rebase before putting my code up for review:
- Remove print statements. I can leave them in until the work is ready, but remove them without creating extra commits.
- Fix typos. There's no value in having a commit to fix a typo if no-one has seen the work yet.
- Tweak commit messages.
- Rearrange commits if they happened in an odd order. This often happens because you learn more about a problem as you solve it.

## What I hope to achieve
I hope to have a simple tool which helps speed up my current workflow. Mainly to make it easier to do a number of small interactive rebases.

This tool is intended only to improve the process of doing a number of small number of interactive rebases on a branch to make it ready for a PR. It is not intended to be anything close to a full-featured Git GUI.

The tool will let me: (on a branch)
- Rearrange commits easily (ideally drag-and-drop)
- Edit commit messages
- Navigate between commits (and make changes to earlier commits)

The tool wont try to:
- Handle merge conflicts
- Fetch, pull, push, branch, etc.
- Show the Git tree (just the commits on a single branch)
- Do any other things that Git can do