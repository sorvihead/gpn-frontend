import datetime

import requests
from flask import Response, jsonify, request
from flask.views import MethodView

from backend.domain.well import FacilityState, Well
from backend.web_app.rest.presentation.well import FacilityPresentationSchema
from backend.web_app.services.facility import FacilityService


class FacilityResource(MethodView):
    schema = FacilityPresentationSchema()

    def __init__(self, service: FacilityService):
        self._service = service

    def get(self):
        statuses = [FacilityState(status) for status in request.args.get("statuses").split(",")]
        return jsonify({"facilities": self.schema.dump(self._service.get_facilities_by_status(statuses), many=True)})

    def post(self):
        facility = request.json
        well = self._service.get_well_by_facility_id(facility["id"])
        if well:
            data = self._process_well(well)
            pdf = requests.post(url="http://94.142.140.195:10000/api/create_document", json=data)
            if pdf.status_code == 200:
                resp = Response(
                    response=pdf, status=200,
                    mimetype='application/pdf'
                )
                resp.headers["Content-Disposition"] = "attachment; filename=act.pdf"
                return resp
            else:
                return Response(status=500)
        else:
            return Response(status=404)

    @staticmethod
    def _process_well(well: Well):
        data = dict(
            Passport=dict(
                date=str(datetime.date.today()),
                uenz=well.facility.id,
                well_id=well.id,
                bush_number=well.cust_number,
                customer="ГПН",
                field=well.field,
                cdng_number="1234",
                stop_reason="Остановка двигателя",
                complect_responsible="Иванов Иван Иванович",
                superior="Иванов Иван Васильевич",
                organization=well.service_company,
                team=well.facility.brigade_number,
                name="Иванов Василий Иванович",
                fluid_type="Жидкость",
                density=5,
                volume=100,
                temperature=10.0
            )
        )
        return data
