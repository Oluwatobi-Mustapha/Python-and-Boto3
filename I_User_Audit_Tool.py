def main():
    iam_users = {
    'admin_john': {'role': 'admin', 'mfa_enabled': True, 'last_login_days': 5},
    'dev_sarah': {'role': 'developer', 'mfa_enabled': False, 'last_login_days': 45},
    'admin_mike': {'role': 'admin', 'mfa_enabled': False, 'last_login_days': 2},
    'readonly_tom': {'role': 'readonly', 'mfa_enabled': True, 'last_login_days': 120},
    'service_backup': {'role': 'service', 'mfa_enabled': False, 'last_login_days': 0},
    'dev_jane': {'role': 'developer', 'mfa_enabled': True, 'last_login_days': 10},
    'admin_root': {'role': 'admin', 'mfa_enabled': False, 'last_login_days': 300}

}

    # If you find any user with 'root' in their username, print CRITICAL: Root user detected - {username} and stop the entire audit immediately
    for username in iam_users:
        if 'root' in username:
            print(f"CRITICAL: Root user detected - {username}")
            break
    else:
        print("Audit complete. No root users found.")
    # Loop through all users and print a security alert for any user who is an admin without MFA.
    for username, details in iam_users.items():
        role = details.get('role', 'unknown')
        mfa = details.get('mfa_enabled', False)
        if role == 'admin' and not mfa:
            print(f"\nCRITICAL: {username} is an admin without MFA")
    # Count how many users have not logged in for over 90 days (stale accounts). Print the total at the end.
    count = 0
    for user, details in iam_users.items():
        if details['last_login_days'] >= 90:
            count += 1
    print(f"the total numbers of users that has not logged over 90 days: {count}")

    # Skip any user whose name starts with service_: these are service accounts and reviewed separately.
    for user in iam_users:
        if user.startswith('service_'):
            continue
        print(f"Reviewing users: {user}")






if __name__ == '__main__':
    main()