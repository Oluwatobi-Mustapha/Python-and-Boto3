import boto3
from botocore.exceptions import ClientError #This is for Error handling

s3_client = boto3.client('s3')

bucket_name = 'google'

try: 
    s3_client.create_bucket(Bucket=bucket_name) # For creating the bucket

    print(f"Your bucket has been successfully created: {bucket_name}")
  
except ClientError as e:

    error_code = e.response['Error']['Code']

    if error_code == 'BucketAlreadyOwnedByYou':
        print(f" Note: This bucket is already owned by you {bucket_name}")

    elif error_code == 'BucketAlreadyExists':
        print(f"Unfortunately, bucket: {bucket_name} already exists globally")

    else:
        print(f"Unknown Error {e}")

