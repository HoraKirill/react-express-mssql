export function requestHeader(req, res, next) {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials" : true
    });
    next();
}

