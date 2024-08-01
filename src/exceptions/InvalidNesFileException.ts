class InvalidNESFileException extends Error {
    constructor(message: string = 'Invalid NES file.') {
        super(message);
        this.name = "InvalidNESFileError";
    }
}

export default InvalidNESFileException
