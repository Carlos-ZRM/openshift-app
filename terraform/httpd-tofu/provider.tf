provider "kubernetes" {
  host = var.host
  #username = "kubeadmin"
  #password = "AqDTG-bVj9G-3kDb7-DTHPe"
  token = var.token_temp
  insecure = "true"
}