import type Cartridge from "./cartridge";
import Mapper, { AddressSpace } from "./mapper";

class Mapper000 extends Mapper {
    private PRGRam: Uint8Array = new Uint8Array(0x1FFF)

    constructor(cartridge: Cartridge) {
        super(cartridge)
    }

    public read(address: number, addressSpace: AddressSpace): number {
        if (addressSpace === 'CPU') {
            if (address >= 0x6000 && address <= 0x7FFF) {
                return this.PRGRam[address - 0x6000] // this might need tweaking with memory
            } else if (address >= 0x8000 && address <= 0xBFFF) {
                return this.cartridge.PRGMemory[address & (this.cartridge.PRGRomChunks > 1 ? 0x7FFF : 0x3FFF)]
            }
        } else {
            if (address >= 0x0000 && address <= 0x1FFF) {
                return this.cartridge.CHRMemory[address]
            }
        }
        return 0
    }

    public write(address: number, value: number, addressSpace: AddressSpace): void {
        /** This mapper should not write anywhere but since some cartridge can have ram I'll come back later */
        return
    }
}

export default Mapper000