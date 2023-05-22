resource "aws_route53_record" "cognito" {
  name    = aws_cognito_user_pool_domain.wax_matcher.domain
  type    = "A"
  zone_id = aws_route53_zone.waxmatcher.id
  alias {
    evaluate_target_health = false
    name                   = aws_cognito_user_pool_domain.wax_matcher.cloudfront_distribution_arn
    # This zone_id is fixed
    zone_id = "Z2FDTNDATAQYW2"
  }
}

resource "aws_acm_certificate" "auth_cert" {
  domain_name               = "auth.waxmatcher.com"
  validation_method         = "DNS"
  subject_alternative_names = ["waxmatcher.com", "www.waxmatcher.com"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_cognito_user_pool" "wax_matcher" {
  name = "waxmatcher-login"
}

resource "aws_cognito_user_pool_domain" "wax_matcher" {
  domain          = "auth.waxmatcher.com"
  certificate_arn = aws_acm_certificate.auth_cert.arn

  user_pool_id = aws_cognito_user_pool.wax_matcher.id
}

resource "aws_cognito_user_pool_client" "wax_matcher" {
  name                                 = "wax_matcher"
  user_pool_id                         = aws_cognito_user_pool.wax_matcher.id
  callback_urls                        = ["https://waxmatcher.com", "http://localhost:5173/home", "http://localhost:5173/discogs/auth"]
  logout_urls                          = ["https://waxmatcher.com", "http://localhost:5173/home", "http://localhost:5173/discogs/auth"]
  default_redirect_uri                 = "https://waxmatcher.com"
  supported_identity_providers         = ["COGNITO"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["aws.cognito.signin.user.admin", "email", "openid", "phone", "profile"]
}
