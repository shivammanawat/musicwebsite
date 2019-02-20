import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params , Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import { Track } from '../../track';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-edittrack',
  templateUrl: './edittrack.component.html',
  styleUrls: ['./edittrack.component.css']
})
export class EdittrackComponent implements OnInit {

  constructor(private router: Router,private authservice : AuthService, private flash:FlashMessagesService,   private route : ActivatedRoute) { }

  ngOnInit() {
    this.getTrack();
  }


  model = Object;
  getTrack()
  {
      var id = this.route.snapshot.params['id'];
      this.authservice.getTrack(id).subscribe(track =>
        {
          this.flash.show('Update Track Details', {cssClass: 'alert-info', timeout: 800});
          this.model = track;
        });
  }

  updateTrack(id,info)
  {
    var id = this.route.snapshot.params['id'];
    this.authservice.updateTrack(id,this.model).subscribe(() => 
    {
      this.flash.show('Track Details Updated', {cssClass: 'alert-success', timeout: 800});
      this.goBack();
    })
  }
  goBack()
  {
    this.router.navigate(['/alltrack']);
  }
}
