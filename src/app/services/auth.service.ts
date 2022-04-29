import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators'
import { TokenService } from './token.service';
// Not good practice to define API url here but it takes too much time to configure correctly
const AUTH_API = 'http://localhost:5000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface Credential {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAuthStatus() {
    const token = this.tokenService.getToken();
    return token ? true : false;
  }

  login({username, password}: Credential) {
    return this.http.post<any>(AUTH_API + 'login', {
      username, password
    }, httpOptions)
  }
}
