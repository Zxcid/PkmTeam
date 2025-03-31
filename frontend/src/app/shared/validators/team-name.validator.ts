import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { TeamsService } from '../services/teams.service';

export function teamNameValidator(teamsService: TeamsService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return of(control.value).pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap((name: string) => {
                if (!name || name.trim() === '') return of(null); // Skip validation if empty
                return teamsService.checkTeamNameAvailability(name)
                    .pipe(
                        map(isAvailable => (isAvailable ? null : { teamNameTaken: true })),
                        catchError(() => of(null)) // fallback: no error shown
                    );
            })
        );
    };
}
