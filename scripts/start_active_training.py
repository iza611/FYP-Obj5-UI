import sys
from data_prep import get_input_and_output

def data_prep():
    input_location = sys.argv[1]
    output_location = sys.argv[2]
    inputX, outputY = get_input_and_output(input_location, output_location)
    print(inputX)
    sys.stdout.flush()
    print(outputY)
    sys.stdout.flush()
    
data_prep()