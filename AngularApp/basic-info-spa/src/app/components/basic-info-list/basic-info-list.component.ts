import { Component, OnInit } from '@angular/core';
import { BasicInfoService, BasicInfo } from '../../services/basic-info.service';

@Component({
  selector: 'app-basic-info-list',
  templateUrl: './basic-info-list.component.html',
  styleUrls: ['./basic-info-list.component.scss']
})
export class BasicInfoListComponent implements OnInit {
  infos: BasicInfo[] = [];
  selectedInfo: BasicInfo | null = null;
  showList = false;
  pendingDeleteId: number | null = null;

  constructor(private service: BasicInfoService) { }

  ngOnInit(): void {
    this.selectedInfo = {name: '', dateOfBirth: '', location: 'CA'};
    this.loadInfos();
  }

  loadInfos() {
    this.service.getAll().subscribe(data => this.infos = data);
  }

  edit(info: BasicInfo) {
    this.selectedInfo = {
      id: info.id,
      name: info.name,
      dateOfBirth: info.dateOfBirth,
      location: info.location
    };
  }

  delete(userId: number) {
    this.service.delete(userId).subscribe(() => this.loadInfos());
  }

  requestDelete(id: number) {
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
    this.selectedInfo = {name: '', dateOfBirth: '', location: 'CA', id: undefined};
  }
}
