ARG BASE_IMAGE=registry.access.redhat.com/ubi9/python-312:latest


FROM ${BASE_IMAGE}

ARG APP_VERSION=0.1.0

LABEL version="${APP_VERSION}"

USER 0

COPY src .

#COPY ca/ca.crt /etc/pki/ca-trust/source/anchors/custom-bundle.crt
#RUN update-ca-trust extract

RUN mkdir ./payloads

RUN chown -R 1001:0 ./ && chmod -R g+rX ./

USER 1001

RUN pip install -r requirements.txt

EXPOSE 5000

EXPOSE 22

ENTRYPOINT ["python", "app.py"]
