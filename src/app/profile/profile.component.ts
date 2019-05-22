import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/_services';
import { first } from 'rxjs/operators';


declare var $: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];



  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadScript('../../assets/js/twitterFetcher.js');
    this.loadScript('../../assets/js/widgets-data.js');
    this.loadScript('../../assets/js/owl-data.js');
    this.loadScript('../../assets/js/toggle-data.js');
    this.loadScript('../../assets/js/jquery.slimscroll.js');
    this.loadScript('../../assets/js/dropdown-bootstrap-extended.js');
    this.loadScript('../../assets/js/dataTables-data.js');
    this.loadScript('../../assets/js/toggle-data.js');
    this.loadScript('../../assets/js/init.js');
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    $(window).ready(function () {
      $(".preloader-it").delay(500).fadeOut("slow");
    });
  }


  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = false;
    body.appendChild(script);
  }

}
