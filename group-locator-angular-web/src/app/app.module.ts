import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from './app.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DialogeModalComponent} from './dialoge.modal/dialoge.modal.component';
import {RouterModule} from '@angular/router';
import {GroupMapComponent} from './group-map/group-map.component';
import {HomeComponent} from './home/home.component';
import {TermsAndConditionComponent} from './terms-and-condition/terms-and-condition.component';
import {AppRoutingModule} from './app.routing.module';
import {MyAppComponent} from './my.app/my.app.component';
import {GroupMapIskconComponent} from './group-map-iskcon/group-map-iskcon.component';

@NgModule({
  declarations: [
    MyAppComponent,
    AppComponent,
    GroupMapComponent,
    GroupMapIskconComponent,
    HomeComponent,
    TermsAndConditionComponent,
    DialogeModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [AppService],
  entryComponents: [DialogeModalComponent],
  bootstrap: [MyAppComponent]
})
export class AppModule { }
