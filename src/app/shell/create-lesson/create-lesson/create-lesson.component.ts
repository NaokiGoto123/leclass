import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {

  form = this.fb.group({
    title: ['', [Validators.required]],
    content: [''],
    isPublic: [true]
  });

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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value.title);
    console.log(this.form.value.content);
  }

}
