import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

import 'datatables.net-bs4';


declare var $: any;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
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
        // this.loadScript('../../assets/vendors/jquery/dist/jquery.min.js');
        // this.loadScript('../../assets/vendors/popper.js/dist/umd/popper.min.js');
        // this.loadScript('../../assets/vendors/bootstrap/dist/js/bootstrap.min.js');
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