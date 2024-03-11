import csv
import sys
import winsound
import time
# Function to validate last name
def validate_last_name(last_name):
    with open('data.csv', 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0].lower() == last_name.lower():
                return {'success': 'Data is valid'}
    return {'error': 'Last name not found'}

# Function to validate first name
def validate_first_name(first_name):
    with open('data.csv', 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[1].lower() == first_name.lower():
                return {'success': 'Data is valid'}
    return {'error': 'First name not found in CSV'}

# Function to validate email
def validate_email(email):
    with open('data.csv', 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[2].lower() == email.lower():
                return {'success': 'Data is valid'}
    return {'error': 'email not found'}
    

# Main function to validate data
def validate_data(data):
    errors = []

    last_name = data.get('lastName', '')
    first_name = data.get('firstName', '')
    email = data.get('email', '')

    if error := validate_last_name(last_name):
        errors.append(error)
    if error := validate_first_name(first_name):
        errors.append(error)
    if error := validate_email(email):
        errors.append(error)

    return errors if errors else ['Data found in CSV']

# Entry point of the script
if __name__ == '__main__':
    # Read input data from stdin
    #data_received = {"lastName":"e","firstName":"e","email":"dylanf62@nycstudents.net"}
    data_received = sys.argv[1]
    print(data_received)

    # Validate the received data
    validation_result = validate_data(data_received)

    # Print the validation result to stdout
    print(validation_result)
