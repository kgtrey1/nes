class UnknownMapperException extends Error {
    constructor(message: string = 'The specified mapper is invalid or not implemented') {
        super(message);
        this.name = "UnknownMapperError";
    }
}

export default UnknownMapperException
