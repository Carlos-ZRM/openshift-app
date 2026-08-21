#!/bin/bash
set -euo pipefail

# ------------------------------------------------------------------
# Config (override via flags or env)
# ------------------------------------------------------------------
appns="${APPNS:-xpk}"
name="${APP_NAME:-app-base-test}"
routename="${ROUTE_NAME:-route-$name}"
apipath="${API_PATH:-/cputest}"

requests=10
parallel=10
testfile="test_benchmark.py"
verbose="-v"
extra_args=()

# ------------------------------------------------------------------
# Flags
# ------------------------------------------------------------------
usage() {
  echo "Usage: $0 [-n namespace] [-r route-name] [-p path] [--requests N] [--parallel N] [-- <extra pytest args>]"
  echo "  -n, --namespace     Namespace (default: $appns)"
  echo "  -R, --route-name    Route name (default: $routename)"
  echo "  -p, --path          Path appended to the route URI (default: $apipath)"
  echo "      --requests      Value for pytest --requests (default: $requests)"
  echo "      --parallel      Value for pytest --parallel (default: $parallel)"
  echo "  -f, --file          Test file to run (default: $testfile)"
  exit 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -n|--namespace)
      appns="$2"; shift 2 ;;
    -R|--route-name)
      routename="$2"; shift 2 ;;
    -p|--path)
      apipath="$2"; shift 2 ;;
    --requests)
      requests="$2"; shift 2 ;;
    --parallel)
      parallel="$2"; shift 2 ;;
    -f|--file)
      testfile="$2"; shift 2 ;;
    -h|--help)
      usage ;;
    --)
      shift
      extra_args=("$@")
      break
      ;;
    *)
      echo "Unknown flag: $1" >&2
      exit 1
      ;;
  esac
done

# ------------------------------------------------------------------
# Fetch the route
# ------------------------------------------------------------------
if ! oc get route "$routename" -n "$appns" >/dev/null 2>&1; then
  echo "Error: route '$routename' not found in namespace '$appns'." >&2
  exit 1
fi

host="$(oc get route "$routename" -n "$appns" -o jsonpath='{.spec.host}')"
tls="$(oc get route "$routename" -n "$appns" -o jsonpath='{.spec.tls.termination}' 2>/dev/null || true)"

scheme="http"
[[ -n "$tls" ]] && scheme="https"

url="${scheme}://${host}${apipath}"

echo "Resolved route URI: $url"

# ------------------------------------------------------------------
# Run pytest
# ------------------------------------------------------------------
pytest "$testfile" \
  --url="$url" \
  --requests="$requests" \
  --parallel="$parallel" \
  $verbose 
