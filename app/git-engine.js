const projectDir = '/Users/dnahodil/dnahodil-github/test-repo/'
const sg = require('simple-git')(projectDir);

console.log(`Loaded git in ${projectDir}`)

sg.checkIsRepo((_, isRepo) => {
  if (!isRepo) throw `${projectDir} is not a Git repo`
})