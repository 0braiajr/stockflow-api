export interface User {
    id: number
    name: string
    email: string
}

export interface Category {
    id: number
    name: string
}

export interface Product {
    id: number
    name: string
    description: string | null
    price: number
    stock_quantity: number
    minimum_stock: number
    size: string | null
    category: Category
}

export interface StockMovement { 
    id: number
    product_id: number
    type: "in" | "out"
    quantity: number
}

export interface AuthToken {
    access_token: string
    token_type: string
}