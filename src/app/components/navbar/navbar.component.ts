import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { StockService } from '@services/stock.service';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StockDialogComponent } from '@components/stock-dialog/stock-dialog.component';
import { User } from '@models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService, DialogService]
})
export class NavbarComponent {
  public user: User | null;
  public visible: boolean = false;
  public uploadedFiles: any[] = [];
  private ref: DynamicDialogRef | undefined;
  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private stockService: StockService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.user = this.userService.getUserByToken();
  }

  ngOnInit(): void {
    this.initializeMenu();
  }

  async initializeMenu(): Promise<void> {
    const yearsBase = await this.getYears();
    const minYear = Math.min(...yearsBase);

    const currentYear = new Date().getFullYear();

    const years = [];
    for (let year = minYear; year < currentYear; year++) {
      years.push(year);
    }
    
    const yearItems = years.map(year => ({
      label: year.toString(),
      command: () => {
        this.openIncomeTax(year);
      }
    }));

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Stock',
        icon: 'pi pi-chart-line',
        visible: this.isLoggedIn(),
        items: [
          {
            label: 'Create',
            icon: 'pi pi-plus-circle',
            visible: this.isLoggedIn(),
            command: () => {
              this.openDialog('100ms', '100ms');
            }
          },
          {
            label: 'Import',
            icon: 'pi pi-upload',
            visible: this.isLoggedIn(),
            command: () => {
              this.showDialogUpload();
            }
          }
        ]
      },
      {
        label: 'Income Tax',
        icon: 'pi pi-calculator',
        visible: this.isLoggedIn(),
        command: () => {
          this.router.navigate(['/']);
        },
        items: yearItems
      },
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
        style: { 'right': '0px', 'position': 'absolute' },
        command: () => {
          this.logout();
        }
      }
    ];
  }

  async handleUpload(event: any) {
    const files: FileList = event.files;
    const batchSize = 1;
    let allFiles: any[] = [];
    const filePromises: Promise<any>[] = [];

    for (let i = 0; i < files.length; i += batchSize) {
      const batch = Array.from(files).slice(i, i + batchSize);

      for (const file of batch) {
        const fileContent = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            resolve(evt.target?.result);
          };
          reader.onerror = (err) => {
            reject(err);
          };
          reader.readAsDataURL(file);
        });

        allFiles.push(fileContent);
      }

      const batchPromise = this.stockService.postImportFiles(allFiles).toPromise();
      allFiles = [];
      filePromises.push(batchPromise);

      try {
        const result = await batchPromise;

        if (result) {
          const messages: any[] = [];
          for (let index = 0; index < result.length; index++) {
            const element: any = result[index];
            const action = element.isSuccess ? 'success' : 'error';
            messages.push({ severity: action, summary: `Invoice ${element.invoice}`, detail: element.message });
          }
          this.messageService.addAll(messages);
        }
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
    this.visible = false;
  }

  showDialogUpload() {
    this.visible = true;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.ref = this.dialogService.open(StockDialogComponent, {
      header: 'Stock Dialog',
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((result: any) => {
      if (result) {
        // Handle result
      }
    });
  }

  openIncomeTax(year: number): void {
    this.router.navigate([`/incometax/${year}`]);
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

   async getYears(): Promise<number[]> {
    const years = await this.stockService.getYears().toPromise();
    return years ?? [];
  }
}