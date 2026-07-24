from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1",
    tags=["Health"]
)

@router.get("/")
def health_check():
    return {
        "message": "Welcome to StockFlow API!"
    }
