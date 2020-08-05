provider "cloudflare" {
  version = "~> 2.0"
  email   = "${var.cloudflare_email}"
  api_key = "${var.cloudflare_api_key}"
}

variable "cloudflare_email" {
    type  = "string"
}

variable "cloudflare_api_key" {
    type = "string"
}

variable "cloudflare_zone_id" {
    type = "string"
}

variable "cname_record" {
    type = "string"
}

# Add cname record to the domain
resource "cloudflare_record" "foobar" {
  zone_id = var.cloudflare_zone_id
  name    = "terraform"
  value   = var.cname_record
  type    = "CNAME"
  ttl     = 300
}