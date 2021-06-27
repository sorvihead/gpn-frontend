from marshmallow import post_dump
from marshmallow import Schema


class PresentationSchema(Schema):
    skip_values = [None, {}]

    class Meta:
        ordered = True

    @post_dump
    def remove_empty_fields(self, data, **kwargs):
        return {
            key: value
            for key, value in data.items()
            if value not in self.skip_values
        }
