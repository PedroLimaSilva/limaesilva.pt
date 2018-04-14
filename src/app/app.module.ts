import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './cv/profile/profile.component';
import { AboutComponent } from './cv/about/about.component';
import { SkillsComponent } from './cv/skills/skills.component';
import { CornerComponent } from './corner/corner.component';
import { FooterComponent } from './my-footer/my-footer.component';

import { TimelineComponent } from './cv/timeline/timeline.component';
import { TimelineEventComponent } from './cv/timeline/timeline-event/timeline-event.component';
import { TimelineBadgeComponent } from './cv/timeline/timeline-badge/timeline-badge.component';
import { TimelineService } from './cv/timeline/timeline.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    AboutComponent,
    TimelineComponent,
    SkillsComponent,
    CornerComponent,
    FooterComponent,
    TimelineEventComponent,
    TimelineBadgeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TimelineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
