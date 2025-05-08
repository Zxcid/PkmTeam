import { IAbility, INature } from "src/app/shared/constants/pokemon.model";

export interface TeamPokemonForm {
  pkPokemon: number,
  name: string,
  spriteUrl: string,
  types: string[],
  nature: INature,
  ability: IAbility
}
