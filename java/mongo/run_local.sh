#!/usr/bin/bash
./mvnw package
export API_PORT=8088
export MONGO_URI=mongodb://172.17.0.1/ipInfo
java -jar target/mongo-0.0.1-SNAPSHOT.jar