import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-stock-upload',
  templateUrl: './stock-upload.component.html',
  styleUrls: ['./stock-upload.component.css']
})
export class StockUploadComponent {

  constructor(
    private dialogRef: MatDialogRef<StockUploadComponent>,
    private stockService: StockService
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
      this.dialogRef.close();
    } else {
      console.log('Nenhum arquivo selecionado');
    }
  }

}
