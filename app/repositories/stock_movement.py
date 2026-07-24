from sqlalchemy.orm import Session

from app.models.stock_movement import StockMovement


class StockMovementRepository:

    def __init__(self, db: Session):
        self.db = db


    def create(self, movement: StockMovement) -> StockMovement:
        self.db.add(movement)
        return movement