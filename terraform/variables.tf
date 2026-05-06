variable "resource_group_name" {
  description = "Name of the resource group"
  default     = "portfolio-terraform-rg"
}

variable "location" {
  description = "Azure region"
  default     = "Central India"
}

variable "acr_name" {
  description = "Name of Azure Container Registry"
  default     = "portfolioterraformacr"
}

variable "app_service_plan_name" {
  description = "Name of App Service Plan"
  default     = "portfolio-terraform-plan"
}

variable "web_app_name" {
  description = "Name of Web App"
  default     = "portfolio-terraform-webapp"
}