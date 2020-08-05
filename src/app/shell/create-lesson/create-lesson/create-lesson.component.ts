import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
// import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
// import 'froala-editor/js/plugins/paragraph_style.min.js';
// import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import { LessonService } from 'src/app/services/lesson.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { firestore } from 'firebase';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ImageService } from 'src/app/services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {

  isTarget = false;

  uniqueId = this.db.createId();

  lesson: Lesson;

  form = this.fb.group({
    title: ['', [Validators.required]],
    videoLink: [''],
    content: [''],
    subject: ['', [Validators.required]],
    isPublic: [true]
  });

  isComplete = false;

  subjects = [
    'Language & Literature HL',
    'Analysis & Approaches Hl',
    'Japanese SL',
    'Physics HL',
    'Computer Science HL',
    'Economics HL',
    'Theory of Knowledge'
  ];

  public options = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
    toolbarSticky: false,
    toolbarInline: false,
    height: '500',
    attribution: false,
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
    events: {
      initialized: (editor) => {
        this.froalaEditor = editor;
      },
      'image.beforeUpload': (images) => {
        const file = images[0];
        const fileSizeLimit = 3000000;
        if ((file.size < fileSizeLimit)) {
          if (this.lesson) {
            const downloadURLPromise = this.imageService.uploadImage(this.lesson.id, file);
            downloadURLPromise.then((downloadURL) => {
              this.froalaEditor._editor.image.insert(downloadURL, null, null, this.froalaEditor._editor.image.get());
            });
            return null;
          } else {
            const downloadURLPromise = this.imageService.uploadImage(this.uniqueId, file);
            downloadURLPromise.then((downloadURL) => {
              this.froalaEditor._editor.image.insert(downloadURL, null, null, this.froalaEditor._editor.image.get());
            });
            return null;
          }
        } else {
          this.ngZone.run(() => {
            const msg = 'The image size is more thatn 3GB byte. Compress the image or use other images.';
            this.snackBar.open(msg, 'Close', { duration: 5000 });
          });
          return false;
        }
      },
    }
  };

  froalaEditor;

  imageChangedEvent: any = '';

  croppedImage: any = '';

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private lessonService: LessonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lessonGetService: LessonGetService,
    public dialog: MatDialog,
    private imageService: ImageService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.lessonGetService.getLesson(id).subscribe((lesson: Lesson) => {
        if (lesson) {
          this.form.patchValue(lesson);
          this.croppedImage = lesson.thumbnail;
          this.isTarget = true;
          this.lesson = lesson;
        }
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

  async upload(id: string, base64: string): Promise<string> {
    const time: number = new Date().getTime();
    const ref = this.storage.ref(`lessons/${this.uniqueId}/images/${time}`);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  async submit() {
    if (this.lesson) {
      this.update();
    } else {
      const photoURL = await this.upload(
        this.uniqueId,
        this.croppedImage
      );
      this.lessonService.createLesson({
        id: this.uniqueId,
        title: this.form.value.title,
        thumbnail: photoURL,
        videoLink: this.form.value.videoLink,
        content: this.form.value.content,
        createrId: this.authService.user.uid,
        subject: this.form.value.subject,
        isPublic: this.form.value.isPublic
      });
      this.isComplete = true;
      if (this.form.value.isPublic) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/account/drafts');
      }
    }
  }

  private async update() {
    console.log(this.form.value);
    this.lessonService.updateLesson({
      ...this.lesson,
      title: this.form.value.title,
      content: this.form.value.content,
      subject: this.form.value.subject,
      isPublic: this.form.value.isPublic
    });
    this.isComplete = true;
    this.router.navigateByUrl('/');
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: this.lesson.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
