# main.py
# Import necessary libraries
# Flask for creating the web application
# psutil for monitoring system resources (CPU, RAM)
# time for measuring execution time and for the sleep function
# math for mathematical operations (specifically for the CPU test)
# os to interact with the operating system, including reading environment variables
from flask import Flask, jsonify, Response, request, render_template
import psutil
import time
import math
import os
import random

# Initialize the Flask application
app = Flask(__name__)

# --- CPU Stress Test ---
def is_prime(n):
    """
    Helper function to check if a number is prime.
    This is a computationally intensive task.
    """
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

@app.route('/cputest')
def cpu_test():
    """
    Flask endpoint to perform a CPU stress test.
    It calculates prime numbers up to a specified limit and measures the time taken.
    """
    start_time = time.time()
    # The upper limit for prime number calculation.
    # Increasing this number will make the test more intensive.
    limit = 300000 
    primes_found = 0
    for number in range(1, limit + 1):
        if is_prime(number):
            primes_found += 1
            
    end_time = time.time()
    duration = end_time - start_time
    
    # Return the results as a JSON object
    return jsonify({
        "test": "CPU Performance",
        "primes_found_up_to": limit,
        "total_primes_found": primes_found,
        "execution_time_seconds": round(duration, 4)
    })

# --- RAM Stress Test ---
@app.route('/ramtest')
def ram_test():
    """
    Flask endpoint to perform a RAM stress test.
    It allocates a large list of dictionaries in memory and measures peak memory usage.
    """
    # Get the current process to monitor its memory usage
    process = psutil.Process(os.getpid())
    
    # Initial memory usage before the test
    mem_before_mb = process.memory_info().rss / (1024 * 1024)
    
    # This will hold the large data structure
    large_list = []
    
    # The number of items to add to the list.
    # Increasing this number will consume more RAM.
    num_items = 2_000_000 
    
    try:
        # Create a large list of dictionaries to consume memory
        for i in range(num_items):
            # Each dictionary adds to the memory footprint
            large_list.append({'id': i, 'data': 'x' * 128}) # 128-byte string
            
        # Memory usage after allocation
        mem_after_mb = process.memory_info().rss / (1024 * 1024)
        
        # The result of the test
        result = {
            "test": "RAM Performance",
            "list_items_allocated": len(large_list),
            "memory_before_mb": round(mem_before_mb, 2),
            "memory_after_mb": round(mem_after_mb, 2),
            "peak_memory_usage_mb": round(mem_after_mb, 2),
            "memory_consumed_mb": round(mem_after_mb - mem_before_mb, 2)
        }
    except MemoryError:
        # Handle the case where the system runs out of memory
        return jsonify({
            "error": "MemoryError",
            "message": "The test failed because the system ran out of memory."
        }), 500
    finally:
        # Clear the list to free up memory
        del large_list

    return jsonify(result)

# --- Health Check / Sleep Test Endpoint ---
@app.route('/healthz', defaults={'success_rand': None})
@app.route('/healthz/<float:success_rand>')
def healthz(success_rand):
    """
    Health check endpoint that waits for a fixed duration (SLEEP_TEST env var),
    then simulates a probabilistic success/failure:
      - success_rand path param sets the success probability (default 0.8).
      - Rolls a random float in [0, 1]; returns 200 if roll <= success_rand, else 500.
    """
    if success_rand is None:
        success_rand = 0.8
    success_rand = max(0.0, min(1.0, success_rand))

    sleep_duration_str = os.environ.get('SLEEP_TEST', '15')

    try:
        sleep_duration = float(sleep_duration_str)
        sleep_duration = max(0, sleep_duration)
        time.sleep(sleep_duration)
    except ValueError:
        return jsonify({
            "status": "error",
            "message": f"Invalid value for SLEEP_TEST environment variable: '{sleep_duration_str}'. Please provide a number."
        }), 400

    roll = random.random()
    success = roll <= success_rand
    code = 200 if success else 500

    return jsonify({
        "status": "ok" if success else "error",
        "waited_seconds": sleep_duration,
        "success_rand": success_rand,
        "roll": round(roll, 4),
        "result": "success" if success else "failure"
    }), code


# --- Health Check / Random Sleep Endpoint ---
@app.route('/healthz-random', defaults={'success_rand': None})
@app.route('/healthz-random/<float:success_rand>')
def healthz_random(success_rand):
    """
    Health check endpoint that waits a random duration derived from SLEEP_TEST:
      min = SLEEP_TEST * 0.5  /  max = SLEEP_TEST * 1.5
    Then applies the same probabilistic success/failure logic as /healthz.
      - success_rand path param sets the success probability (default 0.8).
    """
    if success_rand is None:
        success_rand = 0.8
    success_rand = max(0.0, min(1.0, success_rand))

    sleep_duration_str = os.environ.get('SLEEP_TEST', '15')

    try:
        base = float(sleep_duration_str)
        base = max(0, base)
    except ValueError:
        return jsonify({
            "status": "error",
            "message": f"Invalid value for SLEEP_TEST environment variable: '{sleep_duration_str}'. Please provide a number."
        }), 400

    sleep_min = base * 0.5
    sleep_max = base * 1.5
    sleep_duration = random.uniform(sleep_min, sleep_max)
    time.sleep(sleep_duration)

    roll = random.random()
    success = roll <= success_rand
    code = 200 if success else 500

    return jsonify({
        "status": "ok" if success else "error",
        "sleep_test_base_seconds": base,
        "sleep_range": {"min": round(sleep_min, 4), "max": round(sleep_max, 4)},
        "waited_seconds": round(sleep_duration, 4),
        "success_rand": success_rand,
        "roll": round(roll, 4),
        "result": "success" if success else "failure"
    }), code


# --- Payload Upload Endpoint ---
PAYLOADS_DIR = os.path.join(os.path.dirname(__file__), '.', 'payloads')

@app.route('/payload', methods=['POST'])
def payload():
    """
    Accepts a file upload (multipart/form-data, field name 'file'),
    saves it under ./payloads/, and returns the HTTP status code,
    payload size in bytes, and the time taken to process the request.
    """
    start_time = time.time()

    if 'file' not in request.files:
        return jsonify({
            "code": 400,
            "error": "No file field in request. Send a multipart/form-data request with field name 'file'."
        }), 400

    uploaded_file = request.files['file']

    if uploaded_file.filename == '':
        return jsonify({
            "code": 400,
            "error": "Empty filename. Please attach a file."
        }), 400

    # Ensure the payloads directory exists
    os.makedirs(PAYLOADS_DIR, exist_ok=True)

    # Prepend a timestamp to avoid collisions: <YYYYMMDD_HHMMSS>_<original>
    timestamp = time.strftime('%Y%m%d_%H%M%S')
    name, ext = os.path.splitext(uploaded_file.filename)
    timestamped_filename = f"{name}_{timestamp}{ext}"

    save_path = os.path.join(PAYLOADS_DIR, timestamped_filename)
    uploaded_file.save(save_path)

    payload_size_bytes = os.path.getsize(save_path)
    elapsed = round(time.time() - start_time, 4)

    return jsonify({
        "code": 200,
        "original_filename": uploaded_file.filename,
        "filename": timestamped_filename,
        "saved_to": save_path,
        "payload_size_bytes": payload_size_bytes,
        "request_time_seconds": elapsed
    }), 200


@app.route('/')
def index():
    """
    Root endpoint — renders the dashboard via Jinja2 (src/templates/index.html).
    Passes the current SLEEP_TEST value and computed random-sleep range to the template.
    """
    try:
        base = float(os.environ.get('SLEEP_TEST', '15'))
        base = max(0, base)
    except ValueError:
        base = 15.0

    return render_template(
        'index.html',
        sleep_test=base,
        sleep_min=round(base * 0.5, 2),
        sleep_max=round(base * 1.5, 2),
    )

# --- Running the Application ---
if __name__ == '__main__':
    # To run this app:
    # 1. Make sure you have Flask and psutil installed:
    #    pip install Flask psutil
    # 2. Run the script with the SLEEP_TEST environment variable (optional):
    #    For Linux/macOS: SLEEP_TEST=5 python main.py
    #    For Windows (CMD): set SLEEP_TEST=5 && python main.py
    #    For Windows (PowerShell): $env:SLEEP_TEST="5"; python main.py
    # 3. Open your browser and go to http://127.0.0.1:5000
    app.run(debug=True, host='0.0.0.0', port=5000)
