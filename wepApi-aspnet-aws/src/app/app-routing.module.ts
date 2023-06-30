import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { UploadComponent } from './upload-component/upload-component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { FilesListComponent } from './files-list/files-list.component';
import { NewbucketComponent } from './newbucket/newbucket.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'editfile/:bucketName/:filename', component: EditFileComponent },
  { path: 'fileslist', component: FilesListComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'newbucket', component: NewbucketComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
