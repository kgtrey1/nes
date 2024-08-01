import type Cartridge from "./cartridge"

export type AddressSpace = 'CPU' | 'PPU'

export default abstract class Mapper {
    protected cartridge: Cartridge

    constructor(cartridge: Cartridge) {
        this.cartridge = cartridge
    }
    public abstract read(address: number, addressSpace: AddressSpace): number
    public abstract write(address: number, value: number, addressSpace: AddressSpace): void
}

// PPU Address space:
// CHR: $0000 to $1FFF


// CPU Address space:
// Internal RAM:            $0000 - $07FF
// Mirror of RAM:           $0800 - $1FFF (addr & 0x07FF)
// PPU Registers:           $2000 - $2007
// Mirror PPU reg:          $2008 - $3FFF
// APU and I/O Registers    $4000 - $401F
// PRG                      $4020 - $FFFF

// PRG:             $8000 - $FFFF
//


//The PRG-ROM will be mapped from $8000 to $FFFF.
//The CHR-ROM will be mapped from $0000 to $1FFF in the PPU address space.