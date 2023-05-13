#  =============================================
# frontend - Cloudfront, SSL Certificate, Cloudfront Logs, Website Bucket
#  =============================================

locals {
  s3_origin_id = "${local.app_name}_com_origin_id"
}

resource "aws_cloudfront_origin_access_identity" "s3-access-origin" {
  comment = "origin access identity resource for waxmatcher.com distrobution"
}

resource "aws_acm_certificate" "cert" {
  domain_name               = "${local.app_name}.com"
  validation_method         = "DNS"
  subject_alternative_names = ["www.${local.app_name}.com"]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_s3_bucket" "wax_matcher_cloudfront_distribution_logs" {
  bucket = "${local.app_name}-cloudwatch-logs"
}

resource "aws_s3_bucket_cors_configuration" "wax_matcher_cloudfront_distribution_logs" {
  bucket = aws_s3_bucket.wax_matcher_cloudfront_distribution_logs.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = ["*"]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_versioning" "wax_matcher_cloudfront_distribution_logs" {
  bucket = aws_s3_bucket.wax_matcher_cloudfront_distribution_logs.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_acl" "wax_matcher_cloudfront_distribution_logs" {
  bucket     = aws_s3_bucket.wax_matcher_cloudfront_distribution_logs.id
  acl        = "log-delivery-write"
  depends_on = [aws_s3_bucket_ownership_controls.wax_matcher_cloudfront_distribution_logs]

}

resource "aws_s3_bucket_ownership_controls" "wax_matcher_cloudfront_distribution_logs" {
  bucket = aws_s3_bucket.wax_matcher_cloudfront_distribution_logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_cloudfront_distribution" "wax_matcher" {
  origin {
    domain_name = aws_s3_bucket.waxmatcher_com.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3-access-origin.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Cloudfront distrobution for waxmatcher.com"
  default_root_object = "index.html"
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.wax_matcher_cloudfront_distribution_logs.bucket_domain_name
    prefix          = "${local.app_name}-website"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
  aliases = ["www.${local.app_name}.com", "${local.app_name}.com"]


  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE", "UM"]
    }
  }


  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.cert.arn
    ssl_support_method             = "sni-only"
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2021"
  }
  depends_on = [aws_acm_certificate.cert]
}

