import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})

export class MembersComponent implements OnInit {
  name: any;
  state: string = '';
  provider : any;
  providerData : any;

  constructor(public af: AngularFire,private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this.providerData = auth.auth.providerData;
        console.log(auth.auth.providerData);
        console.log(auth);
      }
    });

  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }

  linkGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    this.name.auth.linkWithPopup(provider).then(function(result) {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            // ...
          });

  }


  ngOnInit() {
  }
}
