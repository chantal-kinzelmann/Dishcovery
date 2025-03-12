import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http:HttpClient) { }

  recieveUser() {
    const result$ = this.http.get<{ users: User[] }>(
      "http://localhost:3000/users"
    );
    return result$.pipe(
      map( (body: {users: User[]}) => {   // typisiert den product: Product[] und macht ihn sozusagen "verarbeitbar" und nur das Array wird zurückgegeben 
        return body.users;
      })
    );
  }
}
