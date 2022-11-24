FROM gradle:7.1-jdk11
WORKDIR /app
COPY ./ ./
RUN ./gradlew clean build --no-daemon
CMD java -jar build/libs/*.jar