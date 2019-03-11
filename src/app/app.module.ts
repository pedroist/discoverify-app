import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { CreatePlaylistModalComponent } from './components/create-playlist-modal/create-playlist-modal.component';
import { HomeComponent } from './components/home/home.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AppRoutingModule } from './/app-routing.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';
import { TrackComponent } from './components/track/track.component';
import { EditPlaylistModalComponent } from './components/edit-playlist-modal/edit-playlist-modal.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    ArtistCardComponent,
    ArtistsComponent,
    CreatePlaylistModalComponent,
    HomeComponent,
    LoginModalComponent,
    NavbarComponent,
    NotFoundComponent,
    PlaylistComponent,
    SearchComponent,
    TrackComponent,
    EditPlaylistModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot(reducers, {})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
