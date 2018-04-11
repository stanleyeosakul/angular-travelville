# Angular Travelville
This project is based off of the YouTube tutorial [Build A Travel Agency Theme With Materialize CSS 1.0.0](https://www.youtube.com/watch?v=MaP3vO-vEsg) by *Brad Traversy*.  In this video, a single-page travel website is built using HTML, CSS, and vanilla JS.  This project is an extension of the original code and has been modified to use the Angular framework, including standard Meta tags for SEO compatability.  Specific instructions on how to do this are included in the description below.

<p align="center">
  <img width="500" height="300" src="./src/assets/images/homepage.png"><br>
</p>

## Versions Used
* [Angular CLI](https://github.com/angular/angular-cli) v1.7.4
* Angular v5.2.9
* [Materialize CSS](http://materializecss.com) v1.0.0-beta

## Cloning the Project for Personal Use
### Installation
1. Clone this repo `git clone https://github.com/stanleyeosakul/angular-travelville`
1. `cd` into the folder of the cloned repo
1. Run `yarn install` to install dependencies
1. Run `ng serve`, and navigate to `http://localhost:4200/`

# Using Materialize CSS with Angular
With the new update of Materialize CSS, javascript-based components no longer depend on jQuery to be used, which is great news!  All that's needed is vanilla Javascript to initialize the component, which means we can now **easily integrate these components directly into our Angular app without using external libraries**.  A quick step-by-step tutorial is provided below.

## Setup Materialize CSS
1. Run `yarn add materialize-css@next`
1. Add Materialize CSS into `.angular-cli.json`

    ```json
        // .angular-cli.json
        {
          "apps": [
            {
              ...
              "styles": [
                "../node_modules/materialize-css/dist/css/materialize.min.css",
                "styles.css"
              ],
              "scripts": [
                "../node_modules/materialize-css/dist/js/materialize.min.js"
              ],
              ...
            }
          ]
        }
    ```

1. Declare the `M` variable in `./src/typings.d.ts`

    ```typescript
    declare var M;
    ```

1. Materialize CSS is now integrated into Angular!

## Example on initializing Sidenav
In order to initialize javascript-based components in Angular, we will use **template reference variables** instead of the `querySelector` method used on the `document` object in vanilla javascript.  Once these HTML elements are referenced, they can then be intialized in the `component.ts` file.

1. Reference the `ul` element in `app.component.html` by using `#sidenav`

    ```html
      <ul class="sidenav" id="mobile-nav" #sidenav>
        <li><a href="#home">Home</a></li>
        <li><a href="#search">Search</a></li>
        <li><a href="#popular">Popular Places</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    ```

1. Access the HTML element using the `@ViewChild` decorator in `app.component.ts` and initialize it using the `ngAfterViewInit` lifecycle hook.

    ```typescript
    import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

    export class AppComponent implements AfterViewInit {

      // Access sidenav element
      @ViewChild('sidenav') sidenav: ElementRef;

      constructor() { }

      // Initialize Sidenav
      ngAfterViewInit() {
        M.Sidenav.init(this.sidenav.nativeElement);
      }

    }
    ```

## Additional explanation for initializing Material Box
In this project, Material Box is used 12 times, one for each image that is displayed in the Photo Gallery section.  If we used the above code to initialize Material Box, it would unfortunately only initialize only the first element (the other 11 would not work).  In order to initialize all elements that use the same template reference, we can use the `@ViewChildren` decorator.

1. Reference the `img` elements in `app.component.html` by using `#materialboxed`
    ```html
    <div class="row">
      <div class="col s12 m3">
        <img src="https://source.unsplash.com/1600x900/?beach" class="materialboxed responsive-img" #materialboxed>
      </div>
      <div class="col s12 m3">
        <img src="https://source.unsplash.com/1600x900/?travel" class="materialboxed responsive-img" #materialboxed>
      </div>
      <div class="col s12 m3">
        <img src="https://source.unsplash.com/1600x900/?nature" class="materialboxed responsive-img" #materialboxed>
      </div>
      <div class="col s12 m3">
        <img src="https://source.unsplash.com/1600x900/?beach,travel" class="materialboxed responsive-img" #materialboxed>
      </div>
    </div>
    ```

1. Access the HTML elements using the `@ViewChildren` decorator in `app.component.ts` and initialize them using a `forEach()` loop in the `ngAfterViewInit` lifecycle hook
    ```typescript
    import { Component, ViewChildren, AfterViewInit } from '@angular/core';

    export class AppComponent implements AfterViewInit {

      // Access materialboxed elements
      @ViewChildren('materialboxed') materialboxed: QueryList<ElementRef>;

      constructor() { }

      // Initialize Material Box
      ngAfterViewInit() {
        const imgArray = this.materialboxed.toArray();
        imgArray.forEach((image) => M.Materialbox.init(image.nativeElement));
      }

    }
    ```

# Injecting Meta Tags for SEO compatability
As this is a travel website, we need to optimize it's availability on search engines and social media.  Unfortunately, we cannot use **Angular Universal** for server side rendering as the the components themselves still depend heavily on DOM manipulation, which must be rendered in the browser.  However, we still can inject meta tags into the website for SEO and social media compatibility!

1. Provide the `Meta` class in `app.module.ts`
    ```typescript
    import { BrowserModule, Meta } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule
      ],
      providers: [
        Meta
      ],
      bootstrap: [
        AppComponent
      ]
    })
    export class AppModule { }
    ```

1. Set standard meta tags.  You can see them in your browser using the inspect feature on your web browser developer tools.
    ```typescript
    import { Component, OnInit } from '@angular/core';
    import { Meta } from '@angular/platform-browser';

    export class AppComponent implements OnInit {

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
    ```