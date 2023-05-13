resource "aws_route53_zone" "waxmatcher" {
  name = "${local.app_name}.com"
}
resource "aws_route53_record" "waxmatcher_com" {
  zone_id = aws_route53_zone.waxmatcher.zone_id
  name    = "${local.app_name}.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.wax_matcher.domain_name
    zone_id                = aws_cloudfront_distribution.wax_matcher.hosted_zone_id
    evaluate_target_health = true
  }
}
resource "aws_route53_record" "www_waxmatcher_com" {
  zone_id = aws_route53_zone.waxmatcher.zone_id
  name    = "www.${local.app_name}.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.wax_matcher.domain_name
    zone_id                = aws_cloudfront_distribution.wax_matcher.hosted_zone_id
    evaluate_target_health = true
  }
}
