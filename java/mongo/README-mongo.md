# OpenShift

## Crear proyecto

~~~ bash
oc new-project mongo
oc project mongo
~~~

## Crear build config
~~~ bash
oc new-build --name api --binary --strategy docker
~~~

## Ejecutar build
~~~ bash
oc start-build api --from-dir .  --follow
oc logs -f bc/api
~~~

## Crear APP

~~~ bash
oc get is api
oc new-app image-registry.openshift-image-registry.svc:5000/java/api
~~~


## Crear ruta

~~~ bash
oc expose service/api
oc get route

curl http://api-java.apps.shrocp4upi414ovn.lab.upshift.rdu2.redhat.com/sample/
~~~

# Crear APP mongo

~~~ bash

oc create deployment mongo --image=docker.io/mongo:latest
~~~