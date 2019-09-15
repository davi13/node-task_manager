const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('this should calculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
    // if (total !== 13) {
    //     throw new Error(`total tip should be 13. got ${total}`)
    // }
});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should covert 32 f to 0 C', () => {
    const fahrenheit = fahrenheitToCelsius(32);
    expect(fahrenheit).toBe(0)
});

test('Should covert 32 C to 0 F', () => {
    const celsius = celsiusToFahrenheit(0);
    expect(celsius).toBe(32)
});

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });

test('Should add tow numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});



test('Should add tow numbers async/await', async () => {
    const sum = await add(10, 22);
    expect(sum).toBe(32);
})