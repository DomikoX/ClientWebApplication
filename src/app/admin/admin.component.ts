import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {WebApiService} from "../_services/WebApi.service";
import {AdminApiService} from "../_services/AdminApi.service";


@Component({
    templateUrl: 'admin.component.html'
})

export class AdminComponent {
    private users = [];
    private devices = [];

    constructor(private webApiService:WebApiService, private adminApiService:AdminApiService) {

        adminApiService.getAllUsers().then(resp => this.users = resp);
        adminApiService.getAllDevices().then(resp => this.devices = resp);


    }


    onChange($event){
        console.log($event);
    }

}
