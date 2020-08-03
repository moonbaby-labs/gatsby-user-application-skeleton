provider "google" {
    credentials = "${file(var.GCP_SERVICE_KEY)}"
    project     = "${var.PROJECT_NAME}"
    region      = "${var.REGION}"
}

resource "google_storage_bucket" "static" {
  name          = "${var.BUCKET_NAME}"
  location      = "${var.REGION}"

  bucket_policy_only = true
  

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
  cors {
    origin          = ["${var.BUCKET_NAME}"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_member" "member" {
  bucket = "${var.BUCKET_NAME}"
  role = "roles/storage.viewer"
  member = "allUsers"
}

resource "google_compute_backend_bucket" "site_backend" {
  name        = "${var.BUCKET_NAME}"
  bucket_name = "${var.BUCKET_NAME}"
  enable_cdn  = true
}

resource "google_compute_url_map" "urlmap" {
  name        = "urlmap"
  description = "a description"
  default_service = google_compute_backend_service.home.id
}

resource "google_compute_backend_service" "home" {
  name        = "home"
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 10

  health_checks = [google_compute_health_check.default.id]
  load_balancing_scheme = "INTERNAL_SELF_MANAGED"
}

resource "google_compute_health_check" "default" {
  name               = "health-check"
  http_health_check {
    port = 80
  }
}


resource "google_compute_global_forwarding_rule" "https" {
  provider   = google-beta
  project    = var.PROJECT_NAME
  count      = 1
  name       = "${var.BUCKET_NAME}"
  target     = google_compute_target_https_proxy.default[0].self_link
  port_range = "443"
}


resource "google_compute_managed_ssl_certificate" "default" {
  provider = google-beta

  name = "test-cert"

  managed {
    domains = ["${var.APP_DOMAIN}."]
  }
}


resource "google_compute_target_https_proxy" "default" {
  project = var.PROJECT_NAME
  count   = 1
  name    = "${var.BUCKET_NAME}"
  url_map = google_compute_url_map.urlmap

  ssl_certificates = google_compute_managed_ssl_certificate.default
}

resource "google_dns_record_set" "dns" {
  project = var.PROJECT_NAME
  count   = 1

  name = "${var.APP_DOMAIN}."
  type = "A"

  managed_zone = var.DNS_ZONE_NAME
}