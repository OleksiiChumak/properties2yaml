import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AceEditorModule} from 'ng2-ace-editor';

import {AppComponent} from './app.component';
import {PropertiesEditorComponent} from './properties-editor/properties-editor.component';
import {YamlEditorComponent} from './yaml-editor/yaml-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesEditorComponent,
    YamlEditorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AceEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
