from pydantic import BaseModel

from app.schemas.category import CategoryResponse

class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    stock_quantity: int = 0
    minimum_stock: int = 0
    category_id: int

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    stock_quantity: int
    minimum_stock: int
    category: CategoryResponse

    model_config = {"from_attributes": True}

class ProductUpdate(BaseModel):
    name: str
    description: str | None = None
    price: float
    minimun_stock: int = 0
    category_id: int