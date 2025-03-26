import {IPokemon} from "./pokemon.model";

export interface ITeam {
  id: string,
  name: string,
  members: IPokemon[]
}

export const __teams_mock: ITeam[] = [
{
    id: '1',
    name: 'Team 1',
    members: []
  },
  {
    id: '2',
    name: 'Team 2',
    members: []
  },
  {
    id: '3',
    name: 'Team 3',
    members: []
  }
];
