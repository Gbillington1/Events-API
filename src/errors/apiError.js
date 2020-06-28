var errMessage;

class apiError extends Error {
    constructor(errCode, msg) {
        switch (errCode) {
            case 300:
                errMessage = "Your request could not be completed because it was not properly authenticated.";
                super(errMessage);
                this.httpCode = 401;
                break;
            
            case 301:
                errMessage = "A valid access token is required to access this resource.";
                super(errMessage);
                this.httpCode = 401;
                break;

            case 302:
                errMessage = "You must be authenticated as a user to take this action.";
                super(errMessage);
                this.httpCode = 401;
                break;

            case 310:
                errMessage = "The provided access token is invalid, or cannot be used with the provided parameters.";
                super(errMessage);
                this.httpCode = 401;

            case 311:
                errMessage = "The provided refresh token is invalid, or cannot be used with the provided parameters.";
                super(errMessage);
                this.httpCode = 400;
                break;

            case 312:
                errMessage = "The provided access token or refresh token does not match the given bearer token.";
                super(errMessage);
                this.httpCode = 401;
                break;

            case 320: 
                errMessage = "The provided refresh token cannot be used to renew an access token. Client login should be attempted.";
                super(errMessage);
                this.httpCode = 403;
                break;

            case 700:
                errMessage = "The requested operation is not permitted on this resource.";
                this.httpCode = 412;
                super(errMessage);
                break;

            case 701: 
                errMessage = msg;
                super(errMessage);
                this.httpCode = 412;
                break;

            case 23505:
                errMessage = msg;
                super(errMessage);
                this.httpCode = 409;
                break;

            default:
                break;
        }
        this.errCode = errCode;
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