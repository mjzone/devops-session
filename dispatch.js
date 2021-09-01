const zlib = require('zlib');
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-east-1" });
const logzio = require('logzio-nodejs');

const logger = logzio.createLogger({
    token: process.env.logzio_token,
    type: 'CRITICAL'
});

const generateEmailContent = (data) => {
    let logData = "<br/><h2><u>Application Logs</u></h2>";
    logData += `<p style='color: red; font-size: 16px;'><b>Status:</b>${data.type}</p>`;
    logData += `<p style='font-size: 14px;'><b>Stage:</b>${data.context.stage}</p>`;
    logData += `<p style='font-size: 14px;'><b>IP:</b>${data.context.sourceIp}</p>`;
    logData += `<p style='font-size: 14px;'><b>URL Path:</b>${data.context.path}</p>`;
    logData += `<p style='font-size: 14px;'><b>HTTP Method:</b>${data.context.httpMethod}</p>`;
    logData += `<p style='font-size: 14px;'><b>Message:</b>${data.message}</p>`;
    logData += `<p style='font-size: 14px;'><b>Callstack:</b>${data.callstack || 'N/A'}</p>`;

    let subject = `Critical Alert - Fib generator API`;

    let emailContent = {
        Destination: {
            ToAddresses: ["manojdevopssession@gmail.com"]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: logData
                },
                Text: {
                    Charset: "UTF-8",
                    Data: logData
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        },
        Source: "manojdevopssession@gmail.com",
        SourceArn: "arn:aws:ses:us-east-1:885121665536:identity/manojdevopssession@gmail.com",
        Tags: [
            {
                Name: "sender",
                Value: "Manoj"
            }
        ]
    };

    return emailContent;
}

exports.handler = (input, context) => {
    let payload = Buffer.from(input.awslogs.data, 'base64');
    zlib.gunzip(payload, (e, result) => {
        if (e) {
            context.fail(e);
        } else {
            result = JSON.parse(result.toString('ascii'));
            const latestLogEvent = result.logEvents[0];
            let data = JSON.parse(latestLogEvent.message.split('INFO')[1].trim());

            // Send Email
            ses.sendEmail(generateEmailContent(data), (err, result) => {
                if (err) console.log(err);
                else {
                    // Log in logz.io
                    logger.log(data);
                    context.succeed();
                }
            });
        }
    });
};