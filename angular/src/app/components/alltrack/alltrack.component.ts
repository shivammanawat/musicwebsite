import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import { Track } from '../../track';
import {FlashMessagesService} from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alltrack',
  templateUrl: './alltrack.component.html',
  styleUrls: ['./alltrack.component.css']
})
export class AlltrackComponent implements OnInit {
  trackid:Number;
  trackname:String;
  trackurl:String;
  
  constructor(  
    private router: Router,private authservice : AuthService,private flash:FlashMessagesService) { }

   
  ngOnInit() {
     this.getTracks();
  }
 
  tracks : Object;
  getTracks()
  {
        this.authservice.getTracks().subscribe(tracks =>
          {
            tracks.sort((leftSide, rightSide) : number => {
              if(leftSide.trackid < rightSide.trackid) return -1;
              if(leftSide.trackid > rightSide.trackid) return 1;
              return 0;
            });
            this.tracks = tracks;
          },
          err=>
          {
            console.log("data not received");
          });

  }

  deleteTrack(id)
  {
      this.authservice.deleteTrack(id).subscribe(tracks =>
      {
        this.flash.show('Track Deleted', {cssClass: 'alert-danger', timeout: 800});
          this.getTracks();
      });
  }


  addTrack()
  {
    debugger
    const track =
    {
      trackid:this.trackid,
      trackname:this.trackname,
      trackurl:this.trackurl
    }
    
          if(!this.authservice.validatetrack(track)){
            this.flash.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 800});
            return false;
          }
          
          if(!this.authservice.validateid(track.trackid)){
            this.flash.show('Enter valid id', {cssClass: 'alert-danger', timeout: 800});
            return false;
          }
          if(!this.authservice.validateurl(track.trackurl)){
            this.flash.show('Enter valid URL', {cssClass: 'alert-danger', timeout: 800});
            return false;
          }

    this.authservice.addTrack(track).subscribe(data =>
      {
        if(data.success)
        {
          this.flash.show('Track Added', {cssClass: 'alert-success', timeout: 800});
          this.getTracks();
        }
        else
        {
          this.flash.show('Duplicate Entry', {cssClass: 'alert-danger', timeout: 800});
          this.router.navigate(['/alltrack']);
        }
      }
      );

}
}















// import { Component, OnInit } from '@angular/core';
// import {Router} from '@angular/router';
// import {AuthService} from '../../service/auth.service';
// import { Track } from '../../track';
// import {FlashMessagesService} from 'angular2-flash-messages';
// import {NgForm} from '@angular/forms';
// @Component({
//   selector: 'app-alltrack',
//   templateUrl: './alltrack.component.html',
//   styleUrls: ['./alltrack.component.css']
// })
// export class AlltrackComponent implements OnInit {
//   trackid:Number;
//   trackname:String;
//   trackurl:String;
//   constructor(  
//     private router: Router,private authservice : AuthService,private flash:FlashMessagesService) { }


//   ngOnInit() {
//      this.getTracks();
//   }
  
//   tracks : Track;
//   getTracks()
//   {
//         this.authservice.getTracks().subscribe(tracks =>
//           {
//             if(tracks.success)
//             {
//               tracks.sort((leftSide, rightSide) : number => {
//                 if(leftSide.trackid < rightSide.trackid) return -1;
//                 if(leftSide.trackid > rightSide.trackid) return 1;
//                 return 0;
//               });
//               this.tracks = tracks;
//             }
//             else
//             {
//               this.flash.show('No Task', {cssClass: 'alert-danger', timeout: 800});
//             }
//           });
//   }


//   deleteTrack(id)
//   {
//       this.authservice.deleteTrack(id).subscribe(tracks =>
//       {
//           this.flash.show('Track Deleted', {cssClass: 'alert-danger', timeout: 800});
//           this.getTracks();
//       });
//   }


//   addTrack()
//   {
//     const track =
//     {
//       trackid:this.trackid,
//       trackname:this.trackname,
//       trackurl:this.trackurl
//     }
//     if(!this.authservice.validatetrack(track)){
//       this.flash.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 800});
//       return false;
//     }
//     if(!this.authservice.validateid(track.trackid)){
//       this.flash.show('Please use a valid id', {cssClass: 'alert-danger', timeout: 800});
//       return false;
//     }
//     this.authservice.addTrack(track).subscribe(data =>
//       {
//         if(data.success)
//         {
//           this.flash.show('Track Added', {cssClass: 'alert-success', timeout: 800});
//           this.getTracks();
//         }
//         else{
//           this.flash.show('Track Not Added', {cssClass: 'alert-danger', timeout: 800});
//           this.getTracks();
//         }
        
//       });
    
//     }
// }