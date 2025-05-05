# Ejecutar sin contenedor de forma local

~~~ bash
./mvnw package
export API_PORT=8088
export MONGO_URI=mongodb://172.17.0.1/ipInfo
#mongodb://admin:admin@mongodb-api.gestion-dev.svc.cluster.local/ipInfo
java -jar 
~~~

~~~ bash
./run_local.sh
~~~

# Ejecutar contenedor localmente

~~~ bash
./mvnw package
docker build -t  api-info-mongo:latest .
docker run --rm --name api-info-mongo -p 8088:8088  api-info-mongo
~~~



