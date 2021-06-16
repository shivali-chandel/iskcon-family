import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  fetchAllGroup(data) {
    return this.http.post('./api/', data);
  }

  SaveFetchGeoCode(data) {
    return this.http.post('./api/geocode', data);
  }
}
