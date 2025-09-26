import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BasicInfoService, BasicInfo } from '../../services/basic-info.service';

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.scss']
})
export class BasicInfoFormComponent implements OnInit {
  public markAllTouched(form: any) {
    if (form && form.controls) {
      Object.values(form.controls).forEach((control: any) => {
        if (control && typeof control.markAsTouched === 'function') {
          control.markAsTouched();
        }
      });
    }
  }
  @Input() info: BasicInfo | null = {
    name: '',
    dateOfBirth: '',
    location: 'CA',
    id: undefined
  };
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private service: BasicInfoService) { }

  ngOnInit(): void {}

  save(form: any) {
    this.markAllTouched(form);
    if (!this.info || !form.valid || this.hasInvalidChars(this.info.name) || !this.isValidDate(this.info.dateOfBirth) || !this.isValidLocation(this.info.location)) return;
    if (this.info.id) {
      this.service.update(this.info).subscribe(() => {
        this.saved.emit();
        form.resetForm();
      });
    } else {
      this.service.add(this.info).subscribe(() => {
        this.saved.emit();
        form.resetForm();
      });
    }
  }

  cancel() {
    this.cancelled.emit();
  }

  hasInvalidChars(value: string | null | undefined): boolean {
    if (!value) return false;
    // Disallow comma and special characters except space, period, hyphen, and apostrophe
    return /[\,\!\@\#\$\%\^\&\*\(\)_\+=\{\}\[\]:;"\<\>\?/\\|`~]/.test(value);
  }

  isValidDate(date: string): boolean {
    // Accept only valid date strings (yyyy-mm-dd or similar)
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  }

  isValidLocation(loc: string): boolean {
    return loc === 'CA' || loc === 'MS';
  }
}
