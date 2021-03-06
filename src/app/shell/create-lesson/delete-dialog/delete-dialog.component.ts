import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LessonService } from 'src/app/services/lesson.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  id: string;

  constructor(
    private lessonService: LessonService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {}

  deleteLesson() {
    this.dialogRef.close();
    this.lessonService.deleteLesson(this.id);
    this.router.navigateByUrl('/');
  }
}
