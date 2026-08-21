FROM ${BASE_IMAGE | registry.access.redhat.com/ubi9/python-312:latest}

LABEL version="${APP_VERSION | 0.1.0 }"

USER 0
COPY src .
RUN mkdir ./payloads

RUN chown -R 1001:0 ./ && chmod -R g+rX ./

USER 1001

RUN pip install -r requirements.txt

EXPOSE 5000
ENTRYPOINT ["python", "app.py"]