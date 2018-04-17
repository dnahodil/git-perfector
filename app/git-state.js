exports.GitState = class {
  constructor(git) {
    this.git = git

    this.createdAt = new Date()
  }

  async analyseCurrent() {
    if (this.data) throw "Invalid operation"

    const startCommit = await this.lastMasterCommit()
    
    this.git.log({ from: startCommit, to: 'HEAD' },
      (_, result) => {
        this.data = result.all.reverse()
      //   console.log('result', result)
      //   const commitInfo = []
      //   console.log('data loaded from log', result.all)

      //   for (let commit of result.all) {
      //     this.git.show([commit.hash], (_, info) => {
      //       console.log('Info: ', info)
      //       commitInfo.push(info)
      //     })
      //   }

      //   this.data = commitInfo
      //   console.log(commitInfo)
      }
    )
  }

  async lastMasterCommit() {
    let r
    await this.git.raw(["merge-base", "--fork-point", "master"],
      (_, result) => r = result.trim()
    )
    return r
  }

  commitsAfter(commitHash) {
    console.log('commits after: ' + commitHash)
    let found = false

    return this.data.filter((currentCommit) => {
      console.log('currentCommit: ' + currentCommit)

      if (!found && currentCommit.hash === commitHash) {
        console.log('in')
        found = true
        return false
      }

      console.log(found)
      return found
    })
  }
}