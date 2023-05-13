const fs = require('fs')
const inquirer = require('inquirer')
const { Square, Triangle, Circle, Diamond } = require('./lib/shapes')
const { outputGreenBoldText, outputYellowText, outputRedText } = require('./lib/utils')

// Create an array of questions for user input
// with an array of license choices loaded from a JSON file passed in
// validator functions are passed in to validate the user input
let questions = []
function constructQuestions () {
  questions = [
    {
      type: 'input',
      name: 'logoText',
      message: 'Enter up to three characters for the text in the logo:',
      default: 'LCM',
      validate: logoTextValidator
    },
    {
      type: 'list',
      name: 'logoFontFamily',
      message: 'What font would you like your text to be?',
      choices: ['Arial, Helvetica, sans-serif', 'Times New Roman, Times, serif', 'Courier New, Courier, monospace'],
      default: 'Arial, Helvetica, sans-serif',
      validate: ''
    },
    {
      type: 'input',
      name: 'logoTextSize',
      message: 'What font size in px do you want the text to be?',
      default: '70',
      validate: logoTextSizeValidator
    },
    {
      type: 'input',
      name: 'logoTextColour',
      message: 'What colour would you like the text to be (color keyword or hexadecimal number)?',
      default: 'white',
      validate: logoColourValidator
    },
    {
      type: 'list',
      name: 'logoShape',
      message: 'What kind of shape should your logo have?',
      choices: ['circle', 'triangle', 'square', 'diamond'],
      validate: ''
    },
    {
      type: 'input',
      name: 'logoShapeColour',
      message: 'What colour would you like the shape to be (color keyword or hexadecimal number)?',
      default: 'blue',
      validate: logoColourValidator
    },
    {
      type: 'input',
      name: 'logoFileName',
      message: 'What would you like the logo filename to be?',
      default: 'logo.svg',
      validate: logoFileNameValidator
    }
  ]
}

function logoTextValidator (value) {
  if (value.length >= 0 && value.length <= 3) {
    return true
  } else {
    return 'Please enter a valid number of letters, between 0 and 3 inclusive.'
  }
}

function logoTextSizeValidator (value) {
  if (/^-?\d*\.?\d+$/.test(value)) {
    value = parseFloat(value)
    if (value >= 0 && value <= 200) {
      return true
    } else {
      return 'Please enter a valid number of pixels, between 0 and 200 inclusive.'
    }
  } else {
    return 'Please enter a valid number of pixels.'
  }
}

function logoColourValidator (value) {
  if (value.length === 0) {
    return 'Please enter a valid colour.'
  } else {
    // ensure the colour is valid
    const validColour = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
    if (validColour) {
      return true
    } else {
      // not a hex code, so try a colour keyword
      const standardColour = findColourInStandardList(value)
      if (standardColour) {
        return true
      } else {
        return 'Please enter a valid colour, either a hex colour or a standard CSS/JS colour name.'
      }
    }
  }
}

// check if the user's selected colour is in the list
let colourList = []
function findColourInStandardList (userEntry) {
  if (colourList.length === 0) {
    // load the colour list from the JSON file
    const loadedColours = JSON.parse(fs.readFileSync('./lib/colors.json', 'utf8'))
    colourList = loadedColours.colors
  }
  // remove any leading or trailing spaces, convert to lowercase, and remove any spaces in the middle
  const simplifiedInput = userEntry.trim().toLowerCase().replace(/\s/g, '')
  // find the colour in the list
  return colourList.find(colour => colour.toLowerCase() === simplifiedInput)
}

// convert the user's selected colour to a standard name
function convertColourToStandardName (userEntry) {
  const standardColour = findColourInStandardList(userEntry)
  if (standardColour) {
    // found a match, so return the standard colour
    return standardColour
  } else {
    // would be a hex colour, so return the original value
    return userEntry
  }
}

// ensure that the user entered just a filename, ending in svg
function logoFileNameValidator (value) {
  if (value.length === 0) {
    return 'Please enter a valid filename.'
  } else {
    // ensure the filename is valid
    const validFilename = /^[^\\/]+\.(svg)$/.test(value.toLowerCase().trim())
    if (validFilename) {
      return true
    } else {
      return 'Please enter a valid filename.'
    }
  }
}

// ask the questions and return the answers
// command line input
async function askQuestions () {
  let answers = {}
  for (const question of questions) {
    const answer = await inquirer.prompt([question])
    answers = { ...answers, ...answer }
  }
  return answers
}

// initialize the app
async function init () {
  // Call the function that constructs the questions
  constructQuestions()

  // give some instructions
  outputRedText('\nWelcome to the Logo-Constructo!\n')
  outputGreenBoldText('Answer the following questions to create your logo:')

  // Call the function that asks the questions and returns the answers
  const answers = await askQuestions().catch((error) => {
    console.error('Error asking questions:', error)
  })

  // convert the colours to a standard name
  answers.logoTextColour = convertColourToStandardName(answers.logoTextColour)
  answers.logoShapeColour = convertColourToStandardName(answers.logoShapeColour)

  // create the logo
  let logo = ''
  switch (answers.logoShape.toLowerCase()) {
    case 'circle':
      logo = new Circle(answers)
      break
    case 'triangle':
      logo = new Triangle(answers)
      break
    case 'square':
      logo = new Square(answers)
      break
    case 'diamond':
      logo = new Diamond(answers)
      break
    default:
      console.log('Error: unknown shape')
      return
  }
  // write the logo to a file
  const saveDirectory = './examples/'
  fs.writeFileSync(`${saveDirectory}${answers.logoFileName}`, logo.renderLogo())
  outputYellowText(`\nGenerated ${answers.logoFileName}`)
  outputGreenBoldText(`\nLogo saved to ${saveDirectory}${answers.logoFileName}\n`)
}

// Function call to initialize app
init()
