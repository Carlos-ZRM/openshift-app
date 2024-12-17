# OpenShift

## Crear proyecto

~~~ bash
oc new-project java
oc project java
~~~

## Crear build config
~~~ bash
oc new-build --name api --binary --strategy docker

oc new-build --name bc-front --binary --strategy docker

~~~

## Ejecutar build
~~~ bash
oc start-build api --from-dir .  --follow

oc start-build bc-front --from-dir .  --follow


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