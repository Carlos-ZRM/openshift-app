FROM registry.redhat.io/ubi9/go-toolset:1.22.9-1743582279

USER 0

# Add /opt/app-root/src/go/bin to PATH

ENV PATH="/opt/app-root/src/go/bin:${PATH}"

# Download Helm binary, extract it, and move the executable to /usr/local/bin
RUN curl -O https://get.helm.sh/helm-v3.17.2-linux-amd64.tar.gz && \
    tar -xzf helm-v3.17.2-linux-amd64.tar.gz -C /opt/ && \
    mv /opt/linux-amd64/helm /usr/local/bin/helm && \
    rm -rf helm-v3.17.2-linux-amd64.tar.gz /opt/linux-amd64

# Install kubeconform Go module
RUN go install github.com/yannh/kubeconform/cmd/kubeconform@v0.4.13

RUN chown -R 1001:0 /opt/app-root/

USER 1001


