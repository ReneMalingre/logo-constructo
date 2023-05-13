// output colored text to the console
const outputGreenBoldText = (text) => console.log(`\x1b[1m\x1b[32m${text}\x1b[0m`)
const outputYellowText = (text) => console.log(`\x1b[33m${text}\x1b[0m`)
const outputRedText = (text) => console.log(`\x1b[31m${text}\x1b[0m`)

module.exports = {
  outputGreenBoldText,
  outputYellowText,
  outputRedText
}
