import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { AboutComponent } from './pages/about/about.component';

import {NavbarService} from './components/navbar/navbar.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        BackgroundComponent,
        NavbarComponent,
        ProfilePicComponent,
        AppBarComponent,
        AboutComponent
    ],
    providers: [NavbarService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
