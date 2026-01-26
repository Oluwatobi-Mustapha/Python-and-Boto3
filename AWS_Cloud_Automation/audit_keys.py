import boto3

client = boto3.client('iam')

# 0. lists the IAM users
iam_response = client.list_users(
    MaxItems=20  
)
users = iam_response

# 1. iterate over users
for user in users.get('Users', []):
    username = user.get('UserName')

    # 2: list access keys
    keys_response = client.list_access_keys(UserName=username)
    print(f"\nKeys for {username}: {keys_response['AccessKeyMetadata']}")

    # 3. look for active keys
    active_keys_list = []
    for key in keys_response['AccessKeyMetadata']:
        if key['Status'] == 'Active':
            active_keys_list.append(key)

        # 4. sort to find the oldest one (The "Logic")
        # This sorts by date so index [0] is the oldest
    if len(active_keys_list) > 1:
        print(f"\nuser {username} has {len(active_keys_list)} active_keys")

        active_keys_list.sort(key=lambda k: k['CreateDate'])
        key_to_kill = active_keys_list[0]
        print(f"Deactivating key: {key_to_kill['AccessKeyId']}")

        # 5. deactivate the key before deletion
        client.update_access_key(
             UserName=username, 
             AccessKeyId= key_to_kill['AccessKeyId'],
             Status='Inactive'
        )
        print(f"SUCCESS: Deactivated key {key_to_kill['AccessKeyId']} for user {username}.")