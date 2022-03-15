#!/bin/bash
IMAGE_TAG=$(date +%s)
IMAGE_PREFIX="jdeeezy/webcam-image-viewer:"
IMAGE_NAME="$IMAGE_PREFIX$IMAGE_TAG"

docker build . --file Dockerfile --tag $IMAGE_NAME
docker push $IMAGE_NAME