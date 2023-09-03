import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../shared/interfaces/user.interface';
import { tap, of, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { collection } from '../shared/interfaces/table.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // private baseUrl: string = environment?.UrlServer;
  private baseUrl: string = 'http://localhost:3000';

  public email: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  userData = new BehaviorSubject<User | null>(null);
  collection = new BehaviorSubject<collection | null>(null);
  // loadingData = new BehaviorSubject<boolean>(false);
  loadingData = signal(false);

  public get UserIDSessionStorage(): number | null {
    let resultToken = sessionStorage.getItem('token');
    let result;
    resultToken && (result = JSON.parse(atob(resultToken)));
    return result?.token;
  }

  constructor(private http: HttpClient, private router: Router) {}

  //Posible AuthService

  login(email: string, password: string) {
    const url = `${this.baseUrl}/users?email=${email}&password=${password}`;
    return this.http.get<User[]>(url).pipe(
      tap((resp) => {
        if (resp.length == 1) {
          this.userData.next(resp[0]);
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
          this.userData.next(resp[0]);
        } else {
          throw 'El usuario no fue encontrado';
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  geCollections(date: string) {
    const url = `https://api.sandbox.pagos360.com/report/collection/${date}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer NjQwNDMxNGI1YzU0YjllYmVhYjJiZDdmY2E5Y2EyMDg5ZDVlODFmNzRmMDc1OGJmMDY2OTY0NzlhNGJiZWQwNA',
    });

    this.http.get<collection>(url, { headers: headers }).subscribe({
      next: (resp) => {
        this.collection.next(resp);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: err.error.message,
        });
      },
    });
  }
}
