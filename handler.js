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
    if (isNaN(number)) {
      throw new Error("Not a number")
    }
    if (number > 40) {
      throw new Error("Number must be less than or equal to 40");
    }
    output = fib(number);
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: output
      })
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    }
  }
};