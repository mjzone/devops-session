'use strict';

module.exports.generate = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello from fib generator',
      },
      null,
      2
    ),
  };
};
