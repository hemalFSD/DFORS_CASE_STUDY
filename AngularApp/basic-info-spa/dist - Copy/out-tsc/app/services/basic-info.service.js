import { __decorate, __rest } from "tslib";
import { Injectable } from '@angular/core';
let BasicInfoService = class BasicInfoService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:5018/api/basicinfo';
    }
    getAll() {
        return this.http.get(this.apiUrl);
    }
    add(info) {
        return this.http.post(this.apiUrl, info);
    }
    update(info) {
        const { id } = info, payload = __rest(info, ["id"]);
        return this.http.put(`${this.apiUrl}/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.apiUrl}?id=${id}`);
    }
};
BasicInfoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BasicInfoService);
export { BasicInfoService };
//# sourceMappingURL=basic-info.service.js.map