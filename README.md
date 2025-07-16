# Cervezario Backend

API REST desarrollada con Spring Boot para la gestión de cervezas, usuarios y envío de emails.

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Características](#características)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints principales](#endpoints-principales)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)

- ## Descripción

Este proyecto backend ofrece una API para manejar cervezas, usuarios, roles y envío de correos electrónicos. Está desarrollado en Java con Spring Boot y se utiliza para la aplicación Cervezario.

## Tecnologías

- Java 17
- Spring Boot 3.x
- Maven
- JPA / Hibernate
- H2 (para pruebas en local, cambiar a base de datos real para producción)
- Spring Security
- JavaMailSender

## Características

- Gestión CRUD de cervezas
- Registro y autenticación de usuarios
- Gestión de roles y permisos
- Envío de correos electrónicos asíncrono
- Validaciones personalizadas
- Seguridad con JWT

## Instalación

1. Clonar el repositorio:

   git clone https://github.com/GallegoVL/Cervezario-backend.git
   cd Cervezario-backend

2. Construir el proyecto con Maven:

   mvn clean install

## Configuración

  src/main/resources/application.properties

  spring.mail.host=smtp.gmail.com
  spring.mail.port=587
  spring.mail.username=tu-email@gmail.com
  spring.mail.password=tu-contraseña
  spring.mail.properties.mail.smtp.auth=true
  spring.mail.properties.mail.smtp.starttls.enable=true

## Ejecución

   mvn spring-boot:run
   La API estará disponible en http://localhost:8080.

## Contacto

  Alexandre Gallego Fernández
  Email: alexgallegofernandez0594@gmail.com
  GitHub: https://github.com/GallegoVL
  Linkedin: https://www.linkedin.com/in/alexandre-gallego-fern%C3%A1ndez-564403273/
  Telefono: +34 658 211 311
