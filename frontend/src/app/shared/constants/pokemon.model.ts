export interface IPokemon {
    pkPokemon: number,
    index: number,
    name: string,
    height: number,
    weight: number,
    baseExperience: number,
    spriteRef: string,
    spriteUrl: string,
    types: string[]
}

export interface IStat {
    pkStat: number,
    name: string
}

export interface INature {
    pkNature: number,
    name: string,
    malusStat: IStat,
    bonusStat: IStat
}

export interface IAbility {
    pkAbility: number,
    name: string,
    description: string
}
