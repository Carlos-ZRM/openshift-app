## Copy values file and add custom values

~~~ bash
cp values.yaml myvalues.yaml
~~~

## Install Chart into specific namespace

~~~ bash
helm install appweb --values myvalues.yaml .
~~~