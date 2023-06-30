export interface Archivo {
  key: string;
  name: string;
  creationDate: Date;
  Type: string;
  Size: number;
}
export interface Ibucket{
  name: string;
  presignedUrl: string;

}
export interface Ibuckets {
  creationDate: Date,
  bucketName: string,
  name: string;

}
export interface AllIbuckets {
  name: string;
  presignedUrl: string;

}

export interface Ifile {
  name:string,
  presignedUrl:string,
  size:string
}
