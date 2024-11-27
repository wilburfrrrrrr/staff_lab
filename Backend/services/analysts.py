from models.analysts import Analyst as AnalystModel
from schemas.analysts import Analyst
from sqlalchemy.orm import joinedload


class AnalystService():
    def __init__(self, db) -> None:
        self.db = db

    def get_analysts(self):
        result = self.db.query(AnalystModel).options(joinedload(AnalystModel.user)).all()
        return result

    def get_analyst(self, id: int):
        result = self.db.query(AnalystModel).options(joinedload(AnalystModel.user)).filter(AnalystModel.id == id).first()
        return result

    def create_analyst(self, analyst: Analyst):
        new_analyst = AnalystModel(**analyst.model_dump())
        self.db.add(new_analyst)
        self.db.commit()

    def update_analyst(self, id: int, data: Analyst):
        analyst = self.get_analyst(id)
        analyst.name = data.name
        analyst.second_name = data.second_name
        analyst.last_name = data.last_name
        analyst.second_last_name = data.second_last_name
        analyst.phone = data.phone
        self.db.commit()

    def delete_analyst(self, id: int):
        analyst = self.get_analyst(id)
        self.db.delete(analyst)
        self.db.commit()
