from typing import List, Optional

from backend.domain.well import Facility, FacilityState, Well
from backend.repository.well import WellRepository


class FacilityService:
    def __init__(self, repo: WellRepository):
        self._repo = repo

    def get_facilities_by_status(self, statuses: List[FacilityState]) -> List[Facility]:
        wells = self._repo.filter_by_facility_status(statuses)
        print([well.facility for well in wells if well.facility.current_status in statuses])
        return [well.facility for well in wells if well.facility.current_status in statuses]

    def get_well_by_facility_id(self, id_: str) -> Optional[Well]:
        return self._repo.find_well_by_facility_id(id_)
