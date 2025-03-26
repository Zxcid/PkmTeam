import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {RoutingService} from "./shared/services/routing.service";
import {__appSections, __emptyCurrentSection, IAppSections} from "./shared/constants/routing.constants";
import {UtilsService} from "./shared/services/utils.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'PkmTeam';

  constructor(
    private _router: Router,
    private _routingService: RoutingService
  ) {
    this.setCurrentSection();
    this.subscribeToRouterEvents();
  }

  /**
   * Get current section by current url
   * Set current section match url with the list of __appSections
   * If no match found then set current section as empty
   */
  setCurrentSection(): void {
    const route: string = this._router.url;

    const currentSection: IAppSections | undefined = __appSections.find((element: IAppSections): boolean => element.route === route);

    if (UtilsService.isVoid(currentSection)) {
      this._routingService.appSection = __emptyCurrentSection;
      return;
    }

    this._routingService.appSection = currentSection;
  }

  /** Subscription to Router events in order to set the right active link */
  subscribeToRouterEvents(): void {
    this._router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
          this.setCurrentSection();
        }
      );
  }
}
