export class TraitsDTO {
    constructor(
        public extroversion: number,
        public neuroticism: number,
        public agreeableness: number,
        public conscientiousness: number,
        public openness_to_experience: number
    ) {}
}

export class UserCreateDTO {
    constructor(
        public nickname: string,
        public email: string,
        public sex: string,
        public traits: TraitsDTO
    ) {}
}
