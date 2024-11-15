import {Component, OnInit} from '@angular/core';
import {PickupService} from "../../../shared/services/pickup/pickup.service";

@Component({
  selector: 'app-schedule-pickup',
  templateUrl: './schedule-pickup.component.html',
  styleUrls: ['./schedule-pickup.component.css']
})
export class SchedulePickupComponent implements OnInit {
  schedule: any[] = [];
  pickupDate: string = '';
  selectedWaste = { household: false, recyclable: false, hazardous: false };
  address: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private pickupService: PickupService) {}

  ngOnInit() {
    this.fetchSchedule();
  }

  // Fetch the pickup schedule from the service
  fetchSchedule() {
    this.pickupService.getPickupSchedule().subscribe({
      next: (response: any) => {
        this.schedule = response.schedule;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch schedule. Please try again later.';
      }
    });
  }

  // Handle pickup scheduling
  onSchedulePickup() {
    const wasteTypes = Object.keys(this.selectedWaste).filter((key) => this.selectedWaste[key as keyof typeof this.selectedWaste]);
    if (wasteTypes.length === 0) {
      this.errorMessage = 'Please select at least one type of waste.';
      return; // Handle missing waste type (7a)
    }

    const pickupData = {
      pickupDate: this.pickupDate,
      wasteTypes,
      address: this.address
    };

    this.pickupService.schedulePickup(pickupData).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to schedule pickup. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
