import { IPokemon } from "./pokemon.model"

export interface ICreateTeamRequest {
  teamName: string,
  pkPokemons: number[]
}

export interface ITeamDto {
  pkUserTeam: number,
  name: string,
  createdAt: string,
  teamMembers: IPokemon[]
}
