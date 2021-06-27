from marshmallow import fields
from marshmallow_enum import EnumField

from backend.domain.well import Facility, FacilityState, Node, StateInfo, Well
from backend.repository.persistence import PersistenceSchema


class StateInfoPersistenceSchema(PersistenceSchema):
    __model__ = StateInfo
    name = EnumField(FacilityState, by_value=True)
    date = fields.String()


class NodePersistenceSchema(PersistenceSchema):
    __model__ = Node
    type = fields.String()
    number = fields.Integer(allow_none=True, missing=None)
    type_size = fields.String()
    state = fields.String()
    length = fields.Float(allow_none=True, missing=None)
    class_eef = fields.String(allow_none=True, missing=None)
    opi = fields.String()
    group = fields.String(allow_none=True, missing=None)
    section = fields.Float(allow_none=True, missing=None)
    power = fields.Float(allow_none=True, missing=None)
    voltage = fields.Float(allow_none=True, missing=None)
    amperage = fields.Integer(allow_none=True, missing=None)
    no_load_amperage = fields.Integer(allow_none=True, missing=None)
    number_of_steps = fields.Integer(allow_none=True, missing=None)
    pressure = fields.Integer(allow_none=True, missing=None)


class FacilityPersistenceSchema(PersistenceSchema):
    __model__ = Facility
    id = fields.String()
    descent_depth = fields.Integer(allow_none=True, missing=None)
    brigade_number = fields.String(allow_none=True, missing=None)
    type_of_ownership = fields.String()
    lifecycle = fields.Nested(StateInfoPersistenceSchema, many=True)
    build_name = fields.String(allow_none=True, missing=None)
    nodes = fields.Nested(NodePersistenceSchema, many=True)


class WellPersistenceSchema(PersistenceSchema):
    __model__ = Well
    id = fields.String()
    do = fields.String()
    fond_type = fields.String()
    fond_group = fields.String()
    state = fields.String()
    service_company = fields.String()
    field = fields.String()
    manufactory_number = fields.Integer()
    cust_number = fields.Integer()
    facility = fields.Nested(FacilityPersistenceSchema, allow_none=True, missing=None)
