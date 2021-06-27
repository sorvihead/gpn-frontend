from typing import List

from backend.domain.well import Well
from backend.repository.well import WellRepository


class WellService:
    def __init__(self, repo: WellRepository):
        self._repo = repo

    def get_all_wells(self) -> List[Well]:
        return self._repo.list()