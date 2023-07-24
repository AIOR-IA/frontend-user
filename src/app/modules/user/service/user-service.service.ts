import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUserDto } from '../interface/dto/create-user.to';
import { UpdateUserDto } from '../interface/dto/update-user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_SERVER = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return  this.http.get<User[]>(`${ this.API_SERVER }/users`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${ this.API_SERVER }/users/${ id }`);
  }

  createUser(user: CreateUserDto) {
    console.log(user)
    return this.http.post(`${ this.API_SERVER }/users`, user);
  }

  updateUser(id: string, userData: UpdateUserDto) {
    return this.http.patch(`${ this.API_SERVER }/users/${ id }`, userData);
  }

  changeStatusUser(id: string) {
    return this.http.post(`${ this.API_SERVER }/users/changeStateUser/${ id }`, null );
  }
}
