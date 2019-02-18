import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { CreatePlaylistModalComponent } from './components/create-playlist-modal/create-playlist-modal.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AppRoutingModule } from './/app-routing.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ArtistCardComponent,
    ArtistsComponent,
    CreatePlaylistModalComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
