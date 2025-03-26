import {Injectable} from '@angular/core';
import {__emptyCurrentSection, IAppSections} from "../constants/routing.constants";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  /** IAppSection */
  private _appSection: IAppSections | undefined = __emptyCurrentSection;

  /** @ignore */
  constructor() {}

  /**
   * Set appSection
   * @param appSection
   */
  set appSection(appSection: IAppSections | undefined) {
    this._appSection = appSection;
  }

  /**
   * Get appSection
   * @return IAppSection
   */
  get appSection(): IAppSections | undefined {
    return this._appSection;
  }
}
