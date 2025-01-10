gpg --output secret-cloud-credentials.yaml.data --symmetric --cipher-algo AES256 secret-cloud-credentials.yaml

gpg --output secret-cloud-credentials-output.yaml --decrypt secret-cloud-credentials.yaml.data
