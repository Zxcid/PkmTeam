FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
RUN mkdir -p /workspace
WORKDIR /workspace
COPY pom.xml /workspace
COPY src /workspace/src
COPY .mvn /workspace/.mvn
RUN mvn clean install -DskipTests=true

FROM openjdk:21-slim
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
