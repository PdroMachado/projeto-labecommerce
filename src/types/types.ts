export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at?: string,
  }
  
  export type TProduct = {
    id: string,
    name: string,
    price: string,
    description: string,
    imageUrl: string
  }
  
  export type PurchaseData = {
    id: string,
    buyer: string,
    total_price: number,
    created_at: string
  }
  export type PurchaseProducts = {
    purchase_id: string,
    product_id: string,
    quantity: number
  }
  export type Purchase ={
    purchase_id: string,
    buyerId: string,
    buyerName: string,
    buyerEmail:string,
    totalPrice: number,
    createdAt:string,
    products:[{
      id:string,
      name:string,
      price:number,
      description:string
      imageUrl:string,
      quantity: number
    }]
  }
  