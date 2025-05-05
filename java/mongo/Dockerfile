FROM registry.access.redhat.com/ubi8/openjdk-8:1.17-1.1693366248 as API_BUILD
COPY --chown=jboss:jboss . /opt/api/
WORKDIR /opt/api/
RUN mvn package
# RUN  ls target


FROM registry.access.redhat.com/ubi8/openjdk-8:1.17-1.1693366248 as RUN
ENV MONGO_URI mongodb://127.0.0.1/ipInfo
WORKDIR /opt/api
COPY --from=API_BUILD  /opt/api/target/mongo-0.0.1-SNAPSHOT.jar ./api.jar
ENTRYPOINT ["java","-jar","api.jar"]
EXPOSE 8080
