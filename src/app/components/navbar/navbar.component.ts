import { Component } from '@angular/core';
import { User } from '@models/user/user.model';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public user: User | null;

  constructor(private authService: AuthService, private userService: UserService) {
    this.user = this.userService.getUserByToken();
  }

  logout(): void {
    this.authService.logout();
  }
}
