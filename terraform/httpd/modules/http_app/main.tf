resource "kubernetes_deployment" "deployment_app" {
  metadata {
    name = var.app_name
    namespace = var.namespace
    labels = {
      app = var.app_name
    }
  }

  spec {
    replicas = var.replicas

    selector {
      match_labels = {
        app = var.app_name
      }
    }

    template {
      metadata {
        labels = {
          app = var.app_name
        }
      }

      spec {
        container {
          image = "${var.image}:${var.image_tag}"
          name  = var.app_name
        
          port {
            container_port = 8080
            name = "http"
          }
          port {
            container_port = 8443
            name = "https"
          }

        }
      }
    }
  }
}

resource "kubernetes_service" "deployment_svc" {
  metadata {
    name = var.app_name
    namespace = var.namespace
  }
  spec {
    selector = {
      app = var.app_name
    }
    session_affinity = "ClientIP"
    port {
      target_port = var.http_port
      port = 80
      name = "http-port"
    }
    port {
      target_port = var.https_port
      port = 443
      name = "https-port"
    }
    type = "ClusterIP"
  }
  depends_on = [ kubernetes_deployment.deployment_app ]
}

resource "kubernetes_manifest" "route" {
  # echo 'yamldecode(file("~/Documents/docs/rh/okd-labs/kustomize/app/base/route.yaml"))'  | terraform console 
  manifest = {
  "apiVersion" = "route.openshift.io/v1"
  "kind" = "Route"
  "metadata" = {
    "name" = "${var.app_name}"
    "namespace" = "${var.namespace}"
  }
  "spec" = {
    "port" = {
      "targetPort" = "http-port"
    }
    "tls" = {
      #"termination" = "edge"
      "insecureEdgeTerminationPolicy" = "Redirect"
    }
    "to" = {
      "kind" = "Service"
      "name" = "${var.app_name}"
      "weight" = 100
    }
    "wildcardPolicy" = "None"
  }
  }
  depends_on = [ kubernetes_deployment.deployment_app,
  kubernetes_service.deployment_svc
  ]
}