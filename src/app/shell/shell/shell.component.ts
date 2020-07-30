import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isShowing = true;

  valueControl: FormControl = new FormControl();

  form = this.fb.group({
    course: ['DP', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((result) => {
      console.log(result.course);
    });
    this.valueControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

}
