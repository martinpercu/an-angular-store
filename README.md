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



## Product Detail

- Get with product ID just the product from the API
- With this product add it in the new slide




## Slides implementation

- Intall swiper 
```sh
npm i swiper@8
```

- Import the swiperModule .---> app.modules.ts
- In styles.scss add ==> @import 'swiper/scss';



## Post Request

- In product model creation DTO (data transfer object)
- Use this DTO in products.service 



## Put & Patch Request

- Put normally we send ALL values of the object (DTO)
- Patch normally we send just one or some values of the object (DTO)
All above is just the "standard" way to use put and patch. In this angular project I will use put to update some values. (exactly the reverse above). Everything depends on backend rules.


## Delete Request

- Delete is easy. Just the ID of element to delete. 
- Attention the backend could return a boolean and don't return the older/deleted object.


## Url Parameters and Pagination

- getProductsByPage(limit: number, offset: number)
- see the new functino  getAllProducts()  ---> thats is used as getProductsByPage but the limit and offset are optional



## Observable vs Promisen

- Promise is easy only one value.
- Observable a constant infomartion
- Importa using the HttpClient when we get a response from observable HttpClient will kill the process. (Otherwise an Observable will stay alive for ever OR when we programatelly will stop this process)



## Retry a request

- in getAllProducts() we use the pipe and retry.
- return this.http.get<Product[]>(this.apiUrl, { params })<br>
    .pipe(<br>
      retry(4)<br> 
    ); is easy only one value.<br>


## CORS issues

- Most of APIs will work if request are from the same domain.
- We could use in development a proxy. (../proxy.config.json)
- Now if we want to use the proxy run..
```sh
npm run start:proxy
```
OR
```sh
ng serve --proxy-config ./proxy.config.json
```


## Environments

- Angular 15 don't create by default the envirements folder. SO...
```sh
ng generate environments
```
- This command create the folder and upgrade the angular.json

Important ==> the proxy only will works in development ! ! !<br>
So I fixed that using the Environments<br><br>

Important 2 ===> Since angular 15 the default environment is prod. In older angular version was development. <br>
This is the reason the files in environments are:<br>
- environment.development.ts 
- environment.ts (this one is the prod mode)
- (older angular version works in the opposite direction environment.production.ts and environment.ts this last was the development one.)




## Error Manage

- The backend return error if product not exist (sending ID wrong)
- Implementation how to manage this errors




## Request Transform

- The backend return something and we will tranform it to show in different in front
- The class Product will have another key "taxes"
- The taxes will be manipulated in the products.service  Then we use it in the producto.component



## Avoiding callback hell

- Using switchMap from 'rxjs/operators' ==> Allows doSomething() .then doSomething2() .then doSomething3() .then doSomething4() .then doSomething5()
- switchMap allow concatenations
# 
- Using zip from 'rxjs' ==> Allows doSometing()+doSometing2()+doSometing3()+doSometing4() all at same time.
- Important this branch is just to write an example how to solve the callback hell problem using angular.



# Auth 

The next branches will be focus in Auth. (Login - Auth - tokens - headers - interceptors)




## Login and Auth

- Create 3 services.
```sh
ng g s services/auth
ng g s services/users
ng g s services/token

```



## Manage Headers 

- Move from app.component the previous logic to the nav component.
- In nav component the login button we get the token. 
- Then the Get Profile button will use the token to receive the profile. (that's will show the user email)
- Normally this logic is all together in one step. Something like loginAndGetProfile(). BUT I left separate in ordert to have a clear fonctionallity further apps.
- In the app component the "create user button" will create an user in DB. To config this go to createUser().




## Interceptor 

- Create interceptor .
```sh
ng g interceptor interceptors/time --flat
```
- the "--flat" is to create directly the file without a folder ==> (time.interceptor.ts)
- in time.interceptor.ts we will get the time that use the request
- in app.module.ts we inject the time.interceptor ===> <br>
import HTTP_INTERCEPTORS  <br>
import TimeInterceptor <br>
providers: [<br>
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true }<br>
  ],<br>
- With that we get the time for each request.



## Token with Interceptor 

- In token.service we use the login to manage the token
- In auth.service in the login() with will use the tokenService
- IMPORTANT!!!... Now profile() will not use the token because the idea is using the interceptor add the token in the case we have the token already. 
- We create the new "interceptor"
```sh
ng g interceptor interceptors/token --flat
```
- In the new token.interceptor we import the token.service and wi inject in the constructor ==> private tokenService.
- IMPORTANT! We need to "intercept" all request and add the token. 
- ADD a private method to add the token in the interceptor method. This method check if there is a token. If there is not a token just return the same request. If there is a token will change the header with the token.
- The last step is to inject in the app.module.ts
- IMPORTANT ! 
- Now I also create a new loginAndGetProfile method ==> so now only one button login and then automatecliwy with token get also the profile so in the nav.html only one button LOGIN MARTIN<br>
(Remember create first the user martin with button in app.html) <br>
Nox in nav there is no var "token" so in html to show or not the login button the var is profile. 


## Context Interceptor 

- In time.service import HttpContext and HttpContextToken 
- Add : <br>
const CHECK_TIME = new HttpContextToken<boolean>(() => false);<br>
<br>
export function checkTime() { <br>
  return new HttpContext().set(CHECK_TIME, true)<br>
}<br>
- Then the intercept use an IF to know if request.context is in true or false
- Just adding in params the "context: checkTime()" in any request and thats is.
- The interceptor will be 'activated' for this request.
- IMPORTANT! in the logic we could start HttpContextToken in true and will intercept all request. So the logic in this case is just te reverse.




## File Download

- In app.component little logic.. just a link to download somthing in local.
- Now the download programatecly:
```sh
ng g s services/files
npm i file-saver
npm install @types/file-saver --save-dev
```
- Important!! the @type must be installed for develop ==> --save-dev
- The button download in app will download a pdf file from the web.


## File Upload

- In file.service the method uploadFile().  
- Important! new FormData()  ===> FormData is the html native object.
- Important! usually we must to send also a "headers" ===> just look the comment lines in the files.service in the uploadFile(). (the backend we use no need the headers)
- The interface File in the files.service is the how the API response.


## END of  ---> APIs REST 


<br /><br />

<br /><br />


# Router and Modular dev 

The next branches will be focus in Router and Modular develop. 

## Create Routes

- Create new all pages 
```sh
ng g c pages/home
ng g c pages/register
ng g c pages/login
ng g c pages/profile
ng g c pages/notFound
ng g c pages/category
ng g c pages/myCart
ng g c pages/recovery
```
- In the app.component.html add the <router-outlet></router-outlet>
- In app-routing.module.ts make the connections.


## Create Home

- In page/home ====> <app-product> This will render the app products already we have.
- In app-routing ==> a path to root with redirect to home.
- Some refactor from products to home



## Category page

- Category needs an id ==> in app-routing-module ==> path: 'category/:id',
- In category.component ngOnint() we gets the params (the id ==> "this.categoryId").
- In products service getByCategory(). Similar to getAllProducts BUT with a new apiUrl.
- New apiUrl ===> "this.apiUrlForCategories".
- In category component ==> import { ProductsService } from './../../services/products.service';
- Copy from products limits and offset ==> both situation are quite similar.
- In category html ===> <app-products [products]="products"></app-products>
- In category also add the loadMoreProducts(). Now using getByCategory().




## Callback Hell

- In category ts modification in the ngOnit to avoid double subscribe using switchMap. (The commented ngOnit is the old one).
- Also in @Component change the templateUrl for just template and write the html line of category.
- If the html component is super quite long much better the standard way.



## RouterLink and RouterActive

- In nav get categories [] the use for render a list of them an link differents pages.
- Create service for category.
```sh
ng g s services/categories

```
- Create a model for category. Only id + name
- in ngOnit we ask for the categories



## Not Found 404 

- In app-routing ===> path: '**'.  ===> component: NotFoundComponent
- In NotFoundComponent something to show.



## Detail Product Page


- Create a page for this.service for category.
```sh
ng g c pages/product-detail

```
- Add route in app-routing.module as any other page.
- Simple product detail features.
- The back button is using @angular/common {Location}



## Query Params


- Using the queryParams will allow to share a page with the specific product detail effect.
- Important is queryParamMap in ngOnInit ! ! !
- add some logic in show on/off the detail effect to manage the route.
- The login must be twice in home and in categories
- Just to remember this is the way to add query Prams to the route: <br>
<a routerLink="." [queryParams]="{product: product.id}">Voir detail</a><br>
/category/2 ===> /category/2?product=17  or <br>
/home   ===>   /home?product=4<br>




# Modular development

## Nested Views

- Move all about the website to a new "folder" website. In website go exclusive the parts for the website ==> component directives pages and pipes. <br>
Interceptors services and models could be use for other parts. So this "folders" keeps outside website folder. 
- IMPORTANT ! This changes force us to check the imports and path everywhere. 
- Create a component "layout" inside website/components.
```sh
ng g c website/layout

```
- The Layout will be use for manage the "app-nav". (take it from app.component.html).
- Refactor app-routing.module to use the layout



## CMS Module creation

- Create the module + 3 components layout, task and grid.
- Creation cms module (important!! add --routing) ===>
```sh
ng g m cms --routing
```
- Then creation of pages + layout

```sh
ng g c cms/pages/tasks
ng g c cms/pages/grid
ng g c cms/components/layout
```
- Adding html + scss to the layout component
- In app-routing add the path to cms.<br>
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)<br>
IMPORTANT!! the line above is where the magic arrives. Only when you ask for this path the app will load this resourses. This able the LazyLoading and CodeSplitting.


## Website Module creation

- The folder "website" will be transform into a module.
- Creation website module (important!! add --routing) ===>
```sh
ng g m website --routing
```
- Update the website.module with the code in app.module
- Refactor from app to website.





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
