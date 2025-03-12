import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http:HttpClient) { }

  recieveUsers() {
    const result$ = this.http.get<{ users: User[] }>(
      "http://localhost:3000/users"
    );
    return result$.pipe(
      map( (body: {users: User[]}) => {   // typisiert den product: Product[] und macht ihn sozusagen "verarbeitbar" und nur das Array wird zurückgegeben 
        return body.users;
      })
    );
  }

  recieveUserById(id: string) {
    const result$ = this.http.get<{ user: User }>(
      `http://localhost:3000/users/${id}`
    );
    return result$.pipe(
      map( (body: {user: User}) => {   
        return body.user;
      }
    ));
  }

  updateUser(id: string, data: any) {
    return this.http.put(`http://localhost:3000/users/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }

  createUser(user: any) {
    return this.http.post("http://localhost:3000/users", user);
  }


}
