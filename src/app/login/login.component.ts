﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WebApiService } from '../_services/WebApi.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: WebApiService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {

                    this.router.navigate(['/']);
                }
            }, error =>{
                this.error = 'Username or password is incorrect';
                console.log(error);
                this.loading = false;
        });
    }
}
