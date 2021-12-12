import {FoodItem} from "./FoodItemModel.js";

export class ResturantModel {
        Menu = []
    constructor(id, resturantName,foodStyle,image,description,menu = []){
        this.id = id;
        this.resturantName = resturantName;
        this.foodStyle = foodStyle;
        this.image = image;  
        this.description = description;
        menu.forEach(n => {
            let newFood = new FoodItem(n.Food,n.Price);
            this.Menu.push(newFood)
        })
    }
}
/*
class TopVendors{
    constructor(v1,v2,v3){
        this.topVendorsList.push(v1)
        this.topVendorsList.push(v2)
        this.topVendorsList.push(v3)
        console.log(this.TopVendorsList)
    }
  
   TopVendorsList = []
}*/
 export default class VendorList{
     TopVendorsList = [];
     VendorList = []
     filteredResultDisplay = document.getElementById('filteredResults');
     filterResults = []
     searchBar = document.getElementById('searchbar')
    constructor(){
        try{
            this.fetchData()
        }
      catch(e){
        console.error(e)
      }
       this.searchBar.onkeyup = (evn) => this.searchfilter(evn)
    }
    async fetchData(){
       fetch("https://my.api.mockaroo.com/570_app.json?key=bcc7d090")
       .then(response=> response.json())
       .then(response => {
           response.forEach((n,i) =>{
            let newVendor = new ResturantModel(i,n.resturantName,n.FoodStyle,n.image,n.description, n.Menu)
            this.VendorList.push(newVendor)
            this.createVendorModel(newVendor)
            if(i <= 2 ){
                this.TopVendorsList.push(n)  
            }
           }) 
        })
       
       //console.log(this.TopVendorsList)
    }
    searchfilter(evn){
        let value = this.searchBar.value
        if(value.length < 1){
            this.filterResults = this.VendorList
            this.filterResults.forEach(n => this.createVendorModel(n))
            return
        }
        let currentDisplayArray = this.filteredResultDisplay.children
        for(let i = 0 ; i < currentDisplayArray.length; i ++){
            currentDisplayArray[i].remove()
        }
        if(evn.keycode == 46 || evn.keycode == 8){
            this.filterResults = this.VendorList
        }else{
            this.filterResults = this.VendorList.filter(n => n.resturantName.contains(value) || n.foodStyle.contains(value))
        }
        this.filterResults.forEach(n => this.createVendorModel(n))
    }
    navToNextPage(Resturant){
        window.localStorage.setItem('Resturant',JSON.stringify(Resturant))
        window.location.href = "/shop.html"
    }
    createVendorModel(newVendor){
      let card = document.createElement('div');
      card.classList.add('card')
      card.classList.add('m-2')
      card.style = "width: 18rem";
      let image = document.createElement("img");
      image.classList.add("card-image-top")
      image.classList.add("mt-3")
      image.src = newVendor.image
      let cardBody = document.createElement("div");
      cardBody.classList.add('card-body')
      let cardTitle = document.createElement('h5')
      cardTitle.classList.add('card-title')
      cardTitle.innerHTML = newVendor.resturantName
      let cardText = document.createElement("p");
      cardText.classList.add("card-text")
      cardText.innerHTML = newVendor.description
      let button = document.createElement('button')
      button.onclick = () => this.navToNextPage(newVendor)
      button.classList.add('btn')
      button.classList.add('btn-dark')
      button.innerHTML = "Shop"
      cardBody.appendChild(cardTitle)
      cardBody.appendChild(cardText);
      cardBody.appendChild(button)
      card.appendChild(image);
      card.appendChild(cardBody);
      this.filteredResultDisplay.appendChild(card)
    }
 }