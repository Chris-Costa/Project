import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactUs } from '../shared/contactUs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

    contactUrl = environment.baseUrl + 'ContactUs/';
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    postMessage(message: ContactUs): Observable<ContactUs | Number> {
        return this.http.post<ContactUs | Number>(this.contactUrl, message, this.httpOptions);
    } 
}