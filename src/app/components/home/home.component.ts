import { Component } from '@angular/core';
import { User } from '@models/user/user.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public user: User | null;

  constructor(private authService: AuthService, private userService: UserService) {
    this.user = this.userService.getUserByToken();
  }

  logout(): void {
    this.authService.logout();
  }
}
