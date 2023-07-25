import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {
  selectedFile!: File | null;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onUploadClick(): void {
    console.log('Arquivo selecionado:', this.selectedFile);
    this.dialogRef.close();
  }
}
