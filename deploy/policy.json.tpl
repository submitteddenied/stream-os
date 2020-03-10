{
  "Id": "S3Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublic",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.s3_bucket}/*",
      "Principal": "*"
    }
  ]
}