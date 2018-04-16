import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SlideComponent } from './slide/slide.component';
import { Renderer3Service } from './renderer3.service';
import { StatsService } from './stats.service';
import { GuiService } from './gui.service';


@NgModule({
  declarations: [
    AppComponent,
    SlideComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      Renderer3Service,
      StatsService,
      GuiService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
