var errMessage;
var httpCode;

class apiError extends Error {
    constructor(errCode, msg) {
        switch (errCode) {
            case 300:
                errMessage = "Your request could not be completed because it was not properly authenticated.";
                httpCode = 401;
                break;
            
            case 301:
                errMessage = "A valid access token is required to access this resource.";
                httpCode = 401;
                break;

            case 302:
                errMessage = "You must be authenticated as a user to take this action.";
                httpCode = 401;
                break;

            case 310:
                errMessage = "The provided access token is invalid, or cannot be used with the provided parameters.";
                httpCode = 401;

            case 311:
                errMessage = "The provided refresh token is invalid, or cannot be used with the provided parameters.";
                httpCode = 400;
                break;

            case 312:
                errMessage = "The provided access token or refresh token does not match the given bearer token.";
                httpCode = 401;
                break;

            case 320: 
                errMessage = "The provided refresh token cannot be used to renew an access token. Client login should be attempted.";
                httpCode = 403;
                break;

            case 700:
                errMessage = "The requested operation is not permitted on this resource.";
                httpCode = 412;
                break;

            case 701: 
                errMessage = msg;
                httpCode = 412;
                break;

            case 23505:
                errMessage = msg;
                httpCode = 409;
                break;

            default:
                errCode = 303
                errMessage = "There was an error connecting to the server";
                httpCode = 502;
                break;
        }
        super(errMessage);
        this.errCode = errCode;
        this.httpCode = httpCode;
    }

    output() {
        return {
            "message": this.message,
            "errCode": this.errCode,
            "httpCode": this.httpCode
        }
    }

}

module.exports = apiError;