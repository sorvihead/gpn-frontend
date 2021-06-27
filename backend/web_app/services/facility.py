from typing import List, Optional

from backend.domain.well import Facility, FacilityState, Well
from backend.repository.well import WellRepository


class FacilityService:
    def __init__(self, repo: WellRepository):
        self._repo = repo

    def get_all_facilities(self) -> List[Facility]:
        wells = self._repo.list()
        return [well.facility for well in wells]

    def get_well_by_facility_id(self, id_: str) -> Optional[Well]:
        return self._repo.find_well_by_facility_id(id_)
