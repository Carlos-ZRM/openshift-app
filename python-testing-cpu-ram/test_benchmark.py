import pytest
import time
import requests
import psutil
from concurrent.futures import ThreadPoolExecutor, as_completed
from statistics import mean

# Configurable options via pytest CLI
def pytest_addoption(parser):
    parser.addoption("--url", action="store", default="http://localhost:5000", help="URL to test")
    parser.addoption("--requests", type=int, default=50, help="Total number of requests")
    parser.addoption("--parallel", type=int, default=5, help="Number of parallel threads")

@pytest.fixture
def config(request):
    return {
        "url": request.config.getoption("--url"),
        "total_requests": request.config.getoption("--requests"),
        "parallel": request.config.getoption("--parallel"),
    }

# Function to send a single request
def send_request(url):
    try:
        start = time.time()
        response = requests.get(url, verify=False)
        duration = time.time() - start
        return response.status_code, duration
    except Exception as e:
        return 0, float('inf')  # Fail code

# Monitor system resources during test
def monitor_resources(duration_sec=10):
    cpu_usages = []
    mem_usages = []
    for _ in range(duration_sec):
        cpu_usages.append(psutil.cpu_percent(interval=1))
        mem_usages.append(psutil.virtual_memory().percent)
    return cpu_usages, mem_usages

def test_parallel_requests(config):
    url = config["url"]
    total = config["total_requests"]
    workers = config["parallel"]

    print(f"\nBenchmarking {total} requests to {url} with {workers} parallel threads...")

    # Start monitoring in background
    import threading
    resource_thread = threading.Thread(target=monitor_resources, args=(total // workers + 2,))
    resource_thread.start()

    durations = []
    errors = 0

    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = [executor.submit(send_request, url) for _ in range(total)]
        for future in as_completed(futures):
            code, duration = future.result()
            print(code)
            if code != 200 | code == 403:
                errors += 1
            durations.append(duration)

    avg_time = mean(durations)
    print(f"\nAverage response time: {avg_time:.3f}s")
    print(f"Total errors: {errors}/{total}")

    # Final CPU and RAM after test
    cpu_now = psutil.cpu_percent()
    mem_now = psutil.virtual_memory().percent
    print(f"Final CPU: {cpu_now:.1f}%")
    print(f"Final RAM: {mem_now:.1f}%")

    assert errors < total * 0.90, "Too many failed requests!"
    assert avg_time < 6000, "Average response time is too high!"



#pytest test_benchmark.py --url=https://app-base-test-xpk.apps.cluster-h2kbk.h2kbk.sandbox693.opentlc.com/cputest --requests=10 --parallel=10 -v
