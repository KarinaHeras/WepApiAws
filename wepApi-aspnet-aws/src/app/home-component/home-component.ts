import { Component } from '@angular/core';
import { AWSS3Service } from '../awss3-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent {
  bucketName: string = '';
  files: string[] = [];

  constructor(private router: Router, private awss3Service: AWSS3Service) {}
  goToCreateBucket() {
    this.router.navigate(['/newbucket']);
  }
  navigateToEditPage(): void {
    this.router.navigate(['/edit-files']);
  }
  onFileSelected(file: File) {
    if (file) {
      this.awss3Service.getFiles().subscribe(
        (files: string[]) => {
          this.files = files;
        },
        (error: any) => {
          console.error('Error getting the files', error);
        }
      );
    }
  }

  uploadFile(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const fileToUpload = fileInput?.files?.[0];
    if (fileToUpload) {
      this.awss3Service.uploadFile(fileToUpload, this.bucketName, null).subscribe(
        response => {
          console.log('File uploaded successfully', response);
        },
        error => {
          console.error('Error uploading the file', error);
        }
      );

  }
}
}
