import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  ngOnInit(): void {
    this.userService.getUserById(this.currentUserId).subscribe({
      next: (res) => {
        this.settingForm.setValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          dob: new Date(res.dob).toISOString().split('T')[0],
          gender: res.gender
        })
      }
    })
  }

  userService = inject(UserService);
  today = new Date().toISOString().split('T')[0];
  currentUserId = sessionStorage.getItem('userId')??'';
  settingForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    dob: new FormControl(this.today,Validators.required),
    gender: new FormControl('Female',Validators.required)
  });

  updateDetails(){
    console.log(this.settingForm.value);
    let updatedUser = {
      "id": this.currentUserId,
      "firstName":this.settingForm.value.firstName??'',
      "lastName":this.settingForm.value.lastName??'',
      "email":this.settingForm.value.email??'',
      "dob":this.settingForm.value.dob??'',
      "gender": this.settingForm.value.gender??'Female'
    }
    this.userService.updateUser(updatedUser).subscribe({
      next: (res) => alert('User updated'),
      error: (e) => alert(JSON.parse(e.error.message))
    })
  }

}
