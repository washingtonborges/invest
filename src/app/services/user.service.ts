import { Injectable } from '@angular/core';
import { User } from '@models/user/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private authService: AuthService) {}

  public getUserByToken(): User | null {
    const tokenPayload: any = this.authService.getToken();
    if (!tokenPayload) {
      return null;
    }
    return {
      id: tokenPayload.id,
      name: tokenPayload.name,
      email: tokenPayload.email,
    };
  }
}
