import {AfterViewInit, Component, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DialogeModalComponent} from '../dialoge.modal/dialoge.modal.component';

declare var google: any;
declare var $: any;

@Component({
  selector: 'app-group-map',
  templateUrl: './group-map.html',
  styleUrls: ['./group-map.css']
})
export class GroupMapComponent implements AfterViewInit, OnDestroy {
  title = 'app';
  map;
  markers = [];
  previous;
  categories = [];
  class1 = 'col-md-6';
  body = {
    'page': 1,
    'page_size': 1000,
    'fields': ['categories']
  };
  selectedCategories = [];
  isLoading = false;
  previousValue = [];
  publicURLPath = '/group-locator';
  publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe';
  originalJSON = [];
  searchWords;
  previousWord;
  addresses = [];
  names = [];
  pictures = [];
  descriptions = [];
  isiFrame = false;
  categoryIds = [];
  groupIds = [];
  loaded = 3;
  apiSubscription;
  anotherSubscriber;
  doAddClass;

  isLogRequired = false;
  @ViewChild('select') select: any;

  constructor(private appService: AppService, public dialog: MatDialog, private activatedRoutes: ActivatedRoute) {
  }

  Logging(val) {
    if (this.isLogRequired) {
      console.log(val);
    }
  }

  ChangeValue(event) {
    const selectedCategories = [];
    for (let i = 0; i < event.length; i++) {
      if (event[i]) {
        selectedCategories.push(event[i]);
      } else {
        $('.mydonebtn').click();
      }
    }
    this.selectedCategories = selectedCategories;
  }

  OpenChangeEvent($event) {
    if ($event) {
      $('#cdk-overlay-0').append('<span class="mat-option-text span-style"><button mat-raised-button="" onclick="localStorage.setItem(\'clicked\', \'true\')" class="button-style mat-raised-button"><span class="mat-button-wrapper"><mat-icon _ngcontent-c1="" class="mat-icon material-icons" role="img" aria-hidden="true">done</mat-icon><span _ngcontent-c1="">Done</span></span><div class="mat-button-ripple mat-ripple" matripple="" ng-reflect-centered="false" ng-reflect-disabled="false" ng-reflect-trigger="[object HTMLButtonElement]"></div><div class="mat-button-focus-overlay"></div></button></span>');
      this.anotherSubscriber = interval(1000).pipe(
        map((x) => {
          return localStorage.getItem('clicked');
        })
      ).subscribe((observer) => {
        if (localStorage.getItem('clicked') === 'true') {
          $('.mydonebtn').click();
          this.DoneClicked();
          localStorage.removeItem('clicked');
          $('.span-style').remove();
          this.anotherSubscriber.unsubscribe();
        }
      });
    } else {
      $('.span-style').remove();
      this.anotherSubscriber.unsubscribe();
    }
  }

  DoneClicked() {
    $('.mydonebtn').click();
    this.select.close();
  }

  ChangeText(event) {
    this.searchWords = event.target.value;
    if (event.relatedTarget && event.relatedTarget.type === 'submit') {
      this.OnOpenClose(false);
    }
  }

  OnOpenClose(flag, flag2?: boolean) {
    if (!flag) {
      let doAllow = false;
      if (this.selectedCategories.length === this.previousValue.length && this.selectedCategories.length > 0) {
        for (let i = 0; i < this.selectedCategories.length; i++) {
          if (this.selectedCategories[i] !== this.previousValue[i]) {
            doAllow = true;
            break;
          }
        }
      }
      if (!doAllow && this.loaded <= 1) {
        this.SetMarkers();
      }
      if (((doAllow || (this.searchWords !== this.previousWord)) || (this.selectedCategories.length !== this.previousValue.length)) || flag2) {
        if (this.selectedCategories.length > 0) {
          this.body['category_id'] = this.selectedCategories;
        } else {
          if (this.isiFrame) {
            const category_id = this.categoryIds;
            this.body['category_id'] = category_id;
          } else {
            this.body['category_id'] = null;
          }
        }
        if (this.searchWords) {
          this.previousWord = this.searchWords;
          this.body['search'] = this.searchWords;
        }
        this.ClearMarkers();
        this.FetchAllGroup(this.body);
        this.previousValue = this.selectedCategories;

      } else if (this.searchWords !== this.previousWord) {

        this.previousWord = this.searchWords;
        this.ClearMarkers();
        const backUpValus = {
          addresses: [],
          names: [],
          groupIds: [],
          descriptions: [],
          picture: []
        };
        for (let i = 0; i < this.addresses.length; i++) {
          backUpValus.addresses.push(this.addresses[i]);
          backUpValus.names.push(this.names[i]);
          backUpValus.groupIds.push(this.groupIds[i]);
          backUpValus.descriptions.push(this.descriptions[i]);
          backUpValus.picture.push(this.pictures[i]);
        }
        this.SearchWord();
        this.customCall(this.names, this.pictures, this.descriptions, this.addresses, this.groupIds, this.map, this.markers);
        const ssub = interval(1000).pipe(
          map((x) => {
            return localStorage.getItem('isAllCompleted');
          })
        ).subscribe((observer) => {
          if (localStorage.getItem('isAllCompleted')) {
            setTimeout(() => {
              this.SetInfoWindows(this.markers);
              localStorage.setItem('isAllCompleted', 'false');
            }, 2000);
            setTimeout(() => {
              this.addresses = backUpValus.addresses;
              this.names = backUpValus.names;
              this.descriptions = backUpValus.descriptions;
              this.pictures = backUpValus.picture;
            }, 4000);
            localStorage.setItem('isAllCompleted', 'false');
            ssub.unsubscribe();
          }
        });
        if (this.selectedCategories || this.searchWords) {
          let vall = '&category_id=';
          if (this.selectedCategories) {
            for (let xx = 0; xx < this.selectedCategories.length; xx++) {
              if (xx === 0) {
                vall += this.selectedCategories[xx];
              } else {
                vall += ',' + (this.selectedCategories[xx]);
              }
            }
          }
          let vv = '';
          if (this.searchWords) {
            vv = '&search=' + this.searchWords;
          }
          this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe' + vall + vv;
        } else {
          this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe';
        }
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (window.innerWidth > 768) {
        this.doAddClass = true;
      }
    }, 100);
    setTimeout(() => {
      localStorage.removeItem('called');
      localStorage.removeItem('groups');
      localStorage.removeItem('addresses');
      localStorage.removeItem('wholeJSON');
      this.map = this.MapInitialize(this.map);
      if (this.activatedRoutes.snapshot.queryParams.category_id || this.activatedRoutes.snapshot.queryParams.search || this.activatedRoutes.snapshot.queryParams.searchby) {
        this.isiFrame = true;
        if (this.activatedRoutes.snapshot.queryParams.category_id) {
          this.selectedCategories = this.activatedRoutes.snapshot.queryParams.category_id.split(',');
          this.categoryIds = this.activatedRoutes.snapshot.queryParams.category_id.split(',');
        }
        if (this.activatedRoutes.snapshot.queryParams.search) {
          this.searchWords = this.activatedRoutes.snapshot.queryParams.search;
          let element: any;
          element = document.getElementById('search');
          element.value = this.searchWords;
        }
        this.class1 = 'col-md-12';
        this.OnOpenClose(false, true);
      } else {
        this.FetchAllGroup({
          'page': 1,
          'page_size': 1000,
          'fields': ['categories']
        });
      }
    }, 1000);
  }

  ClearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].marker.setMap(null);
    }
    this.markers = [];
  }

  FetchAllGroup(data) {
    this.loaded = this.loaded + 1;
    this.isLoading = true;
    this.apiSubscription = this.appService.fetchAllGroup(data).subscribe((response: any) => {
      this.originalJSON = response.groups.group;
      localStorage.setItem('originalJSON', JSON.stringify(this.originalJSON));
      const addresses = [];
      const names = [];
      const pictures = [];
      const groupIds = [];
      const descriptions = [];
      for (let i = 0; i < response.groups.group.length; i++) {
        const address = response.groups.group[i];
        if (address.categories.category) {
          for (let j = 0; j < address.categories.category.length; j++) {
            let contains = false;
            for (let ii = 0; ii < this.categories.length; ii++) {
              if (this.categories[ii].id === address.categories.category[j].id) {
                contains = true;
                break;
              }
            }
            if (!contains) {
              if (address.categories.category[j].name.toLowerCase().search('(private)') < 0) {
                this.categories.push(address.categories.category[j]);
              }
            }
          }
        }
        names.push(response.groups.group[i].name);
        pictures.push(response.groups.group[i].picture);
        descriptions.push(response.groups.group[i].description);
        groupIds.push(response.groups.group[i].id);
        let pushaddress = '';
        if (address.meeting_address) {
          pushaddress = pushaddress + address.meeting_address + ', ';
        }
        if (address.meeting_city) {
          pushaddress = pushaddress + address.meeting_city + ', ';
        }
        if (address.meeting_country) {
          pushaddress = pushaddress + address.meeting_country + ', ';
        }
        if (address.meeting_postcode) {
          pushaddress = pushaddress + address.meeting_postcode;
        }
        addresses.push(pushaddress);
      }
      if (this.activatedRoutes.snapshot.queryParams.category_id) {
        const ct = [];
        const listings = this.activatedRoutes.snapshot.queryParams.category_id.split(',');
        for (let k = 0; k < this.categories.length; k++) {
          for (let j = 0; j < listings.length; j++) {
            if (this.categories[k].id === listings[j]) {
              ct.push(this.categories[k]);
              break;
            }
          }
        }
        this.categories = ct;
      }
      if (Number(response.groups.page) === 1) {
        this.names = names;
        this.pictures = pictures;
        this.descriptions = descriptions;
        this.addresses = addresses;
        this.groupIds = groupIds;
      } else {
        for (let j = 0; j < names.length; j++) {
          this.names.push(names[j]);
          this.pictures.push(pictures[j]);
          this.descriptions.push(descriptions[j]);
          this.addresses.push(addresses[j]);
          this.groupIds.push(groupIds[j]);
        }
      }
      if (response.groups.on_this_page < (Number(response.groups.per_page))) {
        if (this.searchWords) {
          this.SearchWord();
        }
        this.body['page'] = 1;
        const theBody = [];
        for (let j = 0; j < this.addresses.length; j++) {
          const bdy = {
            name: this.names[j],
            address: this.addresses[j],
            description: this.descriptions[j],
            groupIds: this.groupIds[j],
            picture: this.pictures[j]
          };
          theBody.push(bdy);
        }
        if (this.loaded > 1) {
          this.customCall(this.names, this.pictures, this.descriptions, this.addresses, this.groupIds, this.map, this.markers);
          const ssub = interval(1000).pipe(
            map((x) => {
              return localStorage.getItem('isAllCompleted');
            })
          ).subscribe((observer) => {
            if (localStorage.getItem('isAllCompleted')) {
              this.SetInfoWindows(this.markers);
              localStorage.setItem('isAllCompleted', 'false');
              ssub.unsubscribe();
            }
          });
        } else {
          this.isLoading = false;
        }
      } else {
        this.body['page'] = this.body['page'] + 1;
        this.FetchAllGroup(this.body);
      }
      if (data.category_id || data.search) {
        let vall = '&category_id=';
        if (data.category_id) {
          for (let xx = 0; xx < data.category_id.length; xx++) {
            if (xx === 0) {
              vall += data.category_id[xx];
            } else {
              vall += ',' + (data.category_id[xx]);
            }
          }
        }
        let vv = '';
        if (data && data.search) {
          vv = '&search=' + data.search;
        }
        this.publicURL = window.location.origin + this.publicURLPath + '?searchby=iframe' + vall + vv;
      }
    });
  }

  SetMarkers() {
    this.isLoading = true;
    this.loaded = this.loaded + 1;
    this.customCall(this.names, this.pictures, this.descriptions, this.addresses, this.groupIds, this.map, this.markers);
    const ssub = interval(1000).pipe(
      map((x) => {
        return localStorage.getItem('isAllCompleted');
      })
    ).subscribe((observer) => {
      if (localStorage.getItem('isAllCompleted')) {
        this.SetInfoWindows(this.markers);
        localStorage.setItem('isAllCompleted', 'false');
        ssub.unsubscribe();
      }
    });
  }

  SearchWord() {
    if (this.addresses.length === this.names.length && this.addresses.length === this.pictures.length && this.addresses.length === this.descriptions.length) {
      const spliceIndexes = [];
      for (let i = 0; i < this.names.length; i++) {
        if (this.addresses[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0 || this.names[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0 || this.descriptions[i].toUpperCase().search(this.searchWords.toUpperCase()) >= 0) {
        } else {
          spliceIndexes.push(i);
        }
      }
      for (let i = spliceIndexes.length - 1; i >= 0; i--) {
        this.addresses.splice(spliceIndexes[i], 1);
        this.names.splice(spliceIndexes[i], 1);
        this.descriptions.splice(spliceIndexes[i], 1);
        this.pictures.splice(spliceIndexes[i], 1);
      }
    }
  }

  openDialog(): void {
    const data = '<script type="text/javascript"> var url=' + this.publicURL + ',d=document,w=window,b="body",i="iframe",a=d.createElement(i);a.src=url,w.setTimeout(function(){d.getElementsByTagName(b)[0].appendChild(a)},1000);</script>';
    const dialogRef = this.dialog.open(DialogeModalComponent, {
      width: '500px',
      data: this.publicURL
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  SetInfoWindows(markers) {
    for (let i = 0; i < markers.length; i++) {
      const json = markers[i];
      let contentString = '<div class="content">' +
        '<div class="content">' +
        '<div class="" style="text-align:center;">' +
        '<div class="col-md-3">' +
        '<img src="' + json.picture + '" width="60px"/>' +
        '</div>' +
        '<div class="col-md-9" style="text-align: left;">' +
        '<h1 style="font-weight: bold; margin-left: 0px; font-size: 15px; margin-top: 10px; " id="firstHeading" class="firstHeading">' + json.name + '</h1>' +
        '<p>' + json.address + '</p>' +
        '<p> <b>Category: </b>' + json.category_id + '</p>';
      if (json.description) {
        const desc = $('<p>' + json.description + '</p>').text();
        if (json.description.length > 200) {
          contentString += '<p>' + json.description.substr(0, json.description.lastIndexOf(' ', 200)) + '...' + '</p>';
        } else {
          contentString += '<p>' + json.description + '</p>';
        }
      }
      contentString += '</div>' +
        '</div>' +
        '</div>';
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      const marker = json.marker;
      marker.addListener('click', function () {
        if (this.previous) {
          this.previous.close();
        }
        const test = document.getElementsByClassName('gm-ui-hover-effect');
        for (let ii = 0; ii < test.length; ii++) {
          let elem: any;
          elem = test[ii];
          elem.click();
        }
        infowindow.open(this.map, marker);
        this.previous = infowindow;
      });
    }
    this.isLoading = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 768) {
      this.doAddClass = true;
    } else {
      this.doAddClass = false;
    }
    if (event.currentTarget.outerWidth < 450) {
      this.map.setZoom(0);
    } else {
      this.map.setZoom(2);
    }
  }


  MapInitialize(maps) {
    return initMap(maps);

    function initMap(mapa: any) {


      const mapOptions = {
        center: new google.maps.LatLng(39.567224, -101.657485),
        zoom: 4,
        minZoom: 0
      };

      mapa = new google.maps.Map(document.getElementById('map'), mapOptions);
      window.setTimeout(function () {
        let size = 2;
        if (window.outerWidth < 450) {
          size = 0;
        }
        mapa.setZoom(size);
        mapa.setCenter(new google.maps.LatLng(0, 0));
      }, 3000);
      return mapa;
    }
  }

  GetLatLongFromDescription(description, address) {
    const latLngArray = [];
    try {
      let strings = description.split('<p>GOOGLE_MAP_LATITUDE=');
      if (strings.length > 1) {
        strings = strings[1].split(';GOOGLE_MAP_LONGITUDE=');
        if (strings.length > 1) {
          latLngArray.push(Number(strings[0]));
          strings = strings[1].split('</p>');
          if (strings.length > 1) {
            latLngArray.push(Number(strings[0]));
          }
        }
      }
    } catch (e) {
      let desc = [];
      if (localStorage.getItem('not-alloweds')) {
        desc = JSON.parse(localStorage.getItem('not-alloweds'));
        desc.push(description);
        localStorage.setItem('not-alloweds', JSON.stringify(desc));
      } else {
        desc.push(description);
        localStorage.setItem('not-alloweds', JSON.stringify(desc));
      }
      console.log(e);
    }
    if (latLngArray.length === 0) {
      try {
        const val = $(description).text();
        return this.GetLatLongFromDescription(val, address);
      } catch (e) {
        console.log(e);
      }
    }
    return latLngArray;
  }

  FetchOriginalAPIJSON(groupId) {
    if (this.originalJSON) {
      for (let i = 0; i < this.originalJSON.length; i++) {
        if (this.originalJSON[i].id === groupId) {
          return this.originalJSON[i];
        }
      }
    }
  }

  customCall(name, picture, descriptions, addresses, groupIds, map, markers) {
    const bounds = new google.maps.LatLngBounds();
    const geocoder = new google.maps.Geocoder();
    localStorage.setItem('isAllCompleted', 'false');
    for (let i = 0; i < addresses.length; i++) {
      const latLngArray: any = this.GetLatLongFromDescription(descriptions[i], this.addresses[i]);
      this.fetchLatLong(addresses[i], geocoder, map, groupIds[i], latLngArray).subscribe((resp: any) => {
        const originalCatJSON = this.FetchOriginalAPIJSON(groupIds[i]);
        if (!this.ContainsWordInCategory(originalCatJSON.categories.category, '(private)')) {
          const marker = new google.maps.Marker({
            position: resp,
            animation: google.maps.Animation.DROP,
            map: map
          });
          bounds.extend(marker.getPosition());

          const respo = {
            marker: marker,
            picture: picture[i],
            description: descriptions[i],
            address: addresses[i],
            category_id: this.ArrayToString(originalCatJSON.categories.category),
            name: name[i]
          };
          markers.push(respo);
        }
      });
    }
    localStorage.setItem('isAllCompleted', 'true');
    /*map.fitBounds(bounds);*/
  }

  ContainsWordInCategory(array, word) {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name.toLowerCase().search(word.toLowerCase()) > 0) {
          return true;
        }
      }
    }
    return false;
  }

  ArrayToString(array) {
    if (array) {
      let returnValue = '';
      for (let i = 0; i < array.length; i++) {
        if (i !== array.length - 1) {
          returnValue = returnValue + array[i].name + ', ';
        } else {
          returnValue = returnValue + array[i].name;
        }
      }
      return returnValue;
    } else {
      return '';
    }
  }

  customCall2(json, mapa, markers) {
    const bounds = new google.maps.LatLngBounds();
    const geocoder = new google.maps.Geocoder();
    localStorage.setItem('isAllCompleted', 'false');
    for (let i = 0; i < json.length; i++) {
      this.fetchLatLong(json[i].address, geocoder, mapa, this.groupIds).subscribe((resp: any) => {
        const marker = new google.maps.Marker({
          position: resp,
          animation: google.maps.Animation.DROP,
          map: mapa
        });
        bounds.extend(marker.getPosition());
        const respo = {
          marker: marker,
          picture: json[i].picture,
          description: json[i].description,
          address: json[i].address,
          name: json[i].name
        };
        markers.push(respo);
      });
    }
    localStorage.setItem('isAllCompleted', 'true');
  }

  fetchLatLong(address, geocoder, mapa, groupIds: any, latlng?: any) {
    return new Observable((observer) => {
      const isError = true;
      if (isError) {
        if (latlng && latlng.length > 1) {
          observer.next({lat: latlng[0], lng: latlng[1]});
        } else if (localStorage.getItem(address)) {
          observer.next(JSON.parse(localStorage.getItem(address)));
        } else {
          if (isError) {
            const latLngStorage = JSON.parse(localStorage.getItem('latLngStorage'));
            if (latLngStorage && latLngStorage[address] && latLngStorage[address].length > 1) {

            } else {
              if (address) {
                geocoder.geocode({'address': address}, function (results, status) {
                  let ad;
                  if (localStorage.getItem('addresses')) {
                    ad = JSON.parse(localStorage.getItem('addresses'));
                  } else {
                    ad = [];
                  }
                  ad.push(address);
                  localStorage.setItem('addresses', JSON.stringify(ad));
                  if (localStorage.getItem('groups')) {
                    ad = JSON.parse(localStorage.getItem('groups'));
                  } else {
                    ad = [];
                  }
                  ad.push(groupIds);
                  localStorage.setItem('groups', JSON.stringify(ad));
                  const json = JSON.parse(localStorage.getItem('originalJSON'));
                  for (let sd = 0; sd < json.length; sd++) {
                    if (json[sd].id === groupIds) {
                      if (localStorage.getItem('wholeJSON')) {
                        ad = JSON.parse(localStorage.getItem('wholeJSON'));
                      } else {
                        ad = [];
                      }
                      ad.push(json[sd]);
                      localStorage.setItem('wholeJSON', JSON.stringify(ad));
                    }
                  }
                  if (localStorage.getItem('called')) {
                    const total = Number(localStorage.getItem('called'));
                    localStorage.setItem('called', (total + 1) + '');
                  } else {
                    localStorage.setItem('called', '1');
                  }
                  if (status === 'OK') {
                    localStorage.setItem(address, JSON.stringify(results[0].geometry.location));
                    observer.next(results[0].geometry.location);
                  } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                  }
                });
              }
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
}
