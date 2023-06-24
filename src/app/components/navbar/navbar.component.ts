import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StockDialogComponent } from '@components/stock-dialog/stock-dialog.component';
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

  constructor(private authService: AuthService, private userService: UserService, public dialog: MatDialog) {
    this.user = this.userService.getUserByToken();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(StockDialogComponent, {
      width: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
