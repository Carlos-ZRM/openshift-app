
# data "kubernetes_resource" "route" {
#   api_version = "route.openshift.io/v1"
#   kind        = "Route"

#   metadata {
#     name      = var.app_name
#     namespace = var.namespace
#   }
# }