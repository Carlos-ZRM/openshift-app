#!/bin/bash

# ==============================================================================
# System Performance Test Script
#
# Description:
# This script uses `curl` to send multiple requests to either the /cputest
# or /ramtest endpoint of the Flask performance testing application.
# It requires a flag to specify which resource to test.
#
# Pre-requisites:
# 1. The Flask application (`main.py`) must be running.
# 2. `curl` and `jq` must be installed on your system.
#    - `jq` is used to prettify the JSON output for readability.
#    - To install jq on Debian/Ubuntu: sudo apt-get install jq
#    - To install jq on macOS (using Homebrew): brew install jq
#
# Usage:
# ./run_test.sh <type> [number_of_requests]
#
# Arguments:
#   type:                 Required. The type of test to run ('cpu' or 'mem').
#   number_of_requests:   Optional. The number of times to run the test.
#                         Defaults to 1 if not provided.
#
# Examples:
#   Run a single CPU test:
#   ./run_test.sh cpu
#
#   Run the RAM test 10 times:
#   ./run_test.sh mem 10
# ==============================================================================

# --- Argument Validation ---

# Check if the first argument (type) is provided.
if [ -z "$1" ]; then
    echo "Error: Test type not specified."
    echo "Usage: $0 <cpu|mem> [number_of_requests]"
    exit 1
fi

# Set the URL based on the first argument.
TEST_TYPE=$1
case $TEST_TYPE in
    cpu)
        URL="https://app-base-test-xpk.apps.rosa.rosa-bddpk.y0pq.p3.openshiftapps.com/cputest"
        ;;
    mem|ram) # Allow 'ram' as an alias for 'mem'
        URL="https://app-base-test-xpk.apps.rosa.rosa-bddpk.y0pq.p3.openshiftapps.com/ramtest"
        ;;
    *)
        echo "Error: Invalid test type '$TEST_TYPE'."
        echo "Usage: $0 <cpu|mem> [number_of_requests]"
        exit 1
        ;;
esac

# Get the number of requests from the second command-line argument.
# If no argument is provided, default to 1.
NUM_REQUESTS=${2:-1}


# --- Test Execution ---

echo "🚀 Starting performance test..."
echo "------------------------------------"
echo "Test Type: $TEST_TYPE"
echo "Target URL: $URL"
echo "Number of requests: $NUM_REQUESTS"
echo "------------------------------------"

# Loop from 1 to NUM_REQUESTS
for (( i=1; i<=$NUM_REQUESTS; i++ ))
do
    echo ""
    echo "--- [ Request $i of $NUM_REQUESTS ] ---"
    echo "Please wait, this may take a moment..."

    # Use curl to perform the test.
    # -w flag formats the output to include timing information.
    # -s flag makes curl silent (no progress meter).
    # The JSON output is piped to `jq` for pretty-printing.
    # If jq isn't installed, it falls back to `cat` to print the raw JSON.
    curl -s -w "\nRequest Time: %{time_total}s\n" "$URL" | (command -v jq >/dev/null && jq . || cat)

done

echo ""
echo "------------------------------------"
echo "✅ All $NUM_REQUESTS tests complete."