import { Component, OnInit } from '@angular/core';
import { AWSS3Service } from '../awss3-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.html',
  styleUrls: ['./upload-component.css']
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null;
  mensaje: string | null = null;
  formGroup!: FormGroup;
  bucketName: string = "";
  file: File | null = null;
  prefix: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private awss3Service: AWSS3Service
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.bucketName = params['bucketName'];
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  charge(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile != null) {
      this.awss3Service.uploadFile(this.selectedFile, this.bucketName, this.prefix).subscribe(
        () => this.OnSaveSuccess(this.bucketName),
        error => {
          if (error.status === 200) {
            this.OnSaveSuccess(this.bucketName);
          } else if (error.status === 400) {
            alert("Error uploading the file");
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You must select a file',
      });
    }
  }

  OnSaveSuccess(bucketName: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'New file uploaded to bucket ' + bucketName,
      showConfirmButton: false,
      timer: 2000
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
