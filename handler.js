'use strict';

// Calculating the fibonacci value
const fib = (n) => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

module.exports.generate = async (event) => {
  let output = 0;
  try {
    const number = parseInt(event.pathParameters.number);
    if (number) {
      output = fib(number);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: output
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
};