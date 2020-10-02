import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  user: User;

  displayNameMaxLength = 50;

  form = this.fb.group({
    displayName: [
      '',
      [Validators.required, Validators.maxLength(this.displayNameMaxLength)],
    ],
    profile: [''],
  });

  imageChangedEvent: any = '';

  croppedImage: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userSevice: UserService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private meta: Meta,
    public locationService: Location
  ) {
    this.titleService.setTitle('Profile settings | Leclass');

    this.meta.addTags([
      { name: 'description', content: 'Profile settings' },
      { property: 'og:title', content: 'Profile settings' },
      { property: 'og:description', content: 'Profile settings' },
      { property: 'og:url', content: location.href },
      {
        property: 'og:image',
        content: 'https://leclass-prod.web.app/assets/images/leclass.jpg',
      },
    ]);

    this.activatedRoute.queryParamMap
      .pipe(
        take(1),
        switchMap((params) => {
          return this.userSevice.getUser(params.get('id'));
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.form.patchValue(user);
      });
  }

  ngOnInit(): void {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = 'Your work will be lost. Is it okay?';
    }
  }

  get displayNameControl() {
    return this.form.get('displayName') as FormControl;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {}
  cropperReady() {}
  loadImageFailed() {}

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
        this.router.navigate(['/account'], {
          queryParams: { id: this.user.uid },
        });
      } else {
        await this.userSevice.updateUser({
          uid: this.user.uid,
          displayName: this.form.value.displayName,
          photoURL: this.user.photoURL,
          profile: this.form.value.profile,
        });
        this.snackBar.open('Successfully saved', 'Close');
        this.router.navigate(['/account'], {
          queryParams: { id: this.user.uid },
        });
      }
    }
  }
}
