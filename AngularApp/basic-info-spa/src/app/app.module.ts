import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicInfoListComponent } from './components/basic-info-list/basic-info-list.component';
import { BasicInfoFormComponent } from './components/basic-info-form/basic-info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicInfoListComponent,
    BasicInfoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
