import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscriber, throwError, pipe} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CustomResponse } from '../interface/custom-response';
import { Injectable } from '@angular/core';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({ providedIn: 'root' })
export class ServerService {



  private readonly apiUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  server$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  save$ = (server: Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  delete$ = (serverID: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverID}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
  new Observable<CustomResponse>(
    Subscriber => {
      console.log(response);
      Subscriber.next(
        status === Status.ALL ? { ...response, message: `Servers filtered by ${status} status`} :
        {
          ...response,
          message: response.data.servers
          .filter(server => server.status === status).length> 0 ? `Servers filtered by
          ${status === Status.SERVER_UP ? 'SERVER UP'
           : 'SERVER DOWN'} status` : `No servers of ${status} found`,
           data: {servers: response.data.servers
          .filter(server => server.status === status)}
        }
      );
      Subscriber.complete();
    }
  )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured - Error code: ${error.status}`);
  }
}


