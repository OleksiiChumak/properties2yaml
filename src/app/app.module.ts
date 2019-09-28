import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AceEditorModule} from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { PropertiesEditorComponent } from './properties-editor/properties-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesEditorComponent
  ],
  imports: [
    BrowserModule,
    AceEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
