# BiblioUPEN

Sistema integral de gestión de préstamos y devoluciones de libros para la biblioteca universitaria de la UPEN.

## Descripción del Proyecto

BiblioUPEN es una plataforma web diseñada para la administración de recursos bibliográficos universitarios. El sistema elimina las barreras de acceso actuales a través de una interfaz moderna e intuitiva, mejorando significativamente la experiencia de estudiantes y del personal bibliotecario.

La plataforma permite gestionar el inventario de libros, controlar préstamos en tiempo real, registrar usuarios y generar reportes de actividad, todo en un único sistema centralizado.

## Características Principales

- **Gestión completa de inventario**: Registro, actualización y eliminación de libros
- **Sistema de préstamos y devoluciones**: Automatización del proceso sin retención de credenciales
- **Gestión de usuarios**: Registro de estudiantes con historial de préstamos
- **Disponibilidad en tiempo real**: Control instantáneo de ejemplares disponibles
- **Panel de reportes**: Dashboard con métricas e indicadores clave
- **Búsqueda y filtrado avanzado**: Localización rápida de recursos
- **Interfaz responsive**: Accesible desde dispositivos móviles y de escritorio

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- **Node.js v20.13.0** (versión principal del proyecto)
    - **Node.js v14.18.0** (Solo para los estilos)
- **nvm** (Node Version Manager) para gestionar versiones
- **MariaDB v10.5+** instalado y en ejecución
- **npm** o **yarn** como gestor de paquetes
- **Git** para control de versiones

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/NizDeveloper/BiblioUPEN.git
cd biblio-upen
```

### 2. Configurar versión de Node.js con nvm

```bash
nvm install 20.13.0 && nvm install 14.18.3
nvm use 20.13.0
node --version
```

### 3. Instalar dependencias

El proyecto tiene 3 carpetas principales: “/”(raíz del proyecto) `server` para el backend y `src` para el frontend.

```bash
npm install
```

```bash
cd server/
npm install
```

Para los estilos css es necesario estar en el directorio de `src/style/` cambiar la versión de node a la v14.18.3

```bash
cd ../
cd src/style
nvm use v14.18.3
npm install
```

Instalar gulp en el proyecto:

```bash
npm install --save-dev gulp@4.0.2 gulp-sass@4.1.1 gulp-minify-css gulp-rename gulp-concat gulp-sourcemaps node-sass
```

Compilar estilos:

```bash
gulp build
```

## Manual de Uso

### Iniciar el frontend en desarrollo

En otra terminal, navega a la carpeta raíz del proyecto y ejecuta el comando de inicio de React. 

```bash
npm start
```

### Iniciar el servidor backend

Navega a la carpeta `/server` y ejecuta el comando (usando node v20):

```bash
node index.js
```

### Acceder a la aplicación

Una vez ambos servidores estén corriendo, accede a la aplicación desde tu navegador en el puerto 3000 → http://localhost:3000/

## 📁 Estructura del Proyecto

El proyecto está organizado en dos secciones principales:

**Backend (server/)**

- `controllers/`: Lógica de negocio para libros, préstamos y estudiantes
- `routes/`: Definición de endpoints de la API
- Archivos de configuración de base de datos

**Frontend (src/)**

- `components/`: Componentes React reutilizables organizados por módulo (books, loans, students, common)
- `pages/`: Páginas principales de la aplicación
- `services/`: Servicios para comunicación con la API
- `assets/`: Imágenes, iconos e ilustraciones
- `style/scss/`: Estilos globales y modulares

**Estructura general:**

- Carpeta `public/`: Archivos estáticos
- Carpeta `build/`: Compilado de producción (generado automáticamente)
- Archivos de configuración: package.json, .env, .gitignore

---

## Equipo de Desarrollo

**Institución**: UPEN

**Profesores**: 

- José Luis Delfín Márquez | Proyecto Integrador
- 

**Estudiantes:**

- Abdiel Josue Pacheco Robles
- Níz Gadiel Peña Mariscal
- Maria Jose Vazquez Romano
- Diego Eduardo Velasco Basulto