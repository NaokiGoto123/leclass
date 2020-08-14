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
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { LessonGetService } from 'src/app/services/lesson-get.service';
import { Lesson } from 'src/app/interfaces/lesson';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ImageService } from 'src/app/services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as tus from 'tus-js-client';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    content: [''],
    subject: ['', [Validators.required]],
    isPublic: [true]
  });

  isComplete: boolean;

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
            const msg = 'The image size is more thatn 3MB byte. Compress the image or use other images.';
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

  token = '131de8827dca0fa95e1fadae192e3bf7';
  percentage: string;
  file: File;
  endpoint: string;
  videoUrl: string;
  isUploadingComplete: boolean;
  videoId: number;
  playerUrl: string;

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
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private sanitizer: DomSanitizer
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
    console.log('image is loaded');
  }
  cropperReady() {
    console.log('cropper is ready');
  }
  loadImageFailed() {
    console.log('error occured');
  }

  // Vimeo上に動画を作成（アップロードの前処理）
  createVideo(event) {
    this.file = event.target.files[0];
    console.log(event.target.files[0]);

    this.http
      .post(
        'https://api.vimeo.com/me/videos',
        {
          upload: {
            approach: 'tus',
            size: this.file.size,
          },
        },
        {
          headers: new HttpHeaders({
            Authorization: `bearer ${this.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
          }),
        }
      )
      .subscribe((res: any) => {
        console.log(res);
        // アップロード用URL
        this.endpoint = res.upload.upload_link;

        // Vimeo上の動画URL
        this.videoUrl = res.link;

        // 動画URLから動画IDを抽出
        this.videoId = +this.videoUrl.substring(
          this.videoUrl.lastIndexOf('/') + 1
        );

        // 埋め込み再生用のURLを生成
        // this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        //   `https://player.vimeo.com/video/${this.videoId}`
        // );

        this.playerUrl = `https://player.vimeo.com/video/${this.videoId}`;
      });
  }

  uploadVideo() {
    this.isUploadingComplete = false;
    // アップロードタスクの定義
    const upload = new tus.Upload(this.file, {
      uploadUrl: this.endpoint,
      // アップロードの刻み粒度（バイト単位）
      retryDelays: [0, 3000, 5000, 10000, 20000],
      onError: (error) => {
        console.log('Failed because: ' + error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        // 進捗パーセントを更新
        this.percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      },
      onSuccess: () => {
        this.isUploadingComplete = true;
        this.snackBar.open('Video is successfully uploaded!', 'Close', { duration: 5000 });
      },
    });

    upload.start();
  }

  async upload(id: string, base64: string): Promise<string> {
    const time: number = new Date().getTime();
    const ref = this.storage.ref(`lessons/${this.uniqueId}/images/${time}`);
    const result = await ref.putString(base64, 'data_url');
    return result.ref.getDownloadURL();
  }

  async submit() {
    if (this.lesson) {
      this.snackBar.open('Saving in process', 'Close', { duration: 5000 });
      this.update();
    } else if (!this.endpoint) {
      console.log('video is not ready yet');
    } else {
      this.snackBar.open('Saving in process', 'Close', { duration: 5000 });
      console.log(this.videoUrl);
      console.log(this.playerUrl);
      const photoURL = await this.upload(
        this.uniqueId,
        this.croppedImage
      );
      this.lessonService.createLesson({
        id: this.uniqueId,
        title: this.form.value.title,
        thumbnail: photoURL,
        playerUrl: this.playerUrl,
        videoId: this.videoId.toString(),
        content: this.form.value.content,
        createrId: this.authService.user.uid,
        subject: this.form.value.subject,
        isPublic: this.form.value.isPublic
      });
      this.isComplete = true;
      this.snackBar.open('Successfully saved', 'Close', { duration: 5000 });
      this.router.navigateByUrl('/');
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
        id: this.lesson.id,
        videoId: this.lesson.videoId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
