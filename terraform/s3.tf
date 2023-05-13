#  =============================================
#  waxmatcher.COM Bucket
#  =============================================

resource "aws_s3_bucket" "waxmatcher_com" {
  bucket = "${local.app_name}.com"
}

resource "aws_s3_bucket_acl" "waxmatcher_com" {
  bucket     = aws_s3_bucket.waxmatcher_com.id
  acl        = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.waxmatcher_com, aws_s3_bucket_public_access_block.waxmatcher_com]

}

resource "aws_s3_bucket_versioning" "waxmatcher_com" {
  bucket = aws_s3_bucket.waxmatcher_com.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "waxmatcher_com" {
  bucket = aws_s3_bucket.waxmatcher_com.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "waxmatcher_com" {
  bucket = aws_s3_bucket.waxmatcher_com.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "waxmatcher_com" {
  bucket = aws_s3_bucket.waxmatcher_com.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

#  =============================================
#  WWW.waxmatcher.COM Bucket
#  =============================================

resource "aws_s3_bucket" "www_waxmatcher_com" {
  bucket = "www.${local.app_name}.com"
}

resource "aws_s3_bucket_acl" "www_waxmatcher_com" {
  bucket     = aws_s3_bucket.www_waxmatcher_com.id
  acl        = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.www_waxmatcher_com, aws_s3_bucket_public_access_block.www_waxmatcher_com]

}

resource "aws_s3_bucket_versioning" "www_waxmatcher_com" {
  bucket = aws_s3_bucket.www_waxmatcher_com.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "www_waxmatcher_com" {
  bucket = aws_s3_bucket.www_waxmatcher_com.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "www_waxmatcher_com" {
  bucket = aws_s3_bucket.www_waxmatcher_com.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "www_waxmatcher_com" {
  bucket = aws_s3_bucket.www_waxmatcher_com.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

#  =============================================
#  Media Bucket
#  =============================================

resource "aws_s3_bucket" "media" {
  bucket = "${local.app_name}-media"

  tags = {
    Name        = "Wax Match Media Bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_acl" "media" {
  bucket     = aws_s3_bucket.media.id
  acl        = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.media, aws_s3_bucket_public_access_block.media]
}

resource "aws_s3_bucket_versioning" "media" {
  bucket = aws_s3_bucket.media.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "media" {
  bucket = aws_s3_bucket.media.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "media" {
  bucket = aws_s3_bucket.media.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}


resource "aws_s3_bucket_public_access_block" "media" {
  bucket = aws_s3_bucket.media.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
