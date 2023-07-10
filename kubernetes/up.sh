#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Source and export environment variables
set -a
source ../.env
set +a

for manifest in $(find manifests/apps/configmaps -type f -name '*.yaml'); do
	kubectl apply -f $manifest
done

for manifest in $(find manifests/apps/secrets -type f -name '*.yaml'); do
	cat $manifest | envsubst | kubectl apply -f -
done

for manifest in $(find manifests/apps/services -type f -name '*.yaml'); do
	kubectl apply -f $manifest
done

for manifest in $(find manifests/apps/deployments -type f -name '*.yaml'); do
	kubectl apply -f $manifest
done
