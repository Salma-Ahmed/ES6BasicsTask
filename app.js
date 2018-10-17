// validation functions
function nameCheck(name){
  if(name != undefined & name != null){
    let regExp = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/; // test if has latin,numbers,whitespaces and if has at leaset one char or number
    if(!(regExp.test(name)) || name.length > 24 ){
      throw ("name is not valid !");
    }
    else{
      return name;
    }
  }
  else{
    throw ('Your app must have a name');
  }
}
function descriptionCheck(description){
  if(typeof(description) != "string" && description != null && description != undefined){
    throw ('description must be a string!');
  }
  else{
    return description;
  }
}
function versionCheck(version){
    if (version != null && version != undefined){
      if(version <= 0){
        throw ("version should be bigger than 0 !");
      }
      else{
        return version;
      }
    }
    else{
      throw ('you must enter a version');
    }

}
function ratingCheck(rating){
  if(rating != null && rating != undefined){
    if(!(rating >= 1 && rating <=10 )){
      throw ("rating should be between 1 and 10 !");
    }
    else{
      return rating;
    }

  }
  else{
    return rating;
  }
}
function sortArray(prop) {
   return function(a,b){ return a[prop].localeCompare(b[prop]); };
}
function sortArrayByRate(rating){
  return function(a,b){ return a[rating] - b[rating] ; };
}

// Class App
class App {
  constructor(config) {
    nameCheck(config.name);
    descriptionCheck(config.description);
    versionCheck(config.version);
    ratingCheck(config.rating);
    this.name = config.name;
    this.description = config.description == undefined || null ? 'Has no description' : config.description;
    this.version = config.version;
    this.rating = config.rating == undefined || null ? 'Has no rating' : config.rating;
    // console.log (`App detils : Name : ${this.name} description : ${this.description} version: ${this.version} rating : ${this.rating}`);
  }
  release (options) {
    let version;
    if(typeof(options) == 'number'){
      versionCheck(options);
      version = options;
    }
    else{
      versionCheck(options.version);
      version  = options.version
      if(options.hasOwnProperty('description')){
        descriptionCheck(options.description);
        this.description = options.description;
      }
      if(options.hasOwnProperty('rating')){
        ratingCheck(options.rating);
        this.description = options.description;
        this.rating = options.rating;
      }
    }
    if (version > this.version){
      this.version = version;
    }
    else{
      throw ('version should be greater than old version');
    }
    console.log (`App details : Name : ${this.name} description : ${this.description} version: ${this.version} rating : ${this.rating}`);
  }
}

let myApp = new App ({
  name : 'app name',
  description : 'app description',
  version : 2,
  rating : 9,
});

let options = {
  description : 'app new description',
  version : 5,
  rating : 3,
}
// myApp.release(options);
// myApp.release(9);

// Class store

class Store extends App{
  constructor(config,apps){
    super(config);
    this.apps = apps;
    // console.log(`${this.name} ${this.description} ${this.version} ${this.rating}`);
  }
  uploadApp(newApp){
    //REWRITE USING FINDINDEX/DESTRUCTURING/ARROWFUNCTION
    if (newApp instanceof App) {
      let name;
      let oldApp;
      for (let app of this.apps){
        if(app.name == newApp.name){
          name = app.name;
          oldApp = app;
          console.log(oldApp.name);
        }
      }
      if(name != undefined){
        if(!(oldApp.version >= newApp.version)){
          oldApp.version = newApp.version;
          oldApp.description = newApp.description;
          oldApp.rating = newApp.rating;
          console.log(`${newApp.name} is updated successfully`);
        }
        else{
          throw ('the updated app version must be greater than the old version');
        }
      }
      else{
        this.apps.push(newApp)//MAKE NEW COPY < DON"T EDIT IN EXISTING ONE;
        console.log(`your app ${newApp.name} was uploaded successfully, your apps are now ${this.apps.length} `);
      }
    }
    else{
      throw ('your app must be an instance of the App class');
    }
  }
  takeDownApp(appToThrow){
    let appIndex;
    for(let app in this.apps){
      if(this.apps[app].name == appToThrow){
        appIndex = app;
      }
    }
    if(appIndex!=undefined){
      this.apps.splice(appIndex,1);
      console.log(`${appToThrow} is removed successfully, our apps are now ${this.apps.length}`);
    }
    else{
      throw ('This app does not exist in the store');
    }
  }
  searchApps(pattern){
    let appsNames = [];
    for (let app of this.apps){
      if(app.name.includes(text)){
        appsNames.push(app)
      }
    }
    if(appsNames.length > 0){
        return appsNames.sort(sortArray('name')).reverse(); //descending.
    }
    else{
      console.log('There is no app with this name')
    }
  }
  listMostRecentApps(count = 10){
    let mostRecentApps = [];
    for (let i = count; i > 0; i--) {
      let x = this.apps.pop();
      mostRecentApps.push(x);
    }
      console.log(mostRecentApps);
  }
  listMostPopularApps(count = 10){
    let popularApps = [];
    let popularAppsEqualRate = [];
    popularApps = this.apps.sort(sortArrayByRate('rating'));
    for (let i = 0; i < count; i++) {
      let x = popularApps.pop();
      popularAppsEqualRate.push(x);
    }
    console.log(popularAppsEqualRate);
  }
 }


let careem = new App ({
  name : 'careem',
  description :'careem app',
  version : 3,
  rating : 8,
});
let uber = new App({
  name : 'uber',
  description : 'uber app',
  version : 6,
  rating : 9,
});
let swvl = new App({
  name : 'swvl',
  description : 'swvl app',
  version : 3,
  rating : 2,
});
let slack = new App({
  name : 'slack',
  description : 'chat app',
  version : 8,
  rating : 9,
});
let whatsApp = new App({
  name : 'whatsApp',
  description : 'chat app',
  version : 3,
  rating : 5,
});
let otlob = new App({
  name : 'otlob',
  description : 'food delivery app',
  version : 5,
  rating : 8,
});
let glovo = new App ({
  name : 'glovo',
  description : 'food delivery app',
  version : 2,
  rating : 3,
});
let appsArray = [];
let myStore = new Store({
  name : 'transportation store',
  description : 'a store that contains all transportation apps',
  version : 3,
  rating : 6,
},appsArray);
myStore.uploadApp(careem);
myStore.uploadApp(uber);
myStore.uploadApp(swvl);
myStore.uploadApp(slack);
let newUber = new App({
  name : 'uber',
  description : 'this is the updated app',
  version : 9,
  rating : 6,
});
let newUber2 = new App({
  name : 'uber2',
  description : 'this is a new app',
  version : 5,
  rating : 6,
});
let newUber3 = {
  name : 'uber3',
  description : 'this is not an app',
  version : 2,
  rating : 6,
};

// myStore.uploadApp(newUber2);
// myStore.takeDownApp('swvl');
// myStore.searchApps('e');
// myStore.listMostRecentApps(1);
// myStore.listMostPopularApps(4);

function checkHostName(hostname){
  if( hostname.length >= 1 && hostname.length <= 32 ){
    return hostname;
  }
  else{
    throw ("Hostname is not valid !");
  }
}
function checkApps(deviceApps){
  for (let app of deviceApps) {
    if (!(app instanceof App)){
      throw ('All apps must be instance of App');
    }
  }
}

class Device{
  constructor(hostname,deviceApps){
    checkHostName(hostname);
    checkApps(deviceApps);
    this.hostname = hostname;
    this.apps = deviceApps;
    this.stores = [];
    for (let app of this.apps){
      if(app instanceof App && app instanceof Store){
        this.stores.push(app);
      }
    }
    // console.log(this.stores.length);
  }
  search(pattern) {
    let appsToSort = [];
    for (let store of this.stores) {
      for (let app in store.apps) {
        if(store.apps[app].name.includes(pattern)) {
          if(appsToSort.length > 0){
            if(store.apps[app].name == appsToSort[appsToSort.length -1].name){
              if(store.apps[app].version > appsToSort[appsToSort.length -1].version){
                appsToSort.pop();
                appsToSort.push(store.apps[app]);
              }
            }
            else{
              appsToSort.push(store.apps[app]);
            }
          }
          else{
            appsToSort.push(store.apps[app]);
          }
        }
      }
    }
    return(appsToSort.reverse());
  }
  install(name){
    let appsWithSameName = [];
    for (let store of this.stores) {
      for (let app of store.apps) {
        if(app.name == name){
          appsWithSameName.push(app);
        }
      }
    }
    if(appsWithSameName.length == 0){
      throw ('this app does not exist in the store');
    }
    else{
      let rate = 0;
      let appToInstall;
      for (let app of appsWithSameName) {
        if (app.rating >= rate){
          rate = app.rating;
          appToInstall = app;
        }
      }
      console.log(appToInstall);
    }
  }
  uninstall(name){
    let appIndex;
    for (let app in this.apps) {
      if(this.apps[app].name == name){
        appIndex = app;
      }
    }
    if(appIndex != undefined){
      console.log(this.apps.length);
      this.apps.splice(appIndex,1);
      console.log(this.apps.length);
    }
    else{
      throw ('No app with such name');
    }
  }
  listInstalledApps(){
    let arr = this.apps.slice();
    console.log(arr.sort(sortArray('name'))); //ascending
    // return this.apps.sort(sortArray('name')).reverse(); //if descending
    // console.log(arr);
  }
  update(){
    for (let app of this.apps){
      for (let store of this.stores) {
        for (let storeApp of store.apps) {
          if (app.name == storeApp.name){
            console.log(app.name ,app.version,storeApp.name,storeApp.version);
            if(app.version < storeApp.version){
              app.version = storeApp.version;
              console.log(`${app.name} updated successfully`);
            }
            else{
              console.log(`no update for ${app.name} is available`);
            }
          }
        }
      }
    }
  }
}
let slack2 = new App({
  name : 'slack',
  description : 'chat app',
  version : 11,
  rating : 6
});
let foodApps = [otlob,glovo];
let chatApps = [slack2,whatsApp];
let foodStore = new Store ({
  name : 'food store',
  description : 'this is a store for food apps',
  version : 1,
  rating : 3,
},foodApps);
let chatStore = new Store ({
  name : 'chat store',
  description : 'this is a store for chat apps',
  version : 3,
  rating : 6,
},chatApps);
let device = new Device ('salma',[slack,careem,uber,swvl,myStore,foodStore,chatStore]);
// device.search("s");
// device.install('slack');
// device.uninstall('uber');
device.listInstalledApps();
// device.update();
