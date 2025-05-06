export interface Product {
    
    title : string,
    name : string,
    description: string,
    price: number,
    quantity: number,
    category: "Desktop"|"GPU"|"CPU"|"Keyboard"|"Headset"|"Laptop"

}
export interface CategorySum{
    category: string,
    total: number
}
