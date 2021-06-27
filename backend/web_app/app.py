import sys
from pathlib import Path

from flask import Flask, render_template

from backend.repository.well import WellRepository
from backend.web_app.config import connect_wells_database
from backend.web_app.rest.facility import FacilityResource
from backend.web_app.rest.well import WellResource
from backend.web_app.services.facility import FacilityService
from backend.web_app.services.well import WellService


def main_route():
    return render_template("index.html")


def create_wells_view(app: Flask, repo: WellRepository):
    service = WellService(repo=repo)
    app.add_url_rule("/api/wells", view_func=WellResource.as_view("wells", service=service))


def create_facilities_view(app: Flask, repo: WellRepository):
    service = FacilityService(repo=repo)
    app.add_url_rule("/api/facilities", view_func=FacilityResource.as_view("facilities", service=service))
    app.add_url_rule("/api/document/download", view_func=FacilityResource.as_view("download", service=service))


def create_app():
    sys.path.append(str(Path(__file__).resolve().parent))

    wells_repo = WellRepository(db=connect_wells_database())

    app = Flask(__name__)
    app.add_url_rule('/', view_func=main_route, methods=['GET'])
    create_wells_view(app, wells_repo)
    create_facilities_view(app, wells_repo)
    return app
