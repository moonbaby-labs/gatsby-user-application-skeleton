provider "google" {
 #   credentials = "${file(var.gcp_service_key)}"
}

# ------------------------------------------------------------------------------
# PREPARE LOCALS
#
# NOTE: Due to limitations in terraform and heavy use of nested sub-blocks in the resource,
# we have to construct some of the configuration values dynamically
# ------------------------------------------------------------------------------

locals {
  # We have to use dashes instead of dots in the access log bucket, because that bucket is not a website
  website_domain_name_dashed = replace(var.website_domain_name, ".", "-")
  access_log_kms_keys        = var.access_logs_kms_key_name == "" ? [] : [var.access_logs_kms_key_name]
  website_kms_keys           = var.website_kms_key_name == "" ? [] : [var.website_kms_key_name]
}


# ------------------------------------------------------------------------------
# CREATE THE WEBSITE BUCKET
# ------------------------------------------------------------------------------

resource "google_storage_bucket" "website" {
  provider = google-beta

  project = var.project

  name          = var.website_domain_name
  location      = var.website_location
  storage_class = var.website_storage_class

  versioning {
    enabled = var.enable_versioning
  }

  website {
    main_page_suffix = var.index_page
    not_found_page   = var.not_found_page
  }

  dynamic "cors" {
    for_each = var.enable_cors ? ["cors"] : []
    content {
      origin          = var.cors_origins
      method          = var.cors_methods
      response_header = var.cors_extra_headers
      max_age_seconds = var.cors_max_age_seconds
    }
  }

  force_destroy = var.force_destroy_website

  dynamic "encryption" {
    for_each = local.website_kms_keys
    content {
      default_kms_key_name = encryption.value
    }
  }

  labels = var.custom_labels
  logging {
    log_bucket        = google_storage_bucket.access_logs.name
    log_object_prefix = var.access_log_prefix != "" ? var.access_log_prefix : local.website_domain_name_dashed
  }
}

# ------------------------------------------------------------------------------
# CONFIGURE BUCKET ACLS
# ------------------------------------------------------------------------------

resource "google_storage_default_object_acl" "website_acl" {
  provider    = google-beta
  bucket      = google_storage_bucket.website.name
  role_entity = var.website_acls
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A SEPARATE BUCKET TO STORE ACCESS LOGS
# ---------------------------------------------------------------------------------------------------------------------

resource "google_storage_bucket" "access_logs" {
  provider = google-beta

  project = var.project

  # Use the dashed domain name
  name          = "${local.website_domain_name_dashed}-logs"
  location      = var.website_location
  storage_class = var.website_storage_class

  force_destroy = var.force_destroy_access_logs_bucket

  dynamic "encryption" {
    for_each = local.access_log_kms_keys
    content {
      default_kms_key_name = encryption.value
    }
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }

    condition {
      age = var.access_logs_expiration_time_in_days
    }
  }
  labels = var.custom_labels
}

# ---------------------------------------------------------------------------------------------------------------------
# GRANT WRITER ACCESS TO GOOGLE ANALYTICS
# ---------------------------------------------------------------------------------------------------------------------

resource "google_storage_bucket_acl" "analytics_write" {
  provider = google-beta

  bucket = google_storage_bucket.access_logs.name

  # The actual identity is 'cloud-storage-analytics@google.com', but
  # we're required to prefix that with the type of identity
  role_entity = ["WRITER:group-cloud-storage-analytics@google.com"]
}

# ---------------------------------------------------------------------------------------------------------------------
# SETUP DOMAIN
# ---------------------------------------------------------------------------------------------------------------------
/** provider "google-beta" {

}

resource "google_compute_managed_ssl_certificate" "default" {
  provider = google-beta

  name = local.website_domain_name_dashed

  managed {
    domains = ["${var.website_domain_name}."]
  }
}

resource "google_compute_target_https_proxy" "default" {
  provider = google-beta

  name             = local.website_domain_name_dashed
  url_map          = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

resource "google_compute_backend_bucket" "website" {
  name        = local.website_domain_name_dashed
  bucket_name = google_storage_bucket.website.name
  enable_cdn  = true
}

resource "google_compute_url_map" "default" {
  provider = google-beta

  name        = "url-map"

  default_service = google_compute_backend_bucket.website.id

  host_rule {
    hosts        = ["${var.website_domain_name}"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_bucket.website.id

    path_rule {
      paths   = ["/*"]
      service = google_compute_backend_bucket.website.id
    }
  }
}

resource "google_compute_http_health_check" "default" {
  provider = google-beta

  name               = "http-health-check"
  request_path       = "/"
  check_interval_sec = 1 
  timeout_sec        = 1
}

resource "google_compute_global_forwarding_rule" "default" {
  provider = google-beta

  name       = "forwarding-rule"
  target     = google_compute_target_https_proxy.default.id
  port_range = 443
}

resource "google_dns_record_set" "set" {
  provider = google-beta

  name         = "${var.website_domain_name}."
  type         = "A"
  ttl          = 3600
  managed_zone = var.dns_managed_zone_name
  rrdatas      = [google_compute_global_forwarding_rule.default.ip_address]
} **/

