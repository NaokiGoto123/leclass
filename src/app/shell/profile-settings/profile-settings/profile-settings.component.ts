import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/font_family.min.js';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  user: User;

  form = this.fb.group({
    displayName: [''],
    profile: ['']
  });

  imageChangedEvent: any = '';

  croppedImage: any = '';

  public options = {
    placeholderText: 'Edit your profile here!',
    charCounterCount: true,
    toolbarSticky: false,
    toolbarInline: false,
    height: '500',
    attribution: false,
    language: 'en',
    embedlyScriptPath: '',
    toolbarButtonsSM: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'textColor', 'clearFormatting'],
        buttonsVisible: 3
      },
      moreParagraph: {
        buttons: ['formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'quote'],
        buttonsVisible: 3
      },
      moreRich: {
        buttons: ['insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertTable', 'emoticons'],
        buttonsVisible: 3
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen'],
        align: 'right',
        buttonsVisible: 3
      }
    },
    toolbarButtonsXS: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'textColor', 'clearFormatting'],
        buttonsVisible: 0
      },
      moreParagraph: {
        buttons: ['formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'quote'],
        buttonsVisible: 0
      },
      moreRich: {
        buttons: ['insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertTable', 'emoticons'],
        buttonsVisible: 0
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen'],
        align: 'right',
        buttonsVisible: 3
      }
    },
    pastePlain: true,
    imageAddNewLine: true,
    documentReady: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private userSevice: UserService,
    private storage: AngularFireStorage,
    private fb: FormBuilder
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
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  async upload(path: string, base64: string): Promise<string> {
    const ref = this.storage.ref(path);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  async updateUser() {
    const photoURL = await this.upload(
      `users/${this.user.uid}`,
      this.croppedImage
    );
    await this.userSevice.updateUser({
      uid: this.user.uid,
      displayName: this.form.value.displayName,
      photoURL,
      profile: this.form.value.profile
    });
  }

}
