import { Component, Input } from '@angular/core';
import {Device} from "../../_models/device";
import {WebApiService} from "../../_services/WebApi.service";


@Component({
    selector: 'device-detail',
    templateUrl: 'device-detail.component.html'
})

export class DeviceDetailComponent {
    @Input()
    device: Device;

    content:string = "INFO";

    constructor(private webApiService: WebApiService) { }



    startUsage(){
        this.webApiService.startUsage(this.device.Id) ;
    }

    stopUsage(){
        this.webApiService.stopUsage(this.device.Id) ;
    }




}