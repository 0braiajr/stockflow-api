from sqlalchemy.orm import Session

from app.models.product import Product
from app.repositories.report import ReportRepository


class ReportService:

    def __init__(self, db: Session):
        self.repository = ReportRepository(db)

    def dashboard(self) -> dict:
        return {
            "total_products": self.repository.count_products(),
            "total_categories": self.repository.count_categories(),
            "total_stock_value": self.repository.total_stock_value(),
            "low_stock_count": len(self.repository.low_stock_products()),
        }

    def low_stock_products(self) -> list[Product]:
        return self.repository.low_stock_products()