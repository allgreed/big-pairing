import { TraitsDTO } from './TraitsDTO';

export class RegisterDTO {
    constructor(
        public nickname: string,
        public email: string,
        public sex: string,
        public traits: TraitsDTO
    ) {}
}
