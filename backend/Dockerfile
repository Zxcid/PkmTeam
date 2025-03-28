FROM maven:3.9.6-eclipse-temurin-21-alpine AS dev

WORKDIR /workspace

COPY . .

EXPOSE 8080

CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.fork=false", "-DskipTests=true"]
