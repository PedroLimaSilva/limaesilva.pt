import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoutingModule } from './routing/routing.module';


import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { AboutComponent } from './pages/about/about.component';
import { ResumeComponent } from './pages/resume/resume.component';

import { NavbarService } from './components/navbar/navbar.service';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        BackgroundComponent,
        NavbarComponent,
        ProfilePicComponent,
        AppBarComponent,
        AboutComponent,
        ResumeComponent,
        UnderConstructionComponent
    ],
    providers: [NavbarService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
