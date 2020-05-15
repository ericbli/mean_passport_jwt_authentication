import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:Http,
    public jwtHelper:JwtHelperService
  ) { }

  // Reach out to backend API
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  //  return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    return this.http.post('users/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    return this.http.post('users/authenticate', user, {headers: headers})
    .pipe(map(res => res.json()));
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    // Use the token here
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    return this.http.get('users/profile', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Save in LocalStorage
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Fetch from LocalStorage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isTokenExp(){
    return this.jwtHelper.isTokenExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
