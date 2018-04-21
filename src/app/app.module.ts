import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { Renderer3Service } from './services/renderer3.service';
import { StatsService } from './services/stats.service';
import { GuiService } from './services/gui.service';
import { ObjLoaderService } from './services/obj-loader.service';


@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      Renderer3Service,
      StatsService,
      GuiService,
      ObjLoaderService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
