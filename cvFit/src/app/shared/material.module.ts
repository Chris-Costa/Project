import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
