import { Component, Input, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent {

  developers = [
    {
      name: 'Federico Iribar',
      role: 'Desarrollo y gestión de la arquitectura e ingesta de las bases de datos',
      description: 'Encargado del diseño de la arquitectura de datos y la estrategia de ingesta masiva, Federico coordinó la coherencia entre múltiples esquemas distribuidos en tres bases de datos. Implementó herramientas para la generación y carga automatizada de registros, utilizando contenedores Docker especializados.',
      image: 'img/Fede.jpg'
    },
    {
      name: 'Sergio Delgado',
      role: 'Construcción y conexión del orquestador y despliegue',
      description: 'Coordinación en la integración completa de los microservicios mediante la construcción de un Orquestador en NestJS, encargado de centralizar las autenticaciones y operaciones críticas. Además Sergio fue responsable del despliegue de la solución en AWS. También fue el desarrollador principal del frontend en Angular conectada con cada microservicio.',
      image: 'img/Sergio.jpg'
    },
    {
      name: 'Gianfranco Cordero',
      role: 'Desarrollador Backend, autor de la API de Facturas',
      description: 'Gianfranco diseñó e implementó la API de Facturas usando FastAPI y MongoDB, una solución moderna y eficiente para gestionar compras, clientes y productos. Su servicio se conecta dinámicamente con otras APIs para ensamblar y almacenar facturas completas, garantizando consistencia e integridad en tiempo real.',
      image: 'img/Gian.jpg'
    },
    {
      name: 'David Salaverry',
      role: 'Desarrollador Backend, autor de la API de Productos',
      description: 'David desarrolló la API de Productos y Categorías utilizando Java y Spring Boot, gestionando operaciones CRUD y relaciones complejas entre productos y sus etiquetas. Su servicio es parte esencial del ecosistema de microservicios, brindando datos estructurados al resto de la plataforma.',
      image: 'img/Salaverry.jpg'
    },
    {
      name: 'Jhon Chilo',
      role: 'Desarrollador Backend, autor de la API de Usuarios',
      description: 'Jhon fue el responsable de construir la API de Usuarios con FastAPI y PostgreSQL, incluyendo un completo sistema de autenticación basado en JWT. Su servicio no solo permite el registro y gestión de usuarios, sino también el manejo de roles y direcciones asociadas.',
      image: 'img/Jhon.jpg'
    }
  ];
}
