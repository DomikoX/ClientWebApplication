/**
 * Created by DomikoX on 11.3.2017.
 */
import { Component, Input } from '@angular/core';
import {Device} from "../../_models/device";
import {WebApiService} from "../../_services/WebApi.service";
import {Record} from "../../_models/Record";
import * as $ from 'jquery'
@Component({
    selector: 'explorer',
    templateUrl: 'explorer.component.html'
})

export class ExplorerComponent {
    @Input()
    device:Device;

    constructor(private webApiService:WebApiService) {

    }

    explore() {
        this.webApiService.explore(this.device.Id).then(records => {
            this.device.Records = (records as Record[]);
        })
    }

    open(i) {
        this.webApiService.openFile(this.device.Id, i).then(records => {

            if (records[0] == null) {
                return;
            }
            this.device.Records = (records as Record[]);
            return;

        })
    }

    dwn(fileName:string) {

        this.webApiService.downloadFile(this.device, fileName);
    }


    getDate(date:string) {
        if (date != null || date == "") {
            return new Date(parseInt(date.substr(6)));

        }


    }


    getSize(size:number) {
        if (size == 0) return "";


        var cislo:number = 0;
        if (size < 1024) {
            return size.toFixed(2) + " B";
        } else if ((cislo = size / 1024) < 1024) {
            return cislo.toFixed(2) + " kB";
        } else if ((cislo = size / (1024 * 1024)) < 1024) {
            return cislo.toFixed(2) + " MB"
        } else {
            cislo = (size / (1024 * 1024 * 1024));
            return cislo.toFixed(2) + " GB";
        }

    }


}