import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let BasicInfoFormComponent = class BasicInfoFormComponent {
    constructor(service) {
        this.service = service;
        this.info = {
            name: '',
            dateOfBirth: '',
            location: 'CA',
            id: undefined
        };
        this.saved = new EventEmitter();
        this.cancelled = new EventEmitter();
    }
    markAllTouched(form) {
        if (form && form.controls) {
            Object.values(form.controls).forEach((control) => {
                if (control && typeof control.markAsTouched === 'function') {
                    control.markAsTouched();
                }
            });
        }
    }
    ngOnInit() { }
    save(form) {
        this.markAllTouched(form);
        if (!this.info || !form.valid || this.hasInvalidChars(this.info.name) || !this.isValidDate(this.info.dateOfBirth) || !this.isValidLocation(this.info.location))
            return;
        if (this.info.id) {
            this.service.update(this.info).subscribe(() => {
                this.saved.emit();
                form.resetForm();
            });
        }
        else {
            this.service.add(this.info).subscribe(() => {
                this.saved.emit();
                form.resetForm();
            });
        }
    }
    cancel() {
        this.cancelled.emit();
    }
    hasInvalidChars(value) {
        if (!value)
            return false;
        // Disallow comma and special characters except space, period, hyphen, and apostrophe
        return /[\,\!\@\#\$\%\^\&\*\(\)_\+=\{\}\[\]:;"\<\>\?/\\|`~]/.test(value);
    }
    isValidDate(date) {
        // Accept only valid date strings (yyyy-mm-dd or similar)
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
    }
    isValidLocation(loc) {
        return loc === 'CA' || loc === 'MS';
    }
};
__decorate([
    Input()
], BasicInfoFormComponent.prototype, "info", void 0);
__decorate([
    Output()
], BasicInfoFormComponent.prototype, "saved", void 0);
__decorate([
    Output()
], BasicInfoFormComponent.prototype, "cancelled", void 0);
BasicInfoFormComponent = __decorate([
    Component({
        selector: 'app-basic-info-form',
        templateUrl: './basic-info-form.component.html',
        styleUrls: ['./basic-info-form.component.scss']
    })
], BasicInfoFormComponent);
export { BasicInfoFormComponent };
//# sourceMappingURL=basic-info-form.component.js.map