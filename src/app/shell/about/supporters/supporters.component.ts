import { Component, OnInit } from '@angular/core';
import { VerificationGetService } from 'src/app/services/verification-get.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.scss']
})
export class SupportersComponent implements OnInit {

  verifiedUsers: User[];

  constructor(
    private verificationGetService: VerificationGetService
  ) {
    this.verificationGetService.getVerifiedUsers().subscribe((verifiedUsers: User[]) => {
      this.verifiedUsers = verifiedUsers;
    });
  }

  ngOnInit(): void {
  }

}
