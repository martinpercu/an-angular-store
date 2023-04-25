## first-step

```sh
create .nvmrc file in order keep the node version we use
```

## components

Create component from CLI
```sh
ng g c components/img
```


## inputs
Using @Input in img.component now...
from the Parent (app.component) we send data to Child (img.component).

The img.component will show a default image when no data receive.<br />
The img.component will show a default image when error data receive.



## output ---> Child to Parent
on Child html ---> <br />
(load)="imgLoaded()"  <br />

on Child ts ---> <br />
@Output + EventEmitter  <br /> <br />


on Parent html ----> <br />
(loaded)="onLoaded($event)"  <br />
on Parent ts ----><br />
onLoaded(img: string) {<br />
    console.log('loaded in PARENT ', img)<br />
  }<br />


## products-component 

Create the component from CLI
```sh
ng g c components/product
```


## lyfecycle-component 

in img.component all the lyfecycle with console.logs <br />
- contructor
- ngOnChanges
- ngOnInit
- ngAfterViewInit
- ngOnDestroy


## ngDestroy 
- in img (child) on the ngOnInit() something running all time  (window.setInterval + counter)
- on app(Parent) somenthing to stop img (child) 
- BUT the event is living even if the component is off
- IMPORTANT use de ngDestroy ===>
- in img (child) on the ngOnDestroy() something to stop the first process


## SetInput 
- To control changes from the inputs ngOnChanges(changes: SimpleChanges).
- We get all changes but not easy to recognize exactly from which inputs exatly comes the "change"
- BUT ..... using Set Input ---> 

```sh
img: string = '';
@Input('img')
set changeImg(newImg: string) {
  this.img = newImg
  console.log('in SET changeImg() | change just this img ==> ' , this.img )
}
```

- Is easy to control each input

## Product List

```sh
ng g c components/products
```

- Reorganize app-img inside app-product  ===> ORDER
- Reorganize app-product inside app-products ===> ORDER
- Add some styles
- Comment old unnecessary lines 




## Header List

```sh
ng g c components/nav
```
- some html in nav header

<br /><br />






## 

# All under is automatic angular readme generated.

## 


# AnAngularStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
