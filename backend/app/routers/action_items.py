from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..db import get_db

router = APIRouter(prefix="/action-items", tags=["action-items"])

@router.post("", response_model=schemas.ActionItemResponse)
def create_action_item(item: schemas.ActionItemCreate, db: Session = Depends(get_db)):
    db_item = models.ActionItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.patch("/{item_id}", response_model=schemas.ActionItemResponse)
def update_action_item(item_id: int, update: schemas.ActionItemUpdate, db: Session = Depends(get_db)):
    item = db.query(models.ActionItem).filter(models.ActionItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Action item not found")
    if update.status is not None:
        item.status = update.status
    if update.text is not None:
        item.text = update.text
    if update.assignee_name is not None:
        item.assignee_name = update.assignee_name
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{item_id}")
def delete_action_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.ActionItem).filter(models.ActionItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Action item not found")
    db.delete(item)
    db.commit()
    return {"status": "success"}
