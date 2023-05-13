// Class definition for generic Shape object
class Shape {
  constructor (logoSpecification) {
    if (logoSpecification === undefined) {
      this.text = ''
      this.textColour = 'white'
      this.logoFontFamily = 'Arial'
      this.logoTextSize = '70'
      this.color = 'blue'
    } else {
      this.text = logoSpecification.logoText
      this.textColour = logoSpecification.logoTextColour
      this.logoFontFamily = logoSpecification.logoFontFamily
      this.logoTextSize = logoSpecification.logoTextSize
      this.color = logoSpecification.logoShapeColour
    }
  }

  setText (text) {
    this.text = text
  }

  setTextColour (colour) {
    this.textColour = colour
  }

  setFontFamily (fontFamily) {
    this.logoFontFamily = fontFamily
  }

  setTextSize (size) {
    this.logoTextSize = size
  }

  setColor (shapeColour) {
    this.color = shapeColour
  }

  generateSVGText () {
    if (this.text) {
      const fillColor = this.textColour || 'white' // Default to white if no colour is set
      return `<text x="50%" y="50%" font-family="${this.logoFontFamily}" font-size="${this.logoTextSize}px" fill="${fillColor}" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central">${this.text}</text>`
    }
    return ''
  }

  renderLogo () {
    const shapeSVG = this.render()
    const textSVG = this.generateSVGText()
    return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">${shapeSVG}${textSVG}</svg>`
  }
}

// Class definitions for specific shapes that extend the generic Shape class
// Square, Triangle, Circle, Diamond
class Square extends Shape {
  render () {
    return `<rect x="68" y="18" width="164" height="164" fill="${this.color}" />`
  }
}

class Triangle extends Shape {
  render () {
    return `<polygon points="150,18 244,182 56,182" fill="${this.color}" />`
  }
}

class Circle extends Shape {
  render () {
    return `<circle cx="150" cy="100" r="82" fill="${this.color}" />`
  }
}

class Diamond extends Shape {
  render () {
    return `<polygon points="150,18 244,100 150,182 56,100" fill="${this.color}" />`
  }
}

module.exports = {
  Square,
  Triangle,
  Circle,
  Diamond
}
