from models.applicants import Applicants as ApplicantsModel
from schemas.applicants import Applicants

class ApplicantsService():
    def __init__(self, db) -> None:
        self.db = db

    def get_applicants(self):
        result = self.db.query(ApplicantsModel).filter(ApplicantsModel.state == 1).all()
        return result

    def get_applicant(self, id: int):
        result = self.db.query(ApplicantsModel).filter(ApplicantsModel.id == id).first()
        return result
    
    def get_applicants_by_state(self, state):
        result = self.db.query(ApplicantsModel).filter(ApplicantsModel.state == state).all()
        return result
    
    def create_applicant(self, applicant: Applicants):
        new_applicant = ApplicantsModel(**applicant.model_dump())
        self.db.add(new_applicant)
        self.db.commit()

    def update_applicant(self, id: int, data: Applicants):
        applicant = self.get_applicant(id)
        applicant.name = data.name
        applicant.second_name = data.second_name
        applicant.last_name = data.last_name
        applicant.second_last_name = data.second_last_name
        applicant.email = data.email
        applicant.phone = data.phone
        applicant.genre = data.genre
        applicant.state = data.state
        applicant.cv = data.cv
        self.db.commit()

    def delete_applicant(self, id: int):
        applicant = self.get_applicant(id)
        self.db.delete(applicant)
        self.db.commit()
