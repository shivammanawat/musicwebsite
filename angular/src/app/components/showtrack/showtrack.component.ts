import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params , Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import { Track } from '../../track';
import {FlashMessagesService} from 'angular2-flash-messages';
import * as jwt from 'jsonwebtoken';
@Component({
  selector: 'app-showtrack',
  templateUrl: './showtrack.component.html',
  styleUrls: ['./showtrack.component.css']
})
export class ShowtrackComponent implements OnInit {

  constructor(private router: Router,private authservice : AuthService, private flash:FlashMessagesService,   private route : ActivatedRoute) { }
 

  ngOnInit() {
    
 }
 
 }

 


   


