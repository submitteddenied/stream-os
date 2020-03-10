provider "aws" {
  version = "~> 2.0"
  region  = "us-east-1"
}

variable "subdomain" {
  description = "The domain prefix to prepend to the root domain. (eg *foobar*.bazquix.com)"
}

variable "rootdomain" {
  description = "The root domain hosted in route 53. (eg foobar.*bazquix.com*)"
}

locals {
  s3_bucket_name = "${var.subdomain}.${var.rootdomain}"
}

resource "aws_s3_bucket" "static_hosting" {
  bucket = local.s3_bucket_name
  acl    = "public-read"
  policy = template_file.policy_doc.rendered

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "template_file" "policy_doc" {
  template = file("policy.json.tpl")
  vars = {
    s3_bucket = local.s3_bucket_name
  }
}

resource "aws_route53_record" "dns" {
  zone_id = "${data.aws_route53_zone.root_zone.zone_id}"
  name    = "${var.subdomain}.${var.rootdomain}"
  type    = "CNAME"
  ttl     = "300"
  records = ["${aws_s3_bucket.static_hosting.website_domain}"]
}

data "aws_route53_zone" "root_zone" {
  name         = "${var.rootdomain}."
}

output "bucket_name" {
  value = aws_s3_bucket.static_hosting.bucket
}