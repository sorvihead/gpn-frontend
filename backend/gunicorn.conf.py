import os

bind = "0.0.0.0:8080"
reload = False
preload_app = False
workers = os.cpu_count() * 2 + 1
worker_class = "sync"
loglevel = "DEBUG"
timeout = 360
accesslog = "-"  # stdout