#!/usr/bin/env bash
# Create a registry push secret from a Podman auth file and link it to the builder SA.
# Usage: ./create-push-secret.sh [namespace] [secret-name] [auth-file]
set -euo pipefail
 
NAMESPACE="${1:-test-cpu-ram}"
SECRET_NAME="${2:-quay-push}"
AUTH_FILE="${3:-${REGISTRY_AUTH_FILE:-$HOME/.config/containers/auth.json}}"
 
if [[ ! -f "$AUTH_FILE" ]]; then
  echo "Auth file not found: $AUTH_FILE" >&2
  echo "Run: podman login quay.io" >&2
  exit 1
fi
 
# Create or update the secret (idempotent)
oc create secret generic "$SECRET_NAME" \
  --from-file=.dockerconfigjson="$AUTH_FILE" \
  --type=kubernetes.io/dockerconfigjson \
  -n "$NAMESPACE" \
  --dry-run=client -o yaml | oc apply -f -
 
oc secrets link builder "$SECRET_NAME" -n "$NAMESPACE"
 
echo "Secret '$SECRET_NAME' ready in '$NAMESPACE' and linked to builder SA."
 
