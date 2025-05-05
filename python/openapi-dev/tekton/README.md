oc new-project workbench-images
oc project workbench-images

oc adm policy add-scc-to-user privileged -z pipeline
oc apply -f PVC.yaml