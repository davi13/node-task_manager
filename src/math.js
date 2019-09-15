const calculateTip = (total, tiPercent = .25) => total + (total * tiPercent);

const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;


const celsiusToFahrenheit = (temp) => (temp * 1.8) + 32;


module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}