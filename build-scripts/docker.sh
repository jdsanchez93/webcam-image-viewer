#!/bin/bash
IMAGE_TAG=$1
IMAGE_PREFIX="jdeeezy/webcam-image-viewer:"
IMAGE_NAME="$IMAGE_PREFIX$IMAGE_TAG"

# docker build . --file Dockerfile --tag $IMAGE_NAME
# docker push $IMAGE_NAME

git push origin $2