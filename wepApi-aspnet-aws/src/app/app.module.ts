import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AWSS3Service } from './awss3-service';
import { UploadComponent } from './upload-component/upload-component';
import { HomeComponent } from './home-component/home-component';
import { FilesListComponent } from './files-list/files-list.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { NewbucketComponent } from './newbucket/newbucket.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HomeComponent,
    FilesListComponent,
    EditFileComponent,
    UploadComponent,
    NewbucketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AWSS3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
