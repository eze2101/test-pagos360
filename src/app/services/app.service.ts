import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../shared/interfaces/user.interface';
import { tap, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // private baseUrl: string = environment?.UrlServer;
  private baseUrl: string = 'http://localhost:3000';

  public email: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  private user!: User;

  public get User(): User {
    return this.user;
  }

  public get UserIDSessionStorage(): string | null {
    let resultToken = sessionStorage.getItem('token');
    let result;
    resultToken && (result = JSON.parse(atob(resultToken)));
    return result?.token;
  }

  constructor(private http: HttpClient) {}

  //Posible AuthService

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

  logOut() {
    this.user = undefined!;
    sessionStorage.clear();
  }

  validateAuth(): Observable<boolean> {
    if (!this.UserIDSessionStorage) {
      return of(false);
    } else {
      this.getUser(this.UserIDSessionStorage);
      return of(true);
    }
  }

  getUser(id: string) {
    const url = `${this.baseUrl}/users?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      tap((resp) => {
        if (resp.length == 1) {
          this.user = resp[0];
        } else {
          throw 'El usuario no fue encontrado';
        }
      })
    );
  }
}
