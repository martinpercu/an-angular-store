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



## Side Menu

- Side Medu creation in the nav component.
- Only for mobile view.
- Using css tanslations actions




## Parent Child

- Using Outputs just send a product to products to cread the shopping cart



## Services 

```sh
ng g s services/store
```
- That's create just 2 files in proyect
- Use the service to manage the store cart functions



## API services 

```sh
ng g s services/products
```
- This service connect to the API
- Connect to the api to get all products
- Reorganice class Product to match the old format
- Very important in the product service file ===> <br />
getAllProducts() {<br />
  return this.http.get<Product[]>('https://fakestoreapi.com/products')<br />
} to get all from servic<br />
- with the --get<Product[]>('https...')... we return a list with in our Prorudct class


## Pipes 

- Some data like datesand currency added with pipes.

```sh
ng g p pipes/reverse
npm i date-fns
ng g p pipes/timeAgo
ng g p pipes/vocalsToNumbers
```
- Creating personal pipes just for fun



## Directives 

- Directives allow us to control the DOM.

```sh
ng g d directives/highlight
```
- Creating an easy highlight directive just to see how it's works


## State-Management (reactivity) (subscribe)

- State-Management in service store.service create an observable to be subcribed for any component.
- in component nav subscribe to "store.service" to listen Product[] state.
- Using Product[] get the number of item to change counter to show counter in the html.
- When APPs becomes more complexe using subscription is a better way to comunicate between component far away one to each other. (otherwise @Output #Input make the job)


## Linters (guide styles helper)

```sh
ng lint
(probably invite to intall with next command)
ng add @angular-eslint/schematics
```
- When run ng lint ===> we get the error and warning the proyect. The idea y just to fix them. ;)
- You could intall the ESLint in your IDE. Is possible to disable some line in order to let know the linter you know about this. (check the img.component.ts file in line 14)


## 
##

# APIs REST 

The next branches will be focus in APIs REST. Is very useful to intall.
- An API client like Insomnia our Postman
- A JSON viewer in your browser

##
##


## Get Request

In app.modules.ts :<br />
import { HttpClientModule} from '@angular/common/http'<br />
+<br />
imports: [HttpClientModule ],<br /><br />

In products.service.ts<br />
import { HttpClient} from '@angular/common/http'<br />
+<br />
constructor(private http: HttpClient) { }<br /><br />

- New api to consume (https://young-sands-07814.herokuapp.com/api/products)
- Change in services and imports etc
- Updates in html









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
