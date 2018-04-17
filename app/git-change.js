exports.Reword = class {
  constructor(state, commit, newMessage) {
    this.state = state
    this.commit = commit
    this.newMessage = newMessage
  }

  async apply() {
    const followingCommits = this.state
  }
}