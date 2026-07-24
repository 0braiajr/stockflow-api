from pydantic import BaseModel, Field

from app.models.stock_movement import MovementType

class StockMovementCreate(BaseModel):
    product_id: int
    type: MovementType
    quantity: int = Field(gt=0)


class StockMovementResponse(BaseModel):
    id: int
    product_id: int
    type: MovementType
    quantity: int

    model_config = {"from_attributes": True}