import CorruptedDataException from "./exceptions/CorruptedDataException";
import InvalidNESFileException from "./exceptions/InvalidNesFileException";
import InvalidROMSizeException from "./exceptions/InvalidROMSizeException";
import UnknownMapperException from "./exceptions/UnknownMapperException";
import type Mapper from "./mapper";
import Mapper000 from "./mapper___000";

type AddressSpace = 'CPU' | 'PPU'

type MirroringMode = 'VERTICAL' | 'HORIZONTAL'


// Incomplete for now
interface INESHeader {
    magic: string;
    prgRomSize: number;
    chrRomSize: number;
    mirroring: MirroringMode;
    mapperId: number;
}


class Cartridge {
	public PRGMemory: Uint8Array = new Uint8Array
	public CHRMemory: Uint8Array = new Uint8Array
    public PRGRomChunks: number = 0
    public CHRRomChunks: number = 0
    public mirroring: MirroringMode = 'HORIZONTAL'
    public mapperId: number = -1

    private constructor() {}

    public static insert(data: Buffer): Mapper {
        const cartridge = new Cartridge()

        if (data.byteLength < 16 || data.toString('ascii', 0, 4) !== 'NES\x1A') {
            throw new InvalidNESFileException
        }

        cartridge.PRGRomChunks = data.readUint8(4)
        cartridge.CHRRomChunks = data.readUint8(5)

        if (cartridge.PRGRomChunks === 0 || cartridge.CHRRomChunks === 0) {
            throw new InvalidROMSizeException
        }

        cartridge.mirroring = (data.readUInt8(6) & 0x01) === 0 ? 'HORIZONTAL' : 'VERTICAL'
        cartridge.mapperId = ((data.readUint8(7) & 0xF0) >> 4) | (data.readUint8(8) >> 4)

        const PRG_MEMORY_START = (data.readUint8(6) & 0x04) ? 512 + 16 : 16
        const PRG_MEMORY_END = PRG_MEMORY_START + (cartridge.PRGRomChunks * 16 * 1024)
        const CHR_MEMORY_START = PRG_MEMORY_END + 1
        const CHR_MEMORY_END = CHR_MEMORY_START + (cartridge.CHRRomChunks * 8 * 1024)

        cartridge.PRGMemory = data.subarray(PRG_MEMORY_START, PRG_MEMORY_END)
        cartridge.CHRMemory = data.subarray(CHR_MEMORY_START, CHR_MEMORY_END)

        switch (cartridge.mapperId) {
            case 0:
                return new Mapper000(cartridge)
            default:
                throw new UnknownMapperException
        }
    }
}

export default Cartridge


        /**
         *       
         * 
          magic: buffer.toString('ascii', 0, 4),
        prgRomSize: buffer.readUInt8(4) * 16 * 1024, // Convert to bytes
        chrRomSize: buffer.readUInt8(5) * 8 * 1024,  // Convert to bytes
        flags6: flags6,
        flags7: flags7,
        prgRamSize: buffer.readUInt8(8) * 8 * 1024,  // Convert to bytes
        unused: Array.from(buffer.slice(9, 16)),
        verticalMirroring: (flags6 & 0x01) !== 0,
        batteryBackedRAM: (flags6 & 0x02) !== 0,
        trainer: (flags6 & 0x04) !== 0,
        fourScreenVRAM: (flags6 & 0x08) !== 0,
        mapperId: ((flags7 & 0xF0) >> 4) | (flags6 >> 4),
         */