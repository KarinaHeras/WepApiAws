import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AWSS3Service } from '../awss3-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit {
  filename!: string;
  mensaje!: string;
  bucketName!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private awss3Service: AWSS3Service
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bucketName = decodeURIComponent(params['bucketName']);
      this.filename = params['filename'];
    });
  }

  onFileSubmit(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.awss3Service.uploadFile(file, this.bucketName, null).subscribe(
        response => {
          this.mensaje = 'Archivo modificado exitosamente';
          this.OnSaveSuccess();
        },
        error => {
          console.error('Error al modificar el archivo', error);
        }
      );
    }
  }

  OnSaveSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Archivo modificado exitosamente',
      showConfirmButton: false,
      timer: 2000
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
