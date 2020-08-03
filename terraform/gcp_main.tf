provider "google" {
    credentials = "${file(var.GCP_SERVICE_KEY)}"
    project     = "${var.project_name}"
    region      = "${var.region}"
}

resource "google_storage_bucket" "static-site" {
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