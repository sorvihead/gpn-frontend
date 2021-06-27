import datetime
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional


class FacilityState(Enum):
    READY = "Выпущено"
    DELIVERY_ON_BASE = "Доставка на базу"
    NEED_TO_PREPARE = "Необходимо подготовить"
    MOUNTING = "Технологический расчет и монтаж"
    IN_PROGRESS = "В работе"
    DOWN = "Выход из строя"
    DE_MOUNTING = "Демонтаж"
    REPAIRS = "Ремонт/списание"

    @classmethod
    def outside(cls):
        return [cls.READY, cls.DELIVERY_ON_BASE, cls.NEED_TO_PREPARE, cls.REPAIRS]


@dataclass
class StateInfo:
    name: FacilityState
    date: str


@dataclass
class Node:
    type: str
    number: Optional[int]
    type_size: str
    state: str
    length: Optional[float]
    class_eef: Optional[str]
    opi: str
    group: Optional[str]
    section: Optional[float]
    power: Optional[float]
    voltage: Optional[float]
    amperage: Optional[int]
    no_load_amperage: Optional[int]
    number_of_steps: Optional[int]
    pressure: Optional[int]


@dataclass
class Facility:
    id: str
    descent_depth: Optional[int]
    brigade_number: Optional[str]
    type_of_ownership: str
    lifecycle: List[StateInfo]
    build_name: Optional[str]
    nodes: List[Node]

    @property
    def current_status(self):
        return self.lifecycle[-1].name

    @property
    def prev_status(self):
        return self.lifecycle[-2].name if len(self.lifecycle) > 1 else self.current_status


@dataclass
class Well:
    id: str
    do: str
    fond_type: str
    fond_group: str
    state: str
    service_company: str
    field: str
    manufactory_number: int
    cust_number: int
    facility: Optional[Facility]


if __name__ == '__main__':
    from dataclasses import asdict
    import random
    import json


    def date_generator():
        start = (2012, 12, 28)
        curr = datetime.date(*start)
        while True:
            yield curr
            next_day = curr.day + random.randint(5, 10)
            next_month = curr.month
            next_year = curr.year
            if next_day > 28:
                next_day -= 30
                next_month += 1
                if next_month > 12:
                    next_month = 1
                    next_year += 1
            curr = datetime.date(next_year, next_month, next_day)


    dg = date_generator()

    states_info = [
        [
            StateInfo(name=FacilityState.READY.value, date=str(next(dg))),
            StateInfo(name=FacilityState.MOUNTING.value, date=str(next(dg))),
            StateInfo(name=FacilityState.IN_PROGRESS.value, date=str(next(dg)))
        ],
        [
            StateInfo(name=FacilityState.READY.value, date=str(next(dg))),
            StateInfo(name=FacilityState.MOUNTING.value, date=str(next(dg))),
            StateInfo(name=FacilityState.IN_PROGRESS.value, date=str(next(dg))),
            StateInfo(name=FacilityState.DOWN.value, date=str(next(dg))),
            StateInfo(name=FacilityState.REPAIRS.value, date=str(next(dg))),
            StateInfo(name=FacilityState.NEED_TO_PREPARE.value, date=str(next(dg))),
            StateInfo(name=FacilityState.IN_PROGRESS.value, date=str(next(dg)))
        ],
        [
            StateInfo(name=FacilityState.READY.value, date=str(next(dg))),
            StateInfo(name=FacilityState.MOUNTING.value, date=str(next(dg))),
            StateInfo(name=FacilityState.IN_PROGRESS.value, date=str(next(dg))),
            StateInfo(name=FacilityState.DOWN.value, date=str(next(dg))),
            StateInfo(name=FacilityState.DE_MOUNTING.value, date=str(next(dg)))
        ]
    ]
    wells = [
        Well(
            id=id_,
            do="ДО_ГПН",
            fond_type=random.choice(["Водозаборные", "Нефтяные"]),
            fond_group="Действующий",
            state=random.choice(["В работе", "Остановлена"]),
            service_company=random.choice(["Новомет", "Новые технологии", "СЦ ЭПУ"]),
            field="Месторождение_3",
            manufactory_number=3,
            cust_number=random.choice(list(range(0, 20))),
            facility=Facility(
                id=facility_id,
                descent_depth=random.choice([random.randint(1000, 3000), None]),
                brigade_number=None,
                build_name=str(random.randint(1000, 213124)),
                type_of_ownership=random.choice(["Не указано", "Аренда", "Сервис"]),
                lifecycle=random.choice(states_info),
                nodes=[
                    Node(
                        type=random.choice([
                            "Секции ЭЦН",
                            "ПЭД",
                            "Шламоуловители",
                            "Газосепараторы",
                            "Гидрозащита ПЭД",
                            "Сливной клапан",
                            "Обратный клапан",
                            "Основная линия",
                            "Термовставка",
                            "Удлинитель с муфтой"
                        ]),
                        number=random.choice([random.randint(0, 3), None]),
                        type_size=str(random.randint(1000, 213124)),
                        state=random.choice(["Новый", "Ремонтный"]),
                        length=random.randint(1, 2000) + random.random(),
                        class_eef="e" + str(random.randint(0, 3)),
                        opi="Нет",
                        group=random.choice(["Группа " + str(random.randint(1, 10)), None]),
                        section=random.choice([random.randint(16, 50) + random.random(), None]),
                        power=random.choice([random.randint(55, 250) + random.random(), None]),
                        voltage=random.choice([random.randint(1500, 3000), None]),
                        amperage=random.choice([random.randint(30, 70), None]),
                        no_load_amperage=random.choice([random.randint(1, 5), None]),
                        number_of_steps=random.choice([random.randint(1, 200), None]),
                        pressure=random.choice([random.randint(1, 1500), None])
                    )
                ]
            )
        )
        for id_, facility_id in (
            (str(idx), str(idx)) for idx in range(1, 100)
        )
    ]

    with open("../repository/mock.json", "w") as f:
        json.dump([asdict(well) for well in wells], f, ensure_ascii=False)
