variable "host" {
   type = string
   default = "https://api.cluster-vbqlb.dynamic.redhatworkshops.io:6443"
}

variable "token_temp" {
   type = string
   default = "sha256~xZZS4OW5PF4JYY64-y0uL9c1BBPiak4DG1PpxeMzrzI"
}

variable "namespace" {
  type = string
  default = "terraforms"
}

variable "app_name" {
  type = string
  default = "httpdxpk"
}

variable "image" {
  type = string
  default = "registry.access.redhat.com/ubi9/httpd-24"
}
variable "inage_tag" {
   type = string
   default = "1-301"
   #default = "1-311"
  
}

variable "http_port" {
  type = number
  default = 8080
}

variable "https_port" {
  type = number
  default = 8443
}