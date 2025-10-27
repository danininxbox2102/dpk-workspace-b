export default class RestError {

    public code: string;
    public message: string;
    public fields?: string[];

    constructor(code: string, message: string, fields?: string[]) {
        this.code = code;
        this.message = message;
        this.fields = fields;
    }

}
