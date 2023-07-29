import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WppService } from 'src/app/shared/service/wpp.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {
  selectedFile!: File;
  

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private wppService: WppService
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  async onUploadClick(){
    console.log('Arquivo selecionado:', this.selectedFile);
    this.wppService.uploadArquivo(this.selectedFile);

    this.dialogRef.close();
  }

//   async onUploadClick(): Promise<void> { 
//     console.log('Arquivo selecionado:', this.selectedFile);

//     if (this.selectedFile) {
//       try {
//         const file = this.selectedFile;
//         //const response = await this.axios.post(`${environment.URL_WPP_API}/arquivos/upload`,{file},{headers:{'Content-Type':`multipart/form-data`,},});

//         //const response = await this.wppService.uploadArquivo(this.selectedFile); 
//         //console.log('Response:', response.data);
//       } catch (error) {
//         console.error('Erro ao fazer o upload:', error);
//       }
//     }
    
//     this.dialogRef.close();
//   }
}
