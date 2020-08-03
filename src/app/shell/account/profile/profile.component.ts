import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  safeHTML: SafeHtml;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private domSanitizer: DomSanitizer
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.userService.getUser(id).subscribe((user: User) => {
        this.user = user;
        this.safeHTML = this.domSanitizer.bypassSecurityTrustHtml(user.profile);
      });
    });
  }

  ngOnInit(): void {
  }

}
