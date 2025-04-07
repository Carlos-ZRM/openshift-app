### Clonar repo
~~~ bash
git clone https://github.com/kubeflow/kubeflow.git
~~~

### Selecionar imagen

~~~ bash
cd components/example-notebook-servers
~~~

Imagenes posibles dentro del directorio

~~~ 
.
├── Makefile
├── OWNERS
├── README.md
├── base
├── codeserver
├── codeserver-python
├── common.mk
├── jupyter
├── jupyter-pytorch
├── jupyter-pytorch-cuda
├── jupyter-pytorch-cuda-full
├── jupyter-pytorch-full
├── jupyter-pytorch-gaudi
├── jupyter-pytorch-gaudi-full
├── jupyter-scipy
├── jupyter-tensorflow
├── jupyter-tensorflow-cuda
├── jupyter-tensorflow-cuda-full
├── jupyter-tensorflow-full
├── rstudio
└── rstudio-tidyverse
~~~

### Crear imagen

~~~
cd jupyter-tensorflow
~~~

Agregar paquetes archivo requirements.txt 

- PyPDF2
- boto3

~~~ bash

# kubeflow packages
kfp==2.11.0

# jupyterlab extensions
jupyterlab-git==0.50.2

PyPDF2
boto3
  
~~~

~~~ bash
export REGISTRY=quay.io/rh-ee-creyesma
export TAG="aarm64.xpk"
make docker-build-dep
~~~
