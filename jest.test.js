const { isExpressionWithTypeArguments } = require("typescript")

test('test common matcher', () => {
    expect(2 + 2 ).toBe(4)
    expect(2+ 2).not.toBe(5)
})

test('test to be true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})

test('text number', () => {
    expect(4).toBeGreaterThan(3)
    expect(2).toBeLessThan(3)
})

test('text object', () => {
    expect({name: 'coogie'}).toEqual({name: 'coogie'})
})