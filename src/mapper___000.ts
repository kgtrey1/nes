import type Cartridge from "./cartridge";
import Mapper, { AddressSpace } from "./mapper";

class Mapper000 extends Mapper {
    constructor(cartridge: Cartridge) {
        super(cartridge)
    }

    public read(address: number, addressSpace: AddressSpace): number {
        this.cartridge // doesn work
        return 0
    }

    public write(address: number, value: number, addressSpace: AddressSpace): void {
        return
    }
}

export default Mapper000