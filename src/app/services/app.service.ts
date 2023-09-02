import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../shared/interfaces/user.interface';
import { catchError, map, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl: string = environment.UrlServer;

  public email: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  user!: User;

  public get dataUser(): User {
    return this.user;
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/users?email=${email}&password=${password}`;

    return this.http.get<User[]>(url).pipe(
      tap((resp) => {
        if (resp.length == 1) {
          this.user = resp[0];
        } else {
          throw 'El correo o la contraseña son incorrectas';
        }
      })
    );
  }
}
