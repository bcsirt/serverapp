import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, startWith, pipe, BehaviorSubject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { DataState } from './enum/data-state-enum';
import { Status } from './enum/status.enum';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  readonly Status = Status;
  private filterSubject = new BehaviorSubject<string>('');
  filterStatus$ = this.filterSubject.asObservable();


  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.server$
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED_STATE, appData: response }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: error })
        })
      );
  }
}
