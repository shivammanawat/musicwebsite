import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  constructor(private router : Router, private authservice :AuthService) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(
      data=>
      {
        this.user=data.user;
      },
      err=>
      {
        console.log(err);
        return false;
      });

    }

    onLogoutClick(){
      this.authservice.logout();
      this.router.navigate(['/home']);
      return false;
    }

}