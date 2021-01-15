import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { CreatePlaylistModalComponent } from './components/modals/create-playlist-modal/create-playlist-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { AppRoutingModule } from './/app-routing.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './pages/search/search.component';
import { TrackComponent } from './components/track/track.component';
import { EditPlaylistModalComponent } from './components/modals/edit-playlist-modal/edit-playlist-modal.component';
import { CustomizePanelComponent } from './components/customize-panel/customize-panel.component';

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
    EditPlaylistModalComponent,
    CustomizePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
