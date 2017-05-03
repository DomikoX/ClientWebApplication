import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable ,BehaviorSubject} from 'rxjs';

import {Router} from "@angular/router";
import 'rxjs/add/operator/map'
import {Device} from "../_models/device";
import {WebApiService} from "./WebApi.service";

@Injectable()
export class AdminApiService {


    public token:string;
    private url = "http://sharp.kst.fri.uniza.sk/remote/Service1.svc/";
    private role:string;
    private username;

    constructor(private http:Http, private router:Router, private webApiService:WebApiService) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser && currentUser.username;
        this.token = currentUser && currentUser.token;
        this.role = currentUser && currentUser.role;
    }

    private authorizedPost(url:string, body:any):Promise<any> {
        var headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.token,});
        var options = new RequestOptions({headers: headers});
        return this.http.post(this.url + url, body, options).map((response:Response) => {
            if (response.json()[url + 'Result']) {
                return response.json()[url + 'Result'];
            }
            return response.json();
        }).toPromise().catch((error) => {
            console.log("Error while Admin Post");
        });
    }

    private authorizedGet(url:string):Promise<any> {
        var headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.token,});
        var options = new RequestOptions({headers: headers});
        return this.http.get(this.url + url, options).map((response:Response) => {
            if (response.json()[url + 'Result']) {
                return response.json()[url + 'Result'];
            }
            return response.json();
        }).toPromise().catch((error) => {
            if (error.status == 401) {
                this.webApiService.logout();
                this.router.navigate(['/login']);
            }

            console.log("Error while Admin Get ", error);


        });
    }


    getAllUsers():any {
        return this.authorizedGet("GetListOfUsers");
    }

    getAllDevices():any {
        return this.authorizedGet("GetListOfAllDevices");
    }

    assignDeviceToUser(deviceId:string, userId:string):any {
        return this.authorizedPost("AssingDeviceTouser", JSON.stringify({
            deviceId: deviceId,
            userId: userId,
        }));
    }


}