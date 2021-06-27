from flask import jsonify
from flask.views import MethodView

from backend.web_app.rest.presentation.well import WellPresentationSchema
from backend.web_app.services.well import WellService


class WellResource(MethodView):
    schema = WellPresentationSchema()

    def __init__(self, service: WellService):
        self._service = service

    def get(self):
        return jsonify({"wells": self.schema.dump(self._service.get_all_wells(), many=True)})
