import { Component, OnInit } from '@angular/core';
import { VarServiceService } from 'src/app/shared/service/var-service.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  courseName = '';
  courseId = '';
  // students = [];
  sortStudent: any;

  students = [
    {
      name: '111',
      userId: '2222',
      ok: 1,
      later: 2,
      no: 3,
      experience: 4
    },
    {
      name: '333',
      userId: '4444',
      ok: 1,
      later: 2,
      no: 3,
      experience: 4
    },
  ];

  constructor() {
    this.courseName = VarServiceService.courseName;
   }

  ngOnInit() {
  }

  onClick(){
    console.log('aedrfhaetjwrtyjwykjeytkeutk');
  }

  onStuInfo(event){
    console.log(event);
  }
}
