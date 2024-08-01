class InvalidROMSizeException extends Error {
    constructor(message: string = 'Invalid PRGRomSize or CHRRomSize.') {
        super(message);
        this.name = "InvalidROMSizeError";
    }
}

export default InvalidROMSizeException
