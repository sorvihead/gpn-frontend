from marshmallow import EXCLUDE
from marshmallow import post_load
from marshmallow import Schema


class PersistenceSchema(Schema):
    __model__ = None

    class Meta:
        ordered = True
        unknown = EXCLUDE

    @post_load
    def make_object(self, data, **kwargs):
        return self.__model__(**data)
