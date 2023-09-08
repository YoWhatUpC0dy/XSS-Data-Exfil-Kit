#!/usr/bin/python3

import sys
import os

# Define the input file path
input_file_path = "./exfilledDataCleaned.txt"

# Check if the input file exists
if not os.path.exists(input_file_path):
    print("Input file not found.")
    sys.exit(1)

# Read the input file line by line into an array
with open(input_file_path, "r") as file:
    lines = file.readlines()

# Initialize a list to store the extracted data
extracted_data = []

# Go through each exfilled line
for line in lines:
    # Split the line into index and data parts
    parts = line.strip().split(' ')
    
    if len(parts) != 2:
        print("Invalid line format: " + line)
        continue

    index_list = parts[0]
    data_list = parts[1]

    # Split the index and data into arrays
    index_array = index_list.split(',')
    data_array = data_list.split(',')

    # Check if the number of indexes and data pieces match
    if len(index_array) != len(data_array):
        print("Number of chunks does not match the number of data pieces. Something is wrong.")
        continue

    # Loop through both arrays simultaneously
    for i in range(len(index_array)):
        chunk_name = index_array[i]

        # Build the filename using the chunk name
        filename = './data/' + chunk_name + '.chunk'
        print("Filename is: " + filename)

        # Write the data to the file
        with open(filename, "w") as f:
            f.write(data_array[i])

# Print the extracted data and its length
print(extracted_data)
print(len(extracted_data))
