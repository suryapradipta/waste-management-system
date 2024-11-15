import { Component } from '@angular/core';
import {IssueService} from "../../../shared/services/issue/issue.service";

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent {
  issueType: string = '';
  location: string = '';
  description: string = '';
  additionalComments: string = '';
  photos: File[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private issueService: IssueService) {}

  onFileSelect(event: any) {
    this.photos = Array.from(event.target.files);
  }

  onReportIssue() {
    if (!this.issueType) {
      this.errorMessage = 'Please select an issue type.';
      return;
    }
    if (!this.location || !this.description) {
      this.errorMessage = 'Location and description are required.';
      return;
    }

    const issueData = {
      issueType: this.issueType,
      location: this.location,
      description: this.description,
      additionalComments: this.additionalComments,
      photos: this.photos.map((file) => URL.createObjectURL(file)) // Convert to URLs for now
    };

    this.issueService.reportIssue(issueData).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to report the issue. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
