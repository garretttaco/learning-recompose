import 'mocha/mocha.css'

const div = document.createElement('div')
div.setAttribute('id', 'mocha')
document.body.appendChild(div)
const mocha = require('imports?global=>window!./mocha-browser')
window.mocha.setup('bdd')
setTimeout(() => window.mocha.run(), 0)
