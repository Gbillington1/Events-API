class apiError extends Error {
    constructor(code, msg) {
        super(msg);
        this.code = code;
    }

    output() {
        return {
            "message": this.message,
            "code": this.code
        }
    }
}

module.exports = apiError;