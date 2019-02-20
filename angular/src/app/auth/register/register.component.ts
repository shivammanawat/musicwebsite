import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
 @Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:String;
  password:String;
  constructor(private router : Router, private authservice :AuthService,private flash:FlashMessagesService) { }

  ngOnInit() {

  }

  onRegister()
  {
        const user=
          {
          username:this.username,
          password:this.password
        }
    
      // Required Fields
          if(!this.authservice.validateuser(user)){
            this.flash.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 500});
              return false;
            }


            this.authservice.registeruser(user).subscribe(data =>
            {
            if(data.success)
            {
              this.flash.show('User Registered', {cssClass: 'alert-success', timeout: 500});
                this.router.navigate(['/login']);
            }
            else
            {
              this.flash.show('User Not Registered', {cssClass: 'alert-danger', timeout: 500});
                this.router.navigate(['/register']);
            }
            });
  }
}