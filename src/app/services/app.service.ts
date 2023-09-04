import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { User } from '../shared/interfaces/user.interface';
import { tap, of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Report, collection } from '../shared/interfaces/table.interface';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl: string = environment.UrlServer;
  private urlCollection: string = environment.urlCollection;
  private Authorization: string = environment.Authorization;

  public email: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  userData = signal<User | undefined>(undefined);
  reports = signal<Report[] | undefined>(undefined);
  loadingData = signal(false);

  constructor(private http: HttpClient, private router: Router) {}

  //Posible AuthService

  public get UserIDSessionStorage(): number | null {
    let resultToken = sessionStorage.getItem('token');
    let result;
    try {
      resultToken && (result = JSON.parse(atob(resultToken)));

      return result?.token;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ups!',
        text: 'Error en su sesión de usuario',
      });
      this.logOut();
      return null;
    }
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/users?email=${email}&password=${password}`;
    return this.http.get<User[]>(url).pipe(
      tap((resp) => {
        if (resp.length == 1) {
          this.userData.set(resp[0]);
        } else {
          throw 'El correo o la contraseña son incorrectas';
        }
      })
    );
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  validateAuth(): Observable<boolean> {
    if (!this.UserIDSessionStorage) {
      return of(false);
    } else {
      return of(true);
    }
  }

  getUser() {
    const url = `${this.baseUrl}/users?id=${this.UserIDSessionStorage}`;
    this.http.get<User[]>(url).subscribe({
      next: (resp) => {
        if (resp.length == 1) {
          this.userData.set(resp[0]);
        } else {
          throw 'El usuario no fue encontrado';
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: 'Ocurrio un eror!!',
        });
      },
    });
  }

  //Posible MainService

  getCollections(date: string) {
    const url = `${this.urlCollection}/${date}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.Authorization}`,
    });

    return this.http.get<collection>(url, { headers: headers });
  }
}
