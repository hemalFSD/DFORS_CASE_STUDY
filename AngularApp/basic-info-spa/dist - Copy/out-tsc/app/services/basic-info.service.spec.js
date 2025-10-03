import { TestBed } from '@angular/core/testing';
import { BasicInfoService } from './basic-info.service';
describe('BasicInfoService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BasicInfoService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=basic-info.service.spec.js.map