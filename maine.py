import sys
#data_received = sys.argv[1]
data_received = {"lastName":"e","firstName":"e","email":"dylanf62@nycstudents.net"}
print(data_received)
#print('Hello from Python!')
#print('Python version:', sys.version)

import requests as r
#print('HTTP Status code of example.com:', r.get('https://example.com').status_code)


import csv
# Read input from stdin
for line in sys.stdin:
    # Process input (e.g., print or perform some operations)
    print(f'Received from Node.js: {line.strip()}')

# Open the CSV file for reading
with open('data.csv', 'r') as file:
    # Create a CSV reader object
    csv_reader = csv.reader(file)

    # Iterate over each row in the CSV file
    for row in csv_reader:
        # Each row is a list of values representing the columns in that row
        
        #print(row)
        pass

def validate_last_name(last_name):
    with open('data.csv', 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0].lower() == last_name.lower():
                return True
    return False

# Function to validate first name
def validate_first_name(first_name):
    with open('data.csv', 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[1].lower() == first_name.lower():
                return True
    return False

# Function to validate email
def validate_email(email):
    with open('data.csv', 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[2].lower() == email.lower():
                return True
    return False

# Main function to validate data
def validate_data(data):
    last_name = data.get('lastName', '')
    first_name = data.get('firstName', '')
    email = data.get('email', '')

    if not validate_last_name(last_name):
        return {'error': 'Last name not found in CSV'}
    elif not validate_first_name(first_name):
        return {'error': 'First name not found in CSV'}
    elif not validate_email(email):
        return {'error': 'Email not found in CSV'}
    else:
        return {'success': 'Data found in CSV'}

# Entry point of the script
if __name__ == '__main__':
    # Read input data from stdin
    data_received = {"lastName":"e","firstName":"e","email":"dylanf62@nycstudents.net"}
    #data_received = json.loads(sys.argv[1])
    print(data_received)

    # Validate the received data
    validation_result = validate_data(data_received)

    # Print the validation result to stdout
    print(validation_result)