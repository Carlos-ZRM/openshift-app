#!/bin/bash

name=app-base
color="#880808"

podman build -t $name  .
podman run --rm -it --name $name -p 5000:5000 -e HEX_BACKGROUND=$color $name
