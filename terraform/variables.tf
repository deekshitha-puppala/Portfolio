variable "resource_group_name" {
  description = "Name of the resource group"
  default     = "portfolio-terraform-rg-1922"
}

variable "location" {
  description = "Azure region"
  default     = "East Asia"
}

variable "storage_account_name" {
  description = "Name of storage account for terraform state"
  default     = "tfstateportfolio1922"
}

variable "acr_name" {
  description = "Name of Azure Container Registry"
  default     = "weappACR1922"
}

variable "app_service_plan_name" {
  description = "Name of App Service Plan"
  default     = "ASP-devopsazure-87e71922"
}

variable "web_app_name" {
  description = "Name of Web App"
  default     = "deekshitha-webappresource1922"
}

variable "docker_image" {
  description = "Docker image name"
  default     = "my-webapp"
}