window.TF_PLAN = {"format_version":"1.2","terraform_version":"1.6.2","variables":{"app_name":{"value":"httpdxpk"},"host":{"value":"https://api.cluster-vbqlb.dynamic.redhatworkshops.io:6443"},"http_port":{"value":8080},"https_port":{"value":8443},"image":{"value":"registry.access.redhat.com/ubi9/httpd-24"},"inage_tag":{"value":"1-311"},"namespace":{"value":"tofu"},"token_temp":{"value":"sha256~OBtOgWm0_-qcPxFL911Wxnf_rgb9-sICJbQPPTKgJL0"}},"planned_values":{"root_module":{"resources":[{"address":"kubernetes_namespace.appnamespace","mode":"managed","type":"kubernetes_namespace","name":"appnamespace","provider_name":"registry.opentofu.org/hashicorp/kubernetes","schema_version":0,"values":{"metadata":[{"annotations":null,"generate_name":null,"labels":{"appname":"httpdxpk"},"name":"tofu"}],"timeouts":null,"wait_for_default_service_account":false},"sensitive_values":{"metadata":[{"labels":{}}]}}],"child_modules":[{"resources":[{"address":"module.http_app.kubernetes_deployment.deployment_app","mode":"managed","type":"kubernetes_deployment","name":"deployment_app","provider_name":"registry.opentofu.org/hashicorp/kubernetes","schema_version":1,"values":{"metadata":[{"annotations":null,"generate_name":null,"labels":{"app":"httpdxpk"},"name":"httpdxpk","namespace":"tofu"}],"spec":[{"min_ready_seconds":0,"paused":false,"progress_deadline_seconds":600,"replicas":"1","revision_history_limit":10,"selector":[{"match_expressions":[],"match_labels":{"app":"httpdxpk"}}],"template":[{"metadata":[{"annotations":null,"generate_name":null,"labels":{"app":"httpdxpk"},"namespace":null}],"spec":[{"active_deadline_seconds":null,"affinity":[],"automount_service_account_token":true,"container":[{"args":null,"command":null,"env":[],"env_from":[],"image":"registry.access.redhat.com/ubi9/httpd-24:1-311","lifecycle":[],"liveness_probe":[],"name":"httpdxpk","port":[{"container_port":8080,"host_ip":null,"host_port":null,"name":"http","protocol":"TCP"},{"container_port":8443,"host_ip":null,"host_port":null,"name":"https","protocol":"TCP"}],"readiness_probe":[],"security_context":[],"startup_probe":[],"stdin":false,"stdin_once":false,"termination_message_path":"/dev/termination-log","tty":false,"volume_mount":[],"working_dir":null}],"dns_config":[],"dns_policy":"ClusterFirst","enable_service_links":true,"host_aliases":[],"host_ipc":false,"host_network":false,"host_pid":false,"init_container":[],"node_selector":null,"os":[],"priority_class_name":null,"restart_policy":"Always","runtime_class_name":null,"security_context":[],"share_process_namespace":false,"subdomain":null,"termination_grace_period_seconds":30,"toleration":[],"topology_spread_constraint":[],"volume":[]}]}]}],"timeouts":null,"wait_for_rollout":true},"sensitive_values":{"metadata":[{"labels":{}}],"spec":[{"selector":[{"match_expressions":[],"match_labels":{}}],"strategy":[],"template":[{"metadata":[{"labels":{}}],"spec":[{"affinity":[],"container":[{"env":[],"env_from":[],"lifecycle":[],"liveness_probe":[],"port":[{},{}],"readiness_probe":[],"resources":[],"security_context":[],"startup_probe":[],"volume_mount":[]}],"dns_config":[],"host_aliases":[],"image_pull_secrets":[],"init_container":[],"os":[],"readiness_gate":[],"security_context":[],"toleration":[],"topology_spread_constraint":[],"volume":[]}]}]}]}},{"address":"module.http_app.kubernetes_manifest.route","mode":"managed","type":"kubernetes_manifest","name":"route","provider_name":"registry.opentofu.org/hashicorp/kubernetes","schema_version":1,"values":{"computed_fields":null,"field_manager":[],"manifest":{"apiVersion":"route.openshift.io/v1","kind":"Route","metadata":{"name":"httpdxpk","namespace":"tofu"},"spec":{"port":{"targetPort":"http-port"},"tls":{"termination":"edge"},"to":{"kind":"Service","name":"httpdxpk","weight":100},"wildcardPolicy":"None"}},"object":{"apiVersion":"route.openshift.io/v1","kind":"Route","metadata":{"name":"httpdxpk","namespace":"tofu"},"spec":{"httpHeaders":{"actions":{}},"port":{"targetPort":"http-port"},"tls":{"externalCertificate":{},"termination":"edge"},"to":{"kind":"Service","name":"httpdxpk","weight":100},"wildcardPolicy":"None"}},"timeouts":[],"wait":[],"wait_for":null},"sensitive_values":{"field_manager":[],"manifest":{"metadata":{},"spec":{"port":{},"tls":{},"to":{}}},"object":{"metadata":{"annotations":{},"finalizers":[],"labels":{},"managedFields":[],"ownerReferences":[]},"spec":{"alternateBackends":[],"httpHeaders":{"actions":{"request":[],"response":[]}},"port":{},"tls":{"externalCertificate":{}},"to":{}}},"timeouts":[],"wait":[]}},{"address":"module.http_app.kubernetes_service.deployment_svc","mode":"managed","type":"kubernetes_service","name":"deployment_svc","provider_name":"registry.opentofu.org/hashicorp/kubernetes","schema_version":1,"values":{"metadata":[{"annotations":null,"generate_name":null,"labels":null,"name":"httpdxpk","namespace":"tofu"}],"spec":[{"allocate_load_balancer_node_ports":true,"external_ips":null,"external_name":null,"load_balancer_class":null,"load_balancer_ip":null,"load_balancer_source_ranges":null,"port":[{"app_protocol":null,"name":"http-port","port":80,"protocol":"TCP","target_port":"8080"},{"app_protocol":null,"name":"https-port","port":443,"protocol":"TCP","target_port":"8443"}],"publish_not_ready_addresses":false,"selector":{"app":"httpdxpk"},"session_affinity":"ClientIP","type":"ClusterIP"}],"timeouts":null,"wait_for_load_balancer":true},"sensitive_values":{"metadata":[{}],"spec":[{"cluster_ips":[],"ip_families":[],"port":[{},{}],"selector":{},"session_affinity_config":[]}],"status":[]}}],"address":"module.http_app"}]}},"resource_changes":[{"address":"kubernetes_namespace.appnamespace","mode":"managed","type":"kubernetes_namespace","name":"appnamespace","provider_name":"registry.opentofu.org/hashicorp/kubernetes","change":{"actions":["create"],"before":null,"after":{"metadata":[{"annotations":null,"generate_name":null,"labels":{"appname":"httpdxpk"},"name":"tofu"}],"timeouts":null,"wait_for_default_service_account":false},"after_unknown":{"id":true,"metadata":[{"generation":true,"labels":{},"resource_version":true,"uid":true}]},"before_sensitive":false,"after_sensitive":{"metadata":[{"labels":{}}]}}},{"address":"module.http_app.kubernetes_deployment.deployment_app","module_address":"module.http_app","mode":"managed","type":"kubernetes_deployment","name":"deployment_app","provider_name":"registry.opentofu.org/hashicorp/kubernetes","change":{"actions":["create"],"before":null,"after":{"metadata":[{"annotations":null,"generate_name":null,"labels":{"app":"httpdxpk"},"name":"httpdxpk","namespace":"tofu"}],"spec":[{"min_ready_seconds":0,"paused":false,"progress_deadline_seconds":600,"replicas":"1","revision_history_limit":10,"selector":[{"match_expressions":[],"match_labels":{"app":"httpdxpk"}}],"template":[{"metadata":[{"annotations":null,"generate_name":null,"labels":{"app":"httpdxpk"},"namespace":null}],"spec":[{"active_deadline_seconds":null,"affinity":[],"automount_service_account_token":true,"container":[{"args":null,"command":null,"env":[],"env_from":[],"image":"registry.access.redhat.com/ubi9/httpd-24:1-311","lifecycle":[],"liveness_probe":[],"name":"httpdxpk","port":[{"container_port":8080,"host_ip":null,"host_port":null,"name":"http","protocol":"TCP"},{"container_port":8443,"host_ip":null,"host_port":null,"name":"https","protocol":"TCP"}],"readiness_probe":[],"security_context":[],"startup_probe":[],"stdin":false,"stdin_once":false,"termination_message_path":"/dev/termination-log","tty":false,"volume_mount":[],"working_dir":null}],"dns_config":[],"dns_policy":"ClusterFirst","enable_service_links":true,"host_aliases":[],"host_ipc":false,"host_network":false,"host_pid":false,"init_container":[],"node_selector":null,"os":[],"priority_class_name":null,"restart_policy":"Always","runtime_class_name":null,"security_context":[],"share_process_namespace":false,"subdomain":null,"termination_grace_period_seconds":30,"toleration":[],"topology_spread_constraint":[],"volume":[]}]}]}],"timeouts":null,"wait_for_rollout":true},"after_unknown":{"id":true,"metadata":[{"generation":true,"labels":{},"resource_version":true,"uid":true}],"spec":[{"selector":[{"match_expressions":[],"match_labels":{}}],"strategy":true,"template":[{"metadata":[{"generation":true,"labels":{},"name":true,"resource_version":true,"uid":true}],"spec":[{"affinity":[],"container":[{"env":[],"env_from":[],"image_pull_policy":true,"lifecycle":[],"liveness_probe":[],"port":[{},{}],"readiness_probe":[],"resources":true,"security_context":[],"startup_probe":[],"termination_message_policy":true,"volume_mount":[]}],"dns_config":[],"host_aliases":[],"hostname":true,"image_pull_secrets":true,"init_container":[],"node_name":true,"os":[],"readiness_gate":true,"scheduler_name":true,"security_context":[],"service_account_name":true,"toleration":[],"topology_spread_constraint":[],"volume":[]}]}]}]},"before_sensitive":false,"after_sensitive":{"metadata":[{"labels":{}}],"spec":[{"selector":[{"match_expressions":[],"match_labels":{}}],"strategy":[],"template":[{"metadata":[{"labels":{}}],"spec":[{"affinity":[],"container":[{"env":[],"env_from":[],"lifecycle":[],"liveness_probe":[],"port":[{},{}],"readiness_probe":[],"resources":[],"security_context":[],"startup_probe":[],"volume_mount":[]}],"dns_config":[],"host_aliases":[],"image_pull_secrets":[],"init_container":[],"os":[],"readiness_gate":[],"security_context":[],"toleration":[],"topology_spread_constraint":[],"volume":[]}]}]}]}}},{"address":"module.http_app.kubernetes_manifest.route","module_address":"module.http_app","mode":"managed","type":"kubernetes_manifest","name":"route","provider_name":"registry.opentofu.org/hashicorp/kubernetes","change":{"actions":["create"],"before":null,"after":{"computed_fields":null,"field_manager":[],"manifest":{"apiVersion":"route.openshift.io/v1","kind":"Route","metadata":{"name":"httpdxpk","namespace":"tofu"},"spec":{"port":{"targetPort":"http-port"},"tls":{"termination":"edge"},"to":{"kind":"Service","name":"httpdxpk","weight":100},"wildcardPolicy":"None"}},"object":{"apiVersion":"route.openshift.io/v1","kind":"Route","metadata":{"name":"httpdxpk","namespace":"tofu"},"spec":{"httpHeaders":{"actions":{}},"port":{"targetPort":"http-port"},"tls":{"externalCertificate":{},"termination":"edge"},"to":{"kind":"Service","name":"httpdxpk","weight":100},"wildcardPolicy":"None"}},"timeouts":[],"wait":[],"wait_for":null},"after_unknown":{"field_manager":[],"manifest":{"metadata":{},"spec":{"port":{},"tls":{},"to":{}}},"object":{"metadata":{"annotations":true,"creationTimestamp":true,"deletionGracePeriodSeconds":true,"deletionTimestamp":true,"finalizers":true,"generateName":true,"generation":true,"labels":true,"managedFields":true,"ownerReferences":true,"resourceVersion":true,"selfLink":true,"uid":true},"spec":{"alternateBackends":true,"host":true,"httpHeaders":{"actions":{"request":true,"response":true}},"path":true,"port":{},"subdomain":true,"tls":{"caCertificate":true,"certificate":true,"destinationCACertificate":true,"externalCertificate":{"name":true},"insecureEdgeTerminationPolicy":true,"key":true},"to":{}}},"timeouts":[],"wait":[]},"before_sensitive":false,"after_sensitive":{"field_manager":[],"manifest":{"metadata":{},"spec":{"port":{},"tls":{},"to":{}}},"object":{"metadata":{"annotations":{},"finalizers":[],"labels":{},"managedFields":[],"ownerReferences":[]},"spec":{"alternateBackends":[],"httpHeaders":{"actions":{"request":[],"response":[]}},"port":{},"tls":{"externalCertificate":{}},"to":{}}},"timeouts":[],"wait":[]}}},{"address":"module.http_app.kubernetes_service.deployment_svc","module_address":"module.http_app","mode":"managed","type":"kubernetes_service","name":"deployment_svc","provider_name":"registry.opentofu.org/hashicorp/kubernetes","change":{"actions":["create"],"before":null,"after":{"metadata":[{"annotations":null,"generate_name":null,"labels":null,"name":"httpdxpk","namespace":"tofu"}],"spec":[{"allocate_load_balancer_node_ports":true,"external_ips":null,"external_name":null,"load_balancer_class":null,"load_balancer_ip":null,"load_balancer_source_ranges":null,"port":[{"app_protocol":null,"name":"http-port","port":80,"protocol":"TCP","target_port":"8080"},{"app_protocol":null,"name":"https-port","port":443,"protocol":"TCP","target_port":"8443"}],"publish_not_ready_addresses":false,"selector":{"app":"httpdxpk"},"session_affinity":"ClientIP","type":"ClusterIP"}],"timeouts":null,"wait_for_load_balancer":true},"after_unknown":{"id":true,"metadata":[{"generation":true,"resource_version":true,"uid":true}],"spec":[{"cluster_ip":true,"cluster_ips":true,"external_traffic_policy":true,"health_check_node_port":true,"internal_traffic_policy":true,"ip_families":true,"ip_family_policy":true,"port":[{"node_port":true},{"node_port":true}],"selector":{},"session_affinity_config":true}],"status":true},"before_sensitive":false,"after_sensitive":{"metadata":[{}],"spec":[{"cluster_ips":[],"ip_families":[],"port":[{},{}],"selector":{},"session_affinity_config":[]}],"status":[]}}}],"configuration":{"provider_config":{"kubernetes":{"name":"kubernetes","full_name":"registry.opentofu.org/hashicorp/kubernetes","version_constraint":"\u003e= 2.0.0","expressions":{"host":{"references":["var.host"]},"insecure":{"constant_value":"true"},"token":{"references":["var.token_temp"]}}}},"root_module":{"resources":[{"address":"kubernetes_namespace.appnamespace","mode":"managed","type":"kubernetes_namespace","name":"appnamespace","provider_config_key":"kubernetes","expressions":{"metadata":[{"labels":{"references":["var.app_name"]},"name":{"references":["var.namespace"]}}]},"schema_version":0}],"module_calls":{"http_app":{"source":"./modules/http_app/","expressions":{"app_name":{"references":["var.app_name"]},"image":{"references":["var.image"]},"image_tag":{"references":["var.inage_tag"]},"namespace":{"references":["var.namespace"]}},"module":{"resources":[{"address":"kubernetes_deployment.deployment_app","mode":"managed","type":"kubernetes_deployment","name":"deployment_app","provider_config_key":"kubernetes","expressions":{"metadata":[{"labels":{"references":["var.app_name"]},"name":{"references":["var.app_name"]},"namespace":{"references":["var.namespace"]}}],"spec":[{"replicas":{"references":["var.replicas"]},"selector":[{"match_labels":{"references":["var.app_name"]}}],"template":[{"metadata":[{"labels":{"references":["var.app_name"]}}],"spec":[{"container":[{"image":{"references":["var.image","var.image_tag"]},"name":{"references":["var.app_name"]},"port":[{"container_port":{"constant_value":8080},"name":{"constant_value":"http"}},{"container_port":{"constant_value":8443},"name":{"constant_value":"https"}}]}]}]}]}]},"schema_version":1},{"address":"kubernetes_manifest.route","mode":"managed","type":"kubernetes_manifest","name":"route","provider_config_key":"kubernetes","expressions":{"manifest":{"references":["var.app_name","var.namespace","var.app_name"]}},"schema_version":1,"depends_on":["kubernetes_deployment.deployment_app","kubernetes_service.deployment_svc"]},{"address":"kubernetes_service.deployment_svc","mode":"managed","type":"kubernetes_service","name":"deployment_svc","provider_config_key":"kubernetes","expressions":{"metadata":[{"name":{"references":["var.app_name"]},"namespace":{"references":["var.namespace"]}}],"spec":[{"port":[{"name":{"constant_value":"http-port"},"port":{"constant_value":80},"target_port":{"references":["var.http_port"]}},{"name":{"constant_value":"https-port"},"port":{"constant_value":443},"target_port":{"references":["var.https_port"]}}],"selector":{"references":["var.app_name"]},"session_affinity":{"constant_value":"ClientIP"},"type":{"constant_value":"ClusterIP"}}]},"schema_version":1,"depends_on":["kubernetes_deployment.deployment_app"]}],"variables":{"app_name":{},"http_port":{"default":8080},"https_port":{"default":8443},"image":{},"image_tag":{"default":"latest"},"namespace":{},"replicas":{"default":1}}}}},"variables":{"app_name":{"default":"httpdxpk"},"host":{"default":"https://api.cluster-vbqlb.dynamic.redhatworkshops.io:6443"},"http_port":{"default":8080},"https_port":{"default":8443},"image":{"default":"registry.access.redhat.com/ubi9/httpd-24"},"inage_tag":{"default":"1-311"},"namespace":{"default":"tofu"},"token_temp":{"default":"sha256~OBtOgWm0_-qcPxFL911Wxnf_rgb9-sICJbQPPTKgJL0"}}}},"timestamp":"2024-04-12T07:45:32Z","errored":false}