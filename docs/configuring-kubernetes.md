# Configuring Kubernetes with Kind

This project uses [Kind](https://kind.sigs.k8s.io) to host a light-weight
Kubernetes cluster that can be used for development and testing. Kind can also
be used for small-scale production deployments.

## Installation

In order to operate the cluster, the following CLI tools need to be installed:

- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Helm](https://helm.sh/docs/intro/install/)

## Setting up a cluster

Create a cluster

```sh
./scripts/create-cluster
./scripts/install-cluster
```

You can verify that the cluster was correctly created by running

```sh
kubectl cluster-info --context kind-meet
```

Lastly, we set the default context so we do not need to specify it with every
`kubectl` command (which required for most of scripts):

```sh
kubectl config use-context kind-meet
```

## Port-forwarding to enable traffic

In order for the cluster to receive traffic, a port-forwarding needs to be setup
from the host machine to the Traefik service. This can be done by running

```sh
sudo ./scripts/proxy-traefik
```
