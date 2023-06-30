import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Ibuckets } from '../IArchivo';
import { AWSS3Service } from '../awss3-service';

@Component({
  selector: 'app-newbucket',
  templateUrl: './newbucket.component.html',
  styleUrls: ['./newbucket.component.css'],
})
export class NewbucketComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private awss3Service: AWSS3Service) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      bucketName: '',
      creationDate: '',
    });
  }

  save() {
    const bucketName = this.formGroup.get('bucketName')?.value;
    if (!bucketName) {
      return;
    }

    this.awss3Service.createBucket(bucketName).subscribe(
      (response: any) => {
        console.log('bucket created successfully', response);
        this.OnSaveSuccess();
      },
      (error: any) => {
        console.error('Failed to create bucket', error);
        // Maneja el error y muestra un mensaje al usuario si es necesario
      }
    );
  }


  OnSaveSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'New Bucket Created',
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
