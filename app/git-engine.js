exports.GitEngine = class {
  constructor(repoPath) {
    this.git = require('simple-git')(repoPath);

    this.git.checkIsRepo((_, isRepo) => {
      if (!isRepo) throw `${projectDir} is not a Git repo`
    })
  }
}

/*
.add([fileA, ...], handlerFn) 	adds one or more files to be under source control

.commit(message, handlerFn) 	commits changes in the current working directory with the supplied message where the message can be either a single string or array of strings to be passed as separate arguments (the git command line interface converts these to be separated by double line breaks)
.commit(message, [fileA, ...], options, handlerFn) 	commits changes on the named files with the supplied message, when supplied, the optional options object can contain any other parameters to pass to the commit command, setting the value of the property to be a string will add name=value to the command string, setting any other type of value will result in just the key from the object being passed (ie: just name), an example of setting the author is below

.diff(options, handlerFn) 	get the diff of the current repo compared to the last commit with a set of options supplied as a string
.diff(handlerFn) 	get the diff for all file in the current repo compared to the last commit
.diffSummary(handlerFn) 	gets a summary of the diff for files in the repo, uses the git diff --stat format to calculate changes. Handler is called with a nullable error object and an instance of the DiffSummary
.diffSummary(options, handlerFn) 	includes options in the call to diff --stat options and returns a DiffSummary

.rebase([options,] handlerFn) 	Rebases the repo, options should be supplied as an array of string parameters supported by the git rebase command, or an object of options (see details below for option formats).

.stashList([options, ][handlerFn]) 	Retrieves the stash list, optional first argument can be an object specifying options.splitter to override the default value of :, alternatively options can be a set of arguments as supported by the git stash list command.

.stash([options, ][ handlerFn]) 	Stash the working directory, optional first argument can be an array of string arguments or options object to pass to the git stash command.

.status(handlerFn) 	gets the status of the current repo

.show([options], handlerFn) 	Show various types of objects, for example the file content at a certain commit. options is the single value string or array of string commands you want to run

.exec(handlerFn) 	calls a simple function in the current step

-----

Allow create commits ready for changes
https://stackoverflow.com/questions/12470029/how-to-commit-no-change-and-new-message

For commit metadata?
https://git-scm.com/docs/git-notes
*/