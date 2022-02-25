import { Response } from "express-serve-static-core";

// Wrap a json reply with a code and message
function reply(res: Response, code: number, body: object) {
    res.status(code).json({
        header: {
            code: code,
            message: getMessage(code)
        },
        body: body
    });
}

// Get a message regarding a http code
function getMessage(code: number) {
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
export default reply;