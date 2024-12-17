variable "namespace" {
  type = string
  nullable = false
}

variable "app_name" {
  type = string
}
variable "replicas" {
  type = number
  default = 1
}

variable "image" {
  type = string
  nullable = false
  
}

variable "image_tag" {
  type = string
  default = "latest"
  nullable = false
}

variable "http_port" {
  type = number
  default = 8080
}

variable "https_port" {
  type = number
  default = 8443
}

