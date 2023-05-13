const { Square, Triangle, Circle, Diamond } = require('./shapes')

test('Render Square', () => {
  const shape = new Square()
  shape.setColor('blue')
  expect(shape.render()).toEqual('<rect x="68" y="18" width="164" height="164" fill="blue" />')
})

test('Render Triangle', () => {
  const shape = new Triangle()
  shape.setColor('red')
  expect(shape.render()).toEqual('<polygon points="150,18 244,182 56,182" fill="red" />')
}
)

test('Render Circle', () => {
  const shape = new Circle()
  shape.setColor('green')
  expect(shape.render()).toEqual('<circle cx="150" cy="100" r="82" fill="green" />')
}
)

test('Render Diamond', () => {
  const shape = new Diamond()
  shape.setColor('#ffff00')
  expect(shape.render()).toEqual('<polygon points="150,18 244,100 150,182 56,100" fill="#ffff00" />')
}
)

test('Render Diamond with text', () => {
  const logoSpecification = {
    logoText: 'ABC',
    logoShape: 'diamond',
    logoShapeColour: '#ffff00',
    logoTextColour: 'red',
    logoTextSize: '40',
    logoFontFamily: 'Arial'
  }
  const shape = new Diamond(logoSpecification)
  expect(shape.renderLogo()).toEqual('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><polygon points="150,18 244,100 150,182 56,100" fill="#ffff00" /><text x="50%" y="50%" font-family="Arial" font-size="40px" fill="red" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central">ABC</text></svg>')
}
)
