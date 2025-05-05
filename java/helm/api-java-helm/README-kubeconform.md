~~~ bash
kube-linter lint .
~~~

~~~ bash

helm template . > template.yaml

~~~

~~~ bash
kubeconform -strict \
-schema-location default \
-schema-location https://raw.githubusercontent.com/garethr/openshift-json-schema/master \
-summary template.yaml
~~~
