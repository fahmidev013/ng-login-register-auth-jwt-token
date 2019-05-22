import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/_services';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit, OnDestroy, AfterViewInit {


  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadScript('../../assets/js/jquery.slimscroll.js');
    this.loadScript('../../assets/js/dropdown-bootstrap-extended.js');
    this.loadScript('../../assets/js/rangeslider-data.js');
    this.loadScript('../../assets/js/select2-data.js');
    this.loadScript('../../assets/js/daterangepicker-data.js');
    this.loadScript('../../assets/js/toggle-data.js');
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

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
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

  loadCSSScript(src) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = src;

  }
}
