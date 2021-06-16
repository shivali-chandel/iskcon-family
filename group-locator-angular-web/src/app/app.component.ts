import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-root-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  static IsLoaded = false;
  subs;
  addClass;

  constructor(private router: Router, private titleService: Title) {
  }

  loading = 0;

  ngOnInit(): void {
    let rout;
	
    rout = this.router;
    this.PerformTask(rout.location.path());
    this.subs = this.router.events.subscribe((event: any) => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
      if (event instanceof NavigationEnd) {
        $('.is-active').click();
        this.PerformTask(event.url);
      }
    });
    if (!AppComponent.IsLoaded) {
      AppComponent.IsLoaded = true;
      this.loadJS('./assets/js/index.js', 'id');
	  
    }
  }

  PerformTask(url) {
    if (url === '/' || url === '') {
      this.titleService.setTitle('ISKCON | Home');
      this.addClass = true;
      $('.col-anim').removeClass('active');
      $('.home').addClass('active');
    } else if (url === '/group-locator-builder') {
      this.titleService.setTitle('ISKCON | Group Locator Builder');
      this.addClass = false;
      $('.col-anim').removeClass('active');
      $('.gl').addClass('active');
    } else if (url === '/terms-and-condition') {
      this.titleService.setTitle('ISKCON | Terms & Privacy Policy');
      this.addClass = false;
      $('.col-anim').removeClass('active');
      $('.tnc').addClass('active');
    }
  }

  loadJS(file, id) {
    let jsElm: any;
    jsElm = document.createElement('script');
    jsElm.type = 'application/javascript';
    jsElm.id = id;
    jsElm.src = file;
    document.body.appendChild(jsElm);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
