import { IAbility, INature, IPokemon } from "./pokemon.model"

export interface ITeamPokemonRequest {
  pkPokemon: number,
  pkAbility: number,
  pkNature: number
}

export interface ITeamRequest {
  teamName: string,
  teamPokemonRequest: ITeamPokemonRequest[]
}

export interface ITeamPokemon {
  userTeamId: number,
  teamMember: number,
  pokemon: IPokemon,
  ability: IAbility,
  nature: INature
}

export interface ITeamDto {
  pkUserTeam: number,
  name: string,
  createdAt: string,
  teamMembers: ITeamPokemon[]
}
