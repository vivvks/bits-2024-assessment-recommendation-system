import base64
import json
import os
import random as ra
import re

import numpy as np
import pandas as pd
import requests
import requests as req
from flask import Flask, Response, jsonify, render_template, request, send_file
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPBasicAuth
from prometheus_client import (CollectorRegistry, Counter, Histogram,
                               generate_latest, multiprocess)
from prometheus_flask_exporter import PrometheusMetrics
from werkzeug.security import check_password_hash, generate_password_hash

from app.api import create_app
from app.api.basic_auth import auth, users
# from app.api.verify_jwt import PreAuthorizeWithAnyRole
from . import tfidfservice
# from . import itemservice

app = create_app()
metrics = PrometheusMetrics(app)
# connect_to_blob()

REQUEST_COUNT = Counter(
    "flask_request_count",
    "App Request Count",
    ["application", "method", "endpoint", "http_status"],
)
hostname = os.environ.get('HOSTNAME', 'localhost')

CONTENT_TYPE_LATEST = str("text/plain; version=0.0.4; charset=utf-8")

@app.after_request
def after_request(response):
    REQUEST_COUNT.labels(
        f"flask_{hostname}", request.method, request.path, response.status_code
    ).inc()
    return response 

@app.route("/metrics")
def metrics():
    registry = CollectorRegistry()
    multiprocess.MultiProcessCollector(registry)
    data = generate_latest(registry)
    return Response(data, mimetype=CONTENT_TYPE_LATEST)

@app.route('/', methods=["GET"])
def health():
    return Response("OK", status=200)


@app.route('/hello', methods=['GET'])
def hello():
    app.logger.debug("Hello")
    res_json = json.dumps({"message": "Hello world"})
    return Response(res_json, mimetype='application/json')


# @app.route('/authorize', methods=['GET', 'POST'])
# @PreAuthorizeWithAnyRole(roles=['cm_aiml_invoke'])
# def authorize():
#     app.logger.debug("Hello")
#     res_json = json.dumps({"message": "Hello world"})
#     return Response(res_json, mimetype='application/json')

# basic auth required for this endpoint
# ref. https://flask-httpauth.readthedocs.io/en/latest/


@app.route('/foo/<name>', methods=["GET", "POST"])
@auth.login_required
def foo(name=None):
    content = f"Hello {name}!"
    return Response(content, status=200, mimetype='application/text')


@app.route('/ping', methods=["GET", "POST"])
def ping():
    content = f"pong!"
    return Response(content, status=200, mimetype='application/text')


@app.route('/json', methods=['POST'])
def json_example():
    req_data = request.get_json()
    res_json = {"data": req_data,
                "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")}
    return jsonify(res_json)

@app.route('/recommend/<grpId>', methods=["GET", "OPTIONS"])
def recommend(grpId):
    output = tfidfservice.triggerRecommendation(grpId)
    res_json = json.dumps(eval(str(output)))
    print(res_json)
    return Response(res_json, mimetype='application/json')

# @app.route('/recommendItems/<items>', methods=["GET", "OPTIONS"])
# def recommend_items(items):
#     train = request.args.get('train')
#     output = itemservice.recommend_items(items, 20, train)
#     res_json = json.dumps(output)
#     print(res_json)
#     return Response(res_json, mimetype='application/json')

@app.route('/getAssessmentData', methods=["GET", "OPTIONS"])
def get_assessment_data():
    headers =  {
        "Content-Type":"application/json",
        "x-hasura-role": "assessment_builder_write",
        "Authorization": request.headers.get('Authorization')
    }
    resp = requests.post("https://dev-ecp-api.optum.com/assessment-func/api/v1/reference/getSameGroupElems", headers=headers)
    with open(os.path.join(os.path.dirname(__file__), "resp.json"), "w", encoding='utf-8') as file:
        json.dump(resp.json(), file, ensure_ascii=False, indent=4)

    return Response(json.dumps({"message": "Data fetched successfully"}), mimetype='application/json')
