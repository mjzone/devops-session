const log = (event, payload) => {
    const context = {
        path: event.requestContext.path,
        httpMethod: event.requestContext.httpMethod,
        sourceIp: event.requestContext.identity.sourceIp,
        stage: event.requestContext.stage
    }
    payload = { context, ...payload };
    console.log(JSON.stringify(payload));
}

module.exports = log;