import { Request, Response } from "express-serve-static-core";

// Wrap a json reply with a code and message
function Reply(req: Request, res: Response, code: number, body: object) {
    // Return json with cors headers
    res.header("Access-Control-Allow-Origin", "*");
    res.status(code).json({
        header: {
            code: code,
            message: GetMessage(code)
        },
        body: body
    });
    // Log the request
    console.log(`[${req.method}] ${req.path} ${code}`)
}

// Get a message regarding a http code
function GetMessage(code: number) {
    switch(code) {
        case 200: return "OK";
        case 400: return "Bad Request";
        case 401: return "Unauthorized";
        case 403: return "Forbidden";
        case 404: return "Not Found";
        case 500: return "Internal Server Error";
        default: return "Unknown";
    }
}

// Export function
export default Reply;
