import {AppRoutingBuilder} from "../classes/app-routing-builder";

export enum ESections {
  other = '**',
  layout = '',
  home = 'home',
  login = 'login',
  teams = 'teams',
  new_team = 'new-team'
}

export interface IAppSections {
  key: ESections | '',
  route: string,
  title: string,
  menuLabel?: string,
  active?: string
}

export const __appSections: IAppSections[] = [
  {
    key: ESections.layout,
    route: AppRoutingBuilder.fullPath([ESections.layout]),
    title: 'Layout'
  },
  {
    key: ESections.login,
    route: AppRoutingBuilder.fullPath([ESections.login]),
    title: 'Login'
  },
  {
    key: ESections.home,
    route: AppRoutingBuilder.fullPath([ESections.home]),
    title: 'Home'
  }
];

export const __emptyCurrentSection: IAppSections = {
  key: '',
  route: '',
  title: ''
};

export const __menuSections: IAppSections[] = [
  {
    key: ESections.home,
    route: AppRoutingBuilder.fullPath([ESections.home]),
    title: 'Home'
  }
];
