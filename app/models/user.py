from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base_model import BaseModel

class User(BaseModel):
    __tablename__ = "users"

    name: Mapped[str] = mapped_column(String(100))

    email: Mapped[str] = mapped_column(
        String(255), 
        unique=True
    )

    hashed_password: Mapped[str] = mapped_column(String(255))