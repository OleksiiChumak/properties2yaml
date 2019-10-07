import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AceEditorModule} from 'ng2-ace-editor';

import {AppComponent} from './app.component';
import {PropertiesEditorComponent} from './properties-editor/properties-editor.component';
import {YamlEditorComponent} from './yaml-editor/yaml-editor.component';
import {IconModule} from '@visurel/iconify-angular';
import { YamlToPropertiesConverterComponent } from './yaml-to-properties-converter/yaml-to-properties-converter.component';

import 'brace/mode/properties';
import 'brace/mode/yaml';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesEditorComponent,
    YamlEditorComponent,
    YamlToPropertiesConverterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AceEditorModule,
    IconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
