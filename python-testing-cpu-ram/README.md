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
{
  "code": 200,
  "filename": "README_20260820_232551.md",
  "original_filename": "README.md",
  "payload_size_bytes": 510,
  "request_time_seconds": 0.0018,
  "saved_to": "/opt/app-root/src/./payloads/README_20260820_232551.md"
}
curl -X POST https://route-app-base-test-xpk.apps.cluster-vxwxt.dyn.redhatworkshops.io/payload  -F "file=@./README.md"
