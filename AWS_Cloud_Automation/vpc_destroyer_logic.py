import boto3
from botocore.exceptions import ClientError

# Configuration
VPC_CIDR_BLOCK = '10.0.0.0/16'
SECURITY_GROUP_NAME = 'Boto3-sg'

client = boto3.client('ec2')
# 0. Find the VPC
vpc_response = client.describe_vpcs(
    Filters=[{'Name': 'cidr-block', 'Values':[VPC_CIDR_BLOCK]}]
)
if not vpc_response['Vpcs']:
    print("VPC not found. Exiting.")
    exit()

vpc_id = vpc_response['Vpcs'][0]['VpcId']
print(f"Found VPC: {vpc_id}")


# 1. find and delete security group
try:
    sg_response = client.describe_security_groups(
        Filters=[{'Name': 'group-name', 'Values': [SECURITY_GROUP_NAME]}]
    )
    if sg_response['SecurityGroups']:
        sg_id = sg_response['SecurityGroups'][0]['GroupId']
        client.delete_security_group(GroupId=sg_id)
        print(f"Deleted Security Group: {sg_id}")

except ClientError as e:
    print(f"Error deleting SG: {e}")

# Step 2. Find and Delete subnet
# find the subnet ID using its CIDR block before deletion.

# Find all subnets in the VPC
subnets_response = client.describe_subnets(
    Filters=[{'Name': 'vpc-id', 'Values': [vpc_id]}]
)
for subnet in subnets_response['Subnets']:
    subnet_id = subnet['SubnetId']
    client.delete_subnet(SubnetId=subnet_id)
    print(f"Deleted Subnet: {subnet_id}")

# 3. Find the VPC id to detach igw 
vpc_response = client.describe_vpcs(
    Filters=[{'Name': 'cidr', 'Values':[VPC_CIDR_BLOCK]}]
)
if vpc_response['Vpcs']:
    vpc_id = vpc_response['Vpcs'][0]['VpcId']
    print(vpc_id)

#4. Detach igw 
igw_response = client.describe_internet_gateways(
   Filters=[{'Name': 'attachment.vpc-id', 'Values': [vpc_id]}] # Use the ID we just found
)
#  Detach and Delete it
for igw in igw_response['InternetGateways']:
    igw_id = igw['InternetGatewayId']
    client.detach_internet_gateway(InternetGatewayId=igw_id, VpcId=vpc_id)
    client.delete_internet_gateway(InternetGatewayId=igw_id)
    print(f"Detached and deleted IGW: {igw_id}")    

# 5. CleanUp custom routables associate with my custom vpc
rt_response = client.describe_route_tables(
    Filters=[{'Name':'vpc-id', 'Values': [vpc_id]}]
)

if rt_response['RouteTables']:
    for table in rt_response['RouteTables']:
        # Check if this table is NOT the main one
        is_main = False
        for assoc in table.get('Associations', []):
            if assoc.get('Main'):
                is_main = True
        
        if not is_main:
            custom_rt_id = table['RouteTableId']
            # Now we can delete it
            rt_response = client.delete_route_table( RouteTableId= custom_rt_id)
            print(f"Deleted custom Route Table: {custom_rt_id}")

# Step 6. Deleting the Container(Vpc)
vpc_response = client.delete_vpc(
    VpcId=vpc_id
)
print(f"delete Vpc {vpc_id}")