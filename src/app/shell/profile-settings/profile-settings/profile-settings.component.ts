import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  user: User;

  form = this.fb.group({
    displayName: ['', Validators.required],
    profile: ['']
  });

  imageChangedEvent: any = '';

  croppedImage: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userSevice: UserService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.userSevice.getUser(id).subscribe((user: User) => {
        this.user = user;
        this.form.patchValue(user);
      });
    });
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = 'Your work will be lost. Is it okay?';
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() { }
  cropperReady() { }
  loadImageFailed() { }

  async upload(path: string, base64: string): Promise<string> {
    const ref = this.storage.ref(path);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  async updateUser() {
    if (this.form.valid) {
      if (this.croppedImage) {
        const photoURL = await this.upload(
          `users/${this.user.uid}`,
          this.croppedImage
        );
        await this.userSevice.updateUser({
          uid: this.user.uid,
          displayName: this.form.value.displayName,
          photoURL,
          profile: this.form.value.profile,
        });
        this.snackBar.open('Successfully saved', 'Close');
        this.router.navigate(['/account'], { queryParams: { id: this.user.uid } });
      } else {
        await this.userSevice.updateUser({
          uid: this.user.uid,
          displayName: this.form.value.displayName,
          photoURL: this.user.photoURL,
          profile: this.form.value.profile
        });
        this.snackBar.open('Successfully saved', 'Close');
        this.router.navigate(['/account'], { queryParams: { id: this.user.uid } });
      }
    }
  }

}
