# PkmTeam
Build your competitive Pokemon team!
<ul>
<li>select each Pokemon you like</li>
<li>choose each Pokemon moves</li>
<li>inspect strength and weaknesses of your Pokemon or of your entire team</li>
</ul>
<br>

### Supported devices: 
<ul>
<li>wip...</li>
</ul>
<br>

---

# 📋 Tech Stack - PkmTeam

---

## 📂 Backend - Spring Boot

| Dependency                     | Version     |
|--------------------------------|-------------|
| spring-boot-starter-parent     | 3.4.2       |
| spring-boot-starter-data-jpa   | 3.4.2       |
| spring-boot-starter-web        | 3.4.2       |
| spring-boot-starter-validation | 3.4.2       |
| spring-boot-starter-security   | 3.4.2       |
| spring-boot-starter-test       | 3.4.2       |
| lombok                         | 1.18.28     |
| postgresql                     | 42.7.2      |
| mapstruct                      | 1.5.5.Final |
| mapstruct-processor            | 1.5.5.Final |
| firebase-admin                 | 9.2.0       |
| jakarta.persistence-api        | 3.1.0       |
| jakarta.annotation-api         | 2.1.1       |

---

## 📂 Frontend - Angular

| Dependency                        | Version |
|-----------------------------------|---------|
| @angular/animations               | 15.2.9  |
| @angular/common                   | 15.2.9  |
| @angular/compiler                 | 15.2.9  |
| @angular/core                     | 15.2.9  |
| @angular/fire                     | 7.6.1   |
| @angular/forms                    | 15.2.9  |
| @angular/material                 | 15.2.9  |
| @angular/platform-browser         | 15.2.9  |
| @angular/platform-browser-dynamic | 15.2.9  |
| @angular/router                   | 15.2.9  |
| @ngneat/transloco                 | 4.3.5   |
| firebase                          | 9.8.1   |
| rxjs                              | 7.8.1   |
| tslib                             | 2.4.0   |
| zone.js                           | 0.12.0  |

### 📂 Dev Dependency

| Dependency                    | Version  |
|-------------------------------|----------|
| @angular-devkit/build-angular | 15.2.9   |
| @angular/cli                  | 15.2.9   |
| @angular/compiler-cli         | 15.2.9   |
| @types/jasmine                | 4.3.1    |
| @types/node                   | 18.11.18 |
| jasmine-core                  | 4.5.0    |
| karma                         | 6.4.0    |
| karma-chrome-launcher         | 3.1.1    |
| karma-coverage                | 2.2.0    |
| karma-jasmine                 | 5.1.0    |
| karma-jasmine-html-reporter   | 2.1.0    |
| typescript                    | 4.9.5    |

---

## 📂 Docker Compose

### Services

| Service  | Image                      | Port |
|----------|----------------------------|------|
| postgres | postgres:16-alpine         | 5432 |
| backend  | backend (from Dockerfile)  | 8080 |
| frontend | frontend (from Dockerfile) | 4200 |

### Note

- To fill the env variables contact me.

---

### How to:
To start the application just execute from the root folder:
<br>
<br>
<code>docker-compose --profile dev up --build -d</code>
<br>
<br>
Once the container is up and running, you can access the application from browser at: 
<br>
<h5>http://localhost:4200</h5>
Or test the REST api from the swagger at:
<br>
<h5>http://localhost:8080/swagger-ui.html</h5>
<br>
To stop the application and remove all the created images execute:
<br>
<br>
<code>docker-compose down --rmi all</code>
<br>
