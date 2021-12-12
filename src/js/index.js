import { ResturantModel } from "./VendorListModel.js";
import  VendorList  from "./VendorListModel.js";

class NavBar{
    
    constructor(Vendors){
        this.Vendors = Vendors
        this.TopVen = new TopVendors(this.Vendors.TopVendorsList)
        this.Btn1.onclick = ()=> this.ClickButton(0);
        this.Btn2.onclick = ()=> this.ClickButton(1);
        this.Btn3.onclick = ()=> this.ClickButton(2);
    }
    Btn1= document.getElementById('btn1')
    Btn2= document.getElementById('btn2')
    Btn3= document.getElementById('btn3')
    ButtonList = [this.Btn1,this.Btn2,this.Btn3]
    ClickButton(place){
        this.TopVen.displayCurrentVendor(place)
        console.log(this.ButtonList[place].children)
        for(let i = 0; i < this.ButtonList.length; i++){
            if(this.ButtonList[i].children[0].classList.contains("active")){
               this.ButtonList[i].children[0].classList.remove("active")
               this.ButtonList[place].children[0].classList.add("text-muted")
            }
        }
        if((this.ButtonList[place].children[0].classList.contains("text-muted"))){
            this.ButtonList[place].children[0].classList.remove("text-muted")
            this.ButtonList[place].children[0].classList.add("active")
        }
        
    }
}
class TopVendors{
    TopVendorDisplay = document.getElementById('topVendor')
    constructor(TopVendors){
        this.TopVendorsList = TopVendors
        console.log(this.TopVendorsList)
    }
  navToNextPage(Resturant){
      window.localStorage.setItem('Resturant',JSON.stringify(Resturant))
      window.location.href = "shop.html"
  }
  displayCurrentVendor(place){
      this.TopVendorDisplay.children[0].remove()
      let card = document.createElement('div');
      card.classList.add('card')
      card.style = "width: 18rem";
      let image = document.createElement("img");
      image.classList.add("card-image-top")
      image.classList.add("mt-3")
      image.src = this.TopVendorsList[place].image
      let cardBody = document.createElement("div");
      cardBody.classList.add('card-body')
      let cardText = document.createElement("p");
      cardText.classList.add("card-text")
      cardText.innerHTML = this.TopVendorsList[place].description
      let button = document.createElement('button')
      button.classList.add('btn')
      button.classList.add('btn-dark')
      button.onclick = () => this.navToNextPage(this.TopVendorsList[place])
      button.innerHTML = "Shop"
      cardBody.appendChild(cardText);
      cardBody.appendChild(button)
      card.appendChild(image);
      card.appendChild(cardBody);
      this.TopVendorDisplay.appendChild(card)
  }
   TopVendorsList = []
}
class firstPage{
    constructor(vendor){
        window.localStorage.removeItem('Resturant')
        this.nav = new NavBar(vendor) 
    }
}
class app{
    Vendors = new VendorList()
    Selected 
    constructor(){
        this.firstP = new firstPage(this.Vendors)
    }
}
let AppStart = new app()
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
