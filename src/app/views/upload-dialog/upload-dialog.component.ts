import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WppService } from 'src/app/shared/service/wpp.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {
  selectedFile!: File;
  progress = 0;
  message = '';
  durationInSeconds = 5;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private wppService: WppService,
    private snackBar: MatSnackBar
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  //https://www.bezkoder.com/angular-material-14-file-upload/
  onUploadClick(): void{
    console.log('Arquivo selecionado:', this.selectedFile);

    this.progress = 0;
    this.message = "";

    this.wppService.uploadArquivo(this.selectedFile).subscribe(
      (event: any) => {

        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress)
        } else if (event instanceof HttpResponse) {
          this.message = event.body.mensagem;
          this.showSnackBar('Arquivo enviado com sucesso!')
        }

      },
      (err: any) => {
        console.log(err);
        this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
          this.snackBar.open(err.error.message, 'fechar', {duration: this.durationInSeconds * 1000})
          this.showSnackBar('Falha ao enviar o arquivo!')
        } else {
          this.message = err.error.mensagem;
          this.showSnackBar(this.message)
        }

      }  
    );
   
    this.dialogRef.close();
  }

  showSnackBar(message: string): void{
    this.snackBar.open(message, 'fechar', {duration: this.durationInSeconds * 1000})
  }

}
