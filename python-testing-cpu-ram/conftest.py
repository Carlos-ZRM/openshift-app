def pytest_addoption(parser):
    parser.addoption("--url", action="store", default="http://localhost:8000", help="URL to test")
    parser.addoption("--requests", type=int, default=50, help="Total number of requests")
    parser.addoption("--parallel", type=int, default=5, help="Number of parallel threads")
