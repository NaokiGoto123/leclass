import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { QuillModule } from 'ngx-quill';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    ImageCropperModule,
    MaterialFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    QuillModule.forRoot(),
    MatToolbarModule
  ]
})
export class ProfileSettingsModule { }
