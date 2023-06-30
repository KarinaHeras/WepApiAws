import { Component, OnInit } from '@angular/core';
import { AWSS3Service } from '../awss3-service';
import { Archivo } from '../IArchivo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {
  files: Archivo[] = [];
  pagedFiles: Archivo[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  pages: number[] = [];
  bucketName: string = '';
  prefix: string | null = null;
  allFiles: { [key: string]: number } = {};

  constructor(private awss3Service: AWSS3Service, private router: Router) {}

  ngOnInit(): void {
    this.getFilesList();
  }

  goToCreateBucket() {
    this.router.navigate(['/newbucket']);
  }

  getFilesList() {
    this.awss3Service.getFiles().subscribe(
      (fileNames: string[]) => {
        this.files = fileNames.map((bucket, index) => {
          const archivo: Archivo = {
            key: index.toString(),
            name: bucket,
            Type: this.getFileType(bucket),
            Size: 0,
            creationDate: new Date(),


          };
          return archivo;
        });
        this.updatePagedFiles();
      },
      (error: any) => {
        console.error('Error getting list of files', error);
      }
    );
  }

  getFileType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'png' || extension === 'jpg') {
      return 'Imagen';
    }
    return 'Otro';
  }


  updatePagedFiles() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedFiles = this.files.slice(startIndex, startIndex + this.pageSize);
    this.totalPages = Math.ceil(this.files.length / this.pageSize);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);

  }

  formatSize(size: number): string {
    if (size === 0) {
      return '0 B';
    }
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const digitGroups = Math.floor(Math.log(size) / Math.log(1024));
    const formattedSize = (size / Math.pow(1024, digitGroups)).toFixed(2);
    return `${formattedSize} ${units[digitGroups]}`;
  }

  subirArchivo(file: Archivo) {
    this.router.navigate(['/upload']);
  }

  editarArchivo(file: Archivo) {
    this.router.navigate(['/editfile', this.bucketName, file.name]);
  }


  deleteFile(file: Archivo) {
    this.bucketName = file.name;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Are you sure to delete the bucket??',
      text: 'the stored files will be deleted with the bucket',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        //comprobamos que tiene mas de un fichero
        if (this.allFiles[this.bucketName] > 0) {
          this.awss3Service.getAllFiles(this.bucketName).pipe(
            switchMap(files => {
              this.files = files.map((bucket, index) => {
                const archivo: Archivo = {
                  key: index.toString(),
                  name: bucket.name,
                  Type: '',
                  Size: 0,
                  creationDate: new Date(),

                };
                return archivo;
              });
              //retorna un Observable de eliminacion de archivos
              const deleteFileObservables = this.files.map(file => this.awss3Service.deleteFile(this.bucketName, file.name));

              return forkJoin(deleteFileObservables);
            }),
            //segundo me elimina el bucket
            switchMap(() => this.awss3Service.deleteBucket(this.bucketName))
          ).subscribe(
            () => {
              swalWithBootstrapButtons.fire(
                'Deleted',
                'Your Bucket and files have been deleted',
                'success'
              ).then(() => {
                location.reload();
              });
            },
            error => console.log(error)
          );
        } else {
          this.awss3Service.deleteBucket(this.bucketName).subscribe(
            () => {
              swalWithBootstrapButtons.fire(
                'deleted!',
                'Your Bucket and files have been deleted',
                'success'
              ).then(() => {
                location.reload();
              });
            },
            error => console.log(error)
          )
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire('Request Canceled');
      }
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedFiles();
    }
  }
}
