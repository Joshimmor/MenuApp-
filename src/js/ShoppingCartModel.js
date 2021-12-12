import FoodItem from "FoodItemModel"
export class ShoppingCart{
    Cart = [];
    Total = 0
    addToCart(item){
        let pickedItem = new(item.name, item.price)
        this.Cart.push(item);
        this.Total += item.price;
    }
}
class cartItem extends FoodItem{
    constructor(name, price){
        super(name, price)
    }
    cartQuantity = 1
    
}