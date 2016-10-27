import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';

import { GithubUsers } from '../../providers/github-users';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  user: User;
  followers: User[];
  rows;
  login: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, private githubUsers: GithubUsers) {
    this.login = navParams.get('login');
    githubUsers.loadDetails(this.login).subscribe(user => {
      console.log(user);
      this.user = user;
    });
    githubUsers.loadFollowers(this.login).subscribe(followers => {
      this.followers = followers;
      this.rows = Array.from(Array(Math.ceil(followers.length / 3)).keys());
      console.log('cargando followers');
      console.log(this.followers)
    })
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login})
  }
}
