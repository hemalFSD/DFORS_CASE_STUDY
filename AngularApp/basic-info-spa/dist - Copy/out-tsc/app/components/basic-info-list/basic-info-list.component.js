import { __decorate } from "tslib";
import { Component } from '@angular/core';
let BasicInfoListComponent = class BasicInfoListComponent {
    constructor(service) {
        this.service = service;
        this.infos = [];
        this.selectedInfo = null;
        this.showList = false;
        this.pendingDeleteId = null;
    }
    ngOnInit() {
        this.selectedInfo = { name: '', dateOfBirth: '', location: 'CA' };
        this.loadInfos();
    }
    loadInfos() {
        this.service.getAll().subscribe(data => this.infos = data);
    }
    edit(info) {
        this.selectedInfo = {
            id: info.id,
            name: info.name,
            dateOfBirth: info.dateOfBirth,
            location: info.location
        };
    }
    delete(userId) {
        this.service.delete(userId).subscribe(() => this.loadInfos());
    }
    requestDelete(id) {
        this.pendingDeleteId = id;
    }
    confirmDelete() {
        if (this.pendingDeleteId !== null) {
            this.service.delete(this.pendingDeleteId).subscribe(() => {
                this.loadInfos();
                this.pendingDeleteId = null;
            });
        }
    }
    cancelDelete() {
        this.pendingDeleteId = null;
    }
    clearSelection() {
        this.selectedInfo = { name: '', dateOfBirth: '', location: 'CA', id: undefined };
    }
};
BasicInfoListComponent = __decorate([
    Component({
        selector: 'app-basic-info-list',
        templateUrl: './basic-info-list.component.html',
        styleUrls: ['./basic-info-list.component.scss']
    })
], BasicInfoListComponent);
export { BasicInfoListComponent };
//# sourceMappingURL=basic-info-list.component.js.map