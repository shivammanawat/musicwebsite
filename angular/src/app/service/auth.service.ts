import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
@Injectable()
export class AuthService {
user:any;
authToken:any;
info:any;
username:any;
  constructor(private http : Http) { }
 

    registeruser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/users/register",user,{headers:headers}).
    map(res=>res.json());
    }

    googlesign()
    {
      let headers= new Headers()
      headers.append('Content-Type','application/json');
      return this.http.get("http://localhost:3000/users/auth/google/callback",{headers:headers}).
      map(res=>res.json);
    }

    storegoogledata(token,user)
    {
      localStorage.setItem('id_token', token);
      localStorage.setItem("user",JSON.stringify(user));
      this.authToken = token;
      this.user = null;
    }


    loginuser(user) {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post("http://localhost:3000/users/login",user,{headers:headers}).
        map(res => res.json());
    }

    storeUserData(token,user)
    {
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    }

    loadToken()
    {
      const token = localStorage.getItem('id_token');
      const username = localStorage.getItem('user');
      this.authToken = token;
      this.username = username;
    }

    getProfile()
    {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken );
      headers.append('Content-Type','application/json');
      return this.http.get("http://localhost:3000/proutes/profile",{headers:headers}).
      map(res => res.json());
    }

    addTrack(info){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken );
      headers.append('Content-Type','application/json');
      return this.http.post("http://localhost:3000/proutes/alltrack",info,{headers:headers})
          .map(res => res.json());
    }

    getTracks(){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get("http://localhost:3000/proutes/alltrack",{headers:headers})
          .map(res => res.json());
    }

    getTrack(id){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get("http://localhost:3000/proutes/alltrack/"+ id,{headers:headers})
          .map(res => res.json());
    }

    deleteTrack(id){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.delete("http://localhost:3000/proutes/alltrack/"+id,{headers:headers})
          .map(res => res.json());
    }
    updateTrack(id, info){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.put("http://localhost:3000/proutes/alltrack/"+id,info,{headers:headers})
          .map(res => res.json());
    }
  
    loggedin(){
      return tokenNotExpired('id_token');
    }

    validateuser(user){
      if(user.username == undefined || user.password == undefined){
        return false;
      } else {
        return true;
      }
    }

    validateid(trackid){ 
    const re = /^[1-9]\d*$/;       
    return re.test(trackid);
    }

    validatetrack(info){
      if(info.trackname == undefined || info.trackid == undefined || info.trackurl == undefined){
        return false;
      } else {
        return true;
      }
    }
    validateurl(trackurl)
    {
        const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        return re.test(trackurl);
    }
    
    logout()
    {
    this.authToken=null;
    this.user=null;
    localStorage.clear();
    }



    
    
    
}
