oc new-project workbench-images
oc project workbench-images
oc create sa tekton-adm
oc policy add-role-to-user cluster-admin system:serviceaccount:workbench-images:tekton-adm

 oc adm policy add-scc-to-user privileged -z pipeline

 oc adm policy add-scc-to-user privileged -z pipeline -dry-run--dry-