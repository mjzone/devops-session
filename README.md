- Create the subscription filter 
    - E.g. {$.type = "CRITICAL" && $.context.stage = "dev"}
- Create lambda function
- Send email with SES

## Parallel requests
curl https://smdkyzl9bl.execute-api.us-east-1.amazonaws.com/dev/generate/40 &
curl https://smdkyzl9bl.execute-api.us-east-1.amazonaws.com/dev/generate/39 &
curl https://smdkyzl9bl.execute-api.us-east-1.amazonaws.com/dev/generate/38 &
curl https://smdkyzl9bl.execute-api.us-east-1.amazonaws.com/dev/generate/39 &
curl https://smdkyzl9bl.execute-api.us-east-1.amazonaws.com/dev/generate/40