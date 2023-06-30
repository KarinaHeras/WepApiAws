import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './aws-s3.constants';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Ibuckets } from './IArchivo';

@Injectable({
  providedIn: 'root'
})
export class AWSS3Service {
  private readonly apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  uploadFile(file: File, bucketName: string, prefix: string | null): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let url = `${this.apiUrl}/AwsS3Bucket/AddFile/${bucketName}`;
    if (prefix) {
      url += `/${prefix}`;
    }

    const headers = new HttpHeaders({
      'Accept': '*/*',
    });

    return this.http.post<any>(url, formData, { headers }).pipe(
      catchError(error => {
        console.error('Error al subir el fichero', error);
        return of(null);
      })
    );
  }

  createBucket(Name: string): Observable<any> {
    const url = `${this.apiUrl}/AwsS3Bucket/CreateBucket/${Name}`;
  return this.http.post(url, { Name: Name }).pipe(
    catchError(error => {
      console.error('Error al crear el bucket', error);
      return of(error);

      })
    );
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/AwsS3Bucket/GetAllBuckets`);
  }

  getFile(key: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/AwsS3Bucket/AddFile/${key}`, { responseType: 'blob' });
  }

  getAllFiles(Name: string): Observable<Ibuckets[]> {
    console.log('Bucket Name:', Name);
    return this.http.get<Ibuckets[]>(`${this.apiUrl}/AwsS3Bucket/AddFile/${Name}`);
  }

  getFileByKey(bucketName: string, key: string): Observable<Blob> {
    const url = `${this.apiUrl}/AwsS3Bucket/GetFile/${bucketName}/${key}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  getFileMetadata(bucketName: string, key: string): Observable<any> {
    return this.http.get<string[]>(`${this.apiUrl}/AwsS3Bucket/GetAllBuckets`);

  }

  deleteFile(bucketName: string, key: string): Observable<any> {
    const url = `${this.apiUrl}/AwsS3Bucket/DeleteFile/${bucketName}/${key}`;
    return this.http.delete<any>(url);
  }

  updateFile(key: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.apiUrl}/AwsS3Bucket/UpdateFile/${key}`;
    return this.http.put(url, formData);
  }

  deleteBucket(bucketName: string): Observable<any> {
    const url = `${this.apiUrl}/AwsS3Bucket/DeleteBucket/${bucketName}`;
    return this.http.delete<any>(url);
  }
}
