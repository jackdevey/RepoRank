import { Response } from "express-serve-static-core";

// Wrap a json reply with a code and message
function Reply(res: Response, code: number, body: object) {
    res.status(code).json({
        header: {
            code: code,
            message: GetMessage(code)
        },
        body: body
    });
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
