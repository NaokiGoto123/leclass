import { Component, OnInit } from '@angular/core';
import { VerificationService } from 'src/app/services/verification.service';
import { User } from 'src/app/interfaces/user';
import { VerificationGetService } from 'src/app/services/verification-get.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  verifiedUsers: User[];

  constructor(
    private verificationService: VerificationService,
    private verificationGetService: VerificationGetService
  ) {
    this.verificationGetService.getVerifiedUsers().subscribe((verifiedUsers: User[]) => {
      this.verifiedUsers = verifiedUsers;
    });
  }

  ngOnInit(): void {
  }

}
