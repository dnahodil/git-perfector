$ = exports.$ = (elementId) => document.getElementById(elementId)

exports.bindAction = function(elementId, fn) {
  $(elementId).addEventListener("click", fn)
}

exports.bindOutput = function(elementId, data) {
  $(elementId).innerHTML = data
}