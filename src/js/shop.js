class shoppingPage{
    header = document.getElementById('header')
    shopping = document.getElementById('shopping')
    constructor(){
        this.Resturant = JSON.parse(window.localStorage.getItem('Resturant'))
        console.log(this.Resturant)
        let image = document.createElement('img')
        image.src = this.Resturant.image
        image.style = "width:100%"
        this.header.appendChild(image)
        let title = document.createElement('h5')
        title.classList.add('mt-1')
        title.innerHTML = this.Resturant.resturantName
        this.header.appendChild(title)
        let row = document.createElement('div')
        row.classList.add('row')
        row.classList.add("justify-content-between")
        let site = document.createElement('a')
        site.classList.add("joshua-links")
        site.href = this.Resturant.image
        site.target = "_blank"
        site.innerHTML = "Visit Site"
        let contact = document.createElement('a')
        contact.classList.add("joshua-links")
        contact.href = "contact.html"
        contact.innerHTML = "Contact"
        row.appendChild(site)
        row.appendChild(contact)
        this.header.appendChild(row)
        this.Resturant.Menu.forEach(n => {
            console.log(n)
            this.createMenuItem(n)
        });
    }
    createMenuItem(item){
        let row = document.createElement('div')
        row.classList.add('row')
        row.classList.add("justify-content-between")
        row.classList.add("m-2")
        let col = document.createElement('div')
        col.classList.add('col')
        let foodName = document.createElement('p')
        let price = document.createElement('p')
        if(item.Food){
            foodName.innerHTML = item.Food
            price.innerHTML = item.Price
        }else{
            foodName.innerHTML = item.name
            price.innerHTML = item.price
        }
        
        col.appendChild(foodName)
        col.appendChild(price)
        let button = document.createElement('button')
        button.classList.add("btn")
        button.classList.add("btn-dark")
        button.innerHTML = "Add"
        row.appendChild(col)
        row.appendChild(button)
        this.shopping.appendChild(row)
    }
}
let shop = new shoppingPage()