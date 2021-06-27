from marshmallow import fields
from marshmallow_enum import EnumField

from backend.domain.well import FacilityState
from backend.web_app.rest.presentation import PresentationSchema


class StateInfoPresentationSchema(PresentationSchema):
    name = EnumField(FacilityState, by_value=True)
    date = fields.String()


class NodePresentationSchema(PresentationSchema):
    type = fields.String()
    number = fields.Integer(allow_none=True, missing=None)
    type_size = fields.String(data_key="typeSize")
    state = fields.String()
    length = fields.Float(allow_none=True, missing=None)
    class_eef = fields.String(allow_none=True, missing=None, data_key="classEef")
    opi = fields.String()
    group = fields.String(allow_none=True, missing=None)
    section = fields.Float(allow_none=True, missing=None)
    power = fields.Float(allow_none=True, missing=None)
    voltage = fields.Float(allow_none=True, missing=None)
    amperage = fields.Integer(allow_none=True, missing=None)
    no_load_amperage = fields.Integer(allow_none=True, missing=None, data_key="noLoadAmperage")
    number_of_steps = fields.Integer(allow_none=True, missing=None, data_key="numberOfSteps")
    pressure = fields.Integer(allow_none=True, missing=None)


class FacilityPresentationSchema(PresentationSchema):
    id = fields.String()
    descent_depth = fields.Integer(allow_none=True, missing=None, data_key="descentDepth")
    brigade_number = fields.String(allow_none=True, missing=None, data_key="brigadeNumber")
    type_of_ownership = fields.String(data_key="typeOfOwnership")
    lifecycle = fields.Nested(StateInfoPresentationSchema, many=True)
    build_name = fields.String(allow_none=True, missing=None, data_key="buildName")
    nodes = fields.Nested(NodePresentationSchema, many=True)
    current_status = EnumField(FacilityState, by_value=True, data_key="currentStatus")
    prev_status = EnumField(FacilityState, by_value=True, data_key="prevStatus")


class WellPresentationSchema(PresentationSchema):
    id = fields.String()
    do = fields.String()
    fond_type = fields.String(data_key="fondType")
    fond_group = fields.String(data_key="fondGroup")
    state = fields.String()
    service_company = fields.String(data_key="serviceCompany")
    field = fields.String()
    manufactory_number = fields.Integer(data_key="manufactoryNumber")
    cust_number = fields.Integer(data_key="custNumber")
    facility = fields.Nested(FacilityPresentationSchema, allow_none=True, missing=None)
