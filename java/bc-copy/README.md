# OpenShift

## Crear proyecto

~~~ bash
oc new-project java
oc project java
~~~

## Crear build config
~~~ bash
oc new-build --name copy --binary --strategy docker
~~~

## Ejecutar build
~~~ bash
oc start-build copy --from-dir .  --follow
oc logs -f bc/copy
~~~

## Crear APP

~~~ bash
oc get is
oc new-app image-registry.openshift-image-registry.svc:5000/java/copy
~~~


## Crear ruta

~~~ bash
oc expose service/copy
oc get route

curl http://copy-java.apps.shrocp4upi414ovn.lab.upshift.rdu2.redhat.com
~~~
