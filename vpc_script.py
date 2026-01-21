import boto3

# 1. Create the vpc 
client = boto3.client('ec2')

vpc_response = client.create_vpc(CidrBlock='10.0.0.0/16')

vpc_id = vpc_response['Vpc']['VpcId']

# 2. Create the subnet withe vpc id
subnet_response = client.create_subnet(CidrBlock='10.0.1.0/24', VpcId=vpc_id)

subnet_id = subnet_response['Subnet']['SubnetId']

# 3. Create the internet gateway
igw_response = client.create_internet_gateway()

igw_id = igw_response['InternetGateway']['InternetGatewayId']

# 4. Connect the vpc to the Internet
response = client.attach_internet_gateway(InternetGatewayId=igw_id, VpcId=vpc_id)

# 5. Create route table
rt_response = client.create_route_table(VpcId = vpc_id)

rt_id = rt_response['RouteTable']['RouteTableId']

# 6. Create the route
r_response = client.create_route(RouteTableId=rt_id, DestinationCidrBlock='0.0.0.0/0', GatewayId=igw_id)

# 7. Associate the subnet to the route
art_response = client.associate_route_table(RouteTableId=rt_id, SubnetId=subnet_id)

# 8. Create Security Group
sg_response = client.create_security_group(Description='Boto3', GroupName='sg-1', VpcId=vpc_id)

sg_id = sg_response['GroupId']

#9. Authorize Ingress
ai_response = client.authorize_security_group_ingress(
    GroupId=sg_id,
    GroupName='sg-1',
    IpPermissions=[
        {
            'IpProtocol': 'tcp',
            'FromPort': -1,
            'ToPort': -1
        },
        
        'IpRanges': [
                {
                    'Description': 'string',
                    'CidrIp': 'string'
                }
        ] 
    ]     
)    