const { GitEngine } = require('./git-engine.js')
const { GitState } = require('./git-state.js')
const { bindAction, bindOutput, $ } = require('./binder.js')

const engine = new GitEngine('/Users/dnahodil/dnahodil-github/test-repo/')
const changes = []

const state = new GitState(engine.git)
state.analyseCurrent().then(
  () => displayCommits(state)
)

const originalMessages = {}

function displayCommits(state) {
  state.git.exec(() => {
    let history = []
    let bindings = []

    history.push(`<div class="card">State as at: ${state.createdAt.toString()}</div>`)

    history.push(`
      <div class="card">
        <h4 class="card-header"><code>master</code></h4>
        <div class="card-body">
          <div class="card-text"><em>All existing commits are here</em></div>            
        </div>
      </div>
    `)

    for (let commit of state.data) {
      const {hash: sha, author_name, message} = commit

      history.push(`
        <div class="card">
          <h4 class="card-header"><code>${sha.slice(0, 8)}</code></h4>
          <div class="card-body">
            <div id="${buttonId("commit-message", sha)}" class="card-text">${message}</div>           
          </div>
          <div class="card-footer">
              <span id="${buttonId("edit-controls", sha)}" style="visibility: visible">
                ${makeButton(buttonId("edit-message", sha), "Edit message")}
              </span>
              <span id="${buttonId("editing-controls", sha)}" style="visibility: hidden">
                ${makeButton(buttonId("save-edit-message", sha), "Save")} | ${makeButton(buttonId("cancel-edit-message", sha), "Cancel")}
              </span>
          </div>
        </div>
      `)

      bindings.push({ sha })
    }

    bindOutput('stateDisplay', history.join(''))
    
    for (const { sha } of bindings) {
      bindAction(
        buttonId('edit-message', sha),
        () => startEdits(sha)
      )

      bindAction(
        buttonId('save-edit-message', sha),
        () => applyEdits(sha)
      )

      bindAction(
        buttonId('cancel-edit-message', sha),
        () => cancelEdits(sha)
      )
    }
  })
}

function buttonId(name, sha) {
  return `${name}-${sha}`
}

function makeButton(id, label) {
  return `<a id="${id}" href="#">${label}</a>`;
}

function startEdits(sha) {
  const el = $(buttonId('commit-message', sha))
  originalMessages[sha] = el.innerHTML
  el.contentEditable = true
  el.style.background = '#fffce6'

  toggleVisible(sha)
}

function applyEdits(sha) {
  const el = $(buttonId('commit-message', sha))
  const newMessage = el.innerHTML
  el.contentEditable = false
  el.style.background = '' 
  console.log('Applying message: ' + newMessage)

  console.log('FOllowing: ')
  console.log(state.commitsAfter(sha))

  toggleVisible(sha)
}

function cancelEdits(sha) {
  const el = $(buttonId('commit-message', sha))
  el.innerHTML = originalMessages[sha]
  el.contentEditable = false
  el.style.background = ''

  toggleVisible(sha)
  delete originalMessages[sha]
}

function toggleVisible(sha) {
  const groupIds = [
    buttonId('edit-controls', sha),
    buttonId('editing-controls', sha)
  ]

  for (let groupId of groupIds) {
    const el = $(groupId)
    const existing = el.style.visibility

    el.style.visibility = existing == 'visible' ? 'hidden' : 'visible'
  }
}