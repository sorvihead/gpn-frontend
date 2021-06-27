from typing import List, Optional

from backend.domain.well import FacilityState, Well
from backend.repository.persistence.well import WellPersistenceSchema


class WellRepository:
    schema = WellPersistenceSchema()

    def __init__(self, db):
        self._db = db

    def list(self) -> List[Well]:
        return [self.schema.load(doc) for doc in self._db.wells.find({})]

    def save_many(self, wells: List[Well]):
        self._db.wells.insert_many([self.schema.dump(well) for well in wells])

    def filter_by_facility_status(self, statuses: List[FacilityState]) -> List[Well]:
        return [
            self.schema.load(doc)
            for doc in self._db.wells.find({"facility.lifecycle.name": {"$in": [status.value for status in statuses]}})
        ]

    def find_well_by_facility_id(self, identifier: str) -> Optional[Well]:
        doc = self._db.wells.find_one({"facility.id": identifier})
        if doc:
            return self.schema.load(doc)
