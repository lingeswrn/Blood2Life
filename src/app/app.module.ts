import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { BecomeAdonorComponent } from './pages/become-adonor/become-adonor.component';

import { routing } from './app.routes';
import { HeaderComponent } from './includes/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    BecomeAdonorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
