FROM node:12 as frontend_builder
WORKDIR app/
COPY ./gpn-webclient .
RUN yarn && yarn build

FROM python:3.8-buster
WORKDIR /home/gpn
COPY requirements.txt /
RUN pip3 install --upgrade-pip
RUN pip3 --no-cache-dir install -r /requirements.txt
COPY backend backend

COPY --from=frontend_builder ./app/build/index.html ./backend/web_app/templates/index.html
COPY --from=frontend_builder ./app/build/static ./backend/web_app/static

CMD gunicorn --config backend/gunicorn.conf.py 'backend.web_app.app:create_app()'
EXPOSE 10500
