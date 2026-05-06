variable "resource_group_name" {
  description = "Name of the resource group"
  default     = "portfolio-terraform-rg"
}

variable "location" {
  description = "Azure region"
  default     = "Central India"
}

variable "storage_account_name" {
  description = "Name of storage account for terraform state"
  default     = "tfstateportfolio"
}

variable "acr_name" {
  description = "Name of Azure Container Registry"
  default     = "weappACR"
}

variable "app_service_plan_name" {
  description = "Name of App Service Plan"
  default     = "ASP-devopsazure-87e7"
}

variable "web_app_name" {
  description = "Name of Web App"
  default     = "deekshitha-webappresource"
}

variable "docker_image" {
  description = "Docker image name"
  default     = "my-webapp"
}