class CorruptedDataException extends Error {
    constructor(message: string = 'The NES file data is corrupted.') {
        super(message);
        this.name = "MissingDataError";
    }
}

export default CorruptedDataException
