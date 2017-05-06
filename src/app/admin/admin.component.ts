import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {WebApiService} from "../_services/WebApi.service";
import {AdminApiService} from "../_services/AdminApi.service";


@Component({
    templateUrl: 'admin.component.html'
})

export class AdminComponent {
    private loading = true;
    private users = [];
    private devices =null;
    private selectedUser;

    constructor(private webApiService:WebApiService, private adminApiService:AdminApiService) {

        adminApiService.getAllUsers().then(resp => {this.users = resp; this.loading = false});
       // adminApiService.getAllDevices().then(resp => this.devices = resp);


    }


    selectUser(user){
        this.selectedUser = user;
        this.devices = null;
        this.loading = true;
        this.adminApiService.getDeviceByUser(user[0]).then(resp => {this.devices = resp; this.loading = false});
    }

    change($event,device){
        if(device.Mark){
            this.adminApiService.assignDeviceToUser(device.Id,this.selectedUser[1]).then(resp => console.log(resp));

        }else {
            this.adminApiService.removeDeviceFromUser(device.Id,this.selectedUser[1]);

        }
    }



}
