import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import { LessonService } from 'src/app/services/lesson.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {

  form = this.fb.group({
    title: ['', [Validators.required]],
    videoLink: [''],
    content: [''],
    subject: ['', [Validators.required]],
    isPublic: [true]
  });

  isComplete = false;

  subjects = [
    'Literature',
    'Math',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer science',
    'Economics',
    'Politics',
    'Visual art',
    'Drama',
    'PHE'
  ];

  public options = {
    placeholderText: 'Edit Your Content Here!',
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
    videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed']
  };

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private authService: AuthService,
    private lessonService: LessonService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = 'Your work will be lost. Is it okay?';
    }
  }

  submit() {
    console.log(this.form.value);
    this.lessonService.createLesson({
      id: this.db.createId(),
      videoLink: this.form.value.videoLink,
      content: this.form.value.content,
      createrId: this.authService.user.uid,
      date: firestore.Timestamp.now(),
      subject: this.form.value.subject,
      isPublic: this.form.value.isPublic
    });
    this.isComplete = true;
  }
}