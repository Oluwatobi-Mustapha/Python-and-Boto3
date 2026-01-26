import boto3
from tabulate import tabulate
from colorama import Fore, Style, init

# Initialize Colorama
init(autoreset=True)

client = boto3.client('iam')

table_data = []
headers = ["User", "Key ID", "Status", "Created Date", "Action Taken"]

print(f"{Fore.CYAN}Starting Audit & Cleanup: Deactivating Old Keys...{Style.RESET_ALL}\n")

# --- the logic loop ---
users = client.list_users(MaxItems=50)

for user in users.get('Users', []):
    username = user.get('UserName')
    
    # Get keys
    keys_response = client.list_access_keys(UserName=username)
    keys_list = keys_response['AccessKeyMetadata']

    # ONLY act if duplicates exist
    if len(keys_list) > 1:
        
        # Sort: Oldest [0] to Newest [-1]
        keys_list.sort(key=lambda k: k['CreateDate'])

        # --- the remediation step ---
        # identify the target (The Oldest Key)
        key_to_deactivate = keys_list[0]
        
        # deactivate it immediately
        # (only try to deactivate if it's currently Active)
        if key_to_deactivate['Status'] == 'Active':
            client.update_access_key(
                UserName=username,
                AccessKeyId=key_to_deactivate['AccessKeyId'],
                Status='Inactive'
            )
            # update the object locally so the table shows the new status
            key_to_deactivate['Status'] = 'Inactive'
            action_message = f"{Fore.YELLOW}DEACTIVATED{Style.RESET_ALL}"
        else:
            action_message = f"{Fore.YELLOW}Already Inactive{Style.RESET_ALL}"

        # --- the reporting step ---
        for key in keys_list:
            key_id = key['AccessKeyId']
            status = key['Status']
            date = key['CreateDate'].strftime("%Y-%m-%d")
            
            # special formatting for the deactivated Key
            if key['AccessKeyId'] == key_to_deactivate['AccessKeyId']:
                row_action = action_message
                status_colored = f"{Fore.RED}{status}{Style.RESET_ALL}"
            else:
                row_action = f"{Fore.GREEN}KEEP (Newest){Style.RESET_ALL}"
                status_colored = f"{Fore.GREEN}{status}{Style.RESET_ALL}"
            
            table_data.append([username, key_id, status_colored, date, row_action])

# -- the final display --
if table_data:
    print(tabulate(table_data, headers=headers, tablefmt="fancy_grid"))
    print(f"\n{Fore.GREEN}✅ COMPLETED: Old keys have been deactivated. Verify apps before deleting.{Style.RESET_ALL}")
else:
    print(f"\n{Fore.GREEN}✅ COMPLIANT: No duplicate keys found.{Style.RESET_ALL}")