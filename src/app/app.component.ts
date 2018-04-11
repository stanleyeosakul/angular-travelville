import { Component, ViewChild, ViewChildren, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {

  // Access document elements
  @ViewChild('sidenav') sidenav: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('autocomplete') autocomplete: ElementRef;
  @ViewChildren('materialboxed') materialboxed;
  @ViewChildren('scrollspy') scrollspy;

  constructor(private meta: Meta) { }

  ngOnInit() {
    // Set standard meta tags
    this.meta.addTags([
      { name: 'description', content: 'Single-page website built using Angular and Materialize CSS 1.0.0-beta (no jQuery!)' },
      { name: 'twitter:card', value: 'summary' },
      { name: 'og:title', content: 'Angular Travelville' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://github.com/stanleyeosakul/angular-travelville' },
      { name: 'og:image', content: 'assets/images/travel-seo.jpg' },
      { name: 'og:description', content: 'Single-page website built using Angular and Materialize CSS 1.0.0-beta (no jQuery!)' }], true
    );
  }

  // Initialize Materialize JS
  ngAfterViewInit() {

    // Sidenav
    M.Sidenav.init(this.sidenav.nativeElement);

    // Slider
    const sliderOptions = {
      indicators: false,
      height: 500,
      transition: 500,
      interval: 6000
    };
    M.Slider.init(this.slider.nativeElement, sliderOptions);

    // Autocomplete
    const autocompleteOptions = {
      data: {
        'Aruba': null,
        'Cancun': null,
        'Hawaii': null,
        'Florida': null,
        'California': null,
        'Jamaica': null,
        'Europe': null,
      }
    };
    M.Autocomplete.init(this.autocomplete.nativeElement, autocompleteOptions);

    // Material Box
    const imgArray = this.materialboxed._results;
    imgArray.forEach((image) => M.Materialbox.init(image.nativeElement));

    // Scrollspy
    const spyArray = this.scrollspy._results;
    spyArray.forEach((spy) => M.ScrollSpy.init(spy.nativeElement));

  }

}
