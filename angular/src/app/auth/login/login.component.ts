import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private router: Router, private authservice: AuthService, private flash: FlashMessagesService) { }

  ngOnInit() {
    if (this.authservice.loggedin) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {

    const user =
    {
      username: this.username,
      password: this.password
    }

    if (!this.authservice.validateuser(user)) {
      this.flash.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 500 });
      return false;
    }

    this.authservice.loginuser(user).subscribe(data => {
      if (data.success) {
        this.authservice.storeUserData(data.token, data.user);
        this.flash.show('User is LoggedIn', { cssClass: 'alert-success', timeout: 500 });
        this.router.navigate(['/dashboard']);
      }
      else {
        this.flash.show('Not Found', { cssClass: 'alert-danger', timeout: 500 });
        this.router.navigate(['/login']);
      }
    });
  }
  
}
