from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel

class Product(BaseModel):
    __tablename__ = "products"

    name: Mapped[str] = mapped_column(String(150))
    description: Mapped[str | None] = mapped_column(String(500))
    price: Mapped[float] = mapped_column(Numeric(10, 2))
    stock_quantity: Mapped[int] = mapped_column(default=0)
    minimum_stock: Mapped[int] = mapped_column(default=0)
    size: Mapped[str | None] = mapped_column(String(50))

    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    category: Mapped["Category"] = relationship(back_populates="products")
    movements: Mapped[list["StockMovement"]] = relationship(back_populates="product")
