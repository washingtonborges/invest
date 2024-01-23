import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StockService } from '@services/stock.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-upload',
  templateUrl: './stock-upload.component.html',
  styleUrls: ['./stock-upload.component.css']
})

export class StockUploadComponent {

  constructor(
    private dialogRef: MatDialogRef<StockUploadComponent>,
    private stockService: StockService,
    private snackBar: MatSnackBar
    ) {}

  selectedFiles: FileList | undefined;

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  async onSubmit() {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const files: FileList = this.selectedFiles;
      const allFiles: any[] = [];
      const filePromises = Array.from(files).map((file: File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (evt) => {
            const fileContent = evt.target?.result;
            allFiles.push(fileContent);
            resolve(fileContent)
          }
          reader.onerror = (err) => {
            reject(err);
          }
          reader.readAsDataURL(file);
        })
      });
      await Promise.all(filePromises as unknown as any[]);
      const result = await this.stockService.postImportFiles(allFiles).toPromise();
      console.log('result', result);
      this.dialogRef.close();
      if(result){
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        for (let index = 0; index < result.length; index++) {
          const element: any = result[index];
          console.log('element', element);
          const customConfig: MatSnackBarConfig = {
            duration: 1000 - (index * 10),
            verticalPosition: 'top', 
          };
          const action = element.isSuccess ? 'Success' : 'Fail';
          this.snackBar.open(`${element.invoice} - ${element.message}`, action, customConfig);
          await delay(customConfig.duration || 0);
        }
      }
    } else {
      console.log('Nenhum arquivo selecionado');
    }
  }

}
