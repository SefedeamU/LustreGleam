# Guía rápida de despliegue Angular en S3 🚀

Esta guía explica cómo compilar y desplegar tu frontend Angular en Amazon S3 de forma eficiente y profesional.

---

## ✅ Actualizar el frontend Angular en S3

### 1. 🔧 Compilar el proyecto Angular

Desde la raíz del proyecto, ejecuta:

```powershell
ng build --configuration production
```

Esto generará la carpeta `dist/` con el build optimizado (usualmente en `dist/lustre-gleam/browser/` si usas Angular Universal o prerender).

---
### 2. 🔑 Configuración de credenciales AWS

Antes de ejecutar los comandos de AWS, asegúrate de tener configuradas tus credenciales de acceso.  
Puedes hacerlo ubicandote en tu disco 'C:' y editando el archivo:

```
vim ./.aws/credentials
```

Ejemplo de contenido:

```
[default]
aws_access_key_id = TU_ACCESS_KEY
aws_secret_access_key = TU_SECRET_KEY
```

### 3. ☁️ Subir la nueva versión a S3

Ubícate en la carpeta `browser` (donde está el `index.html`):

```powershell
cd .\dist\lustre-gleam\browser\
```

Sincroniza los archivos con tu bucket S3:

```powershell
aws s3 sync . s3://lustre-gleam-web-public --delete
```

**Este comando:**
- Sube solo los archivos modificados
- Elimina los archivos que ya no existen
- Mantiene la estructura de carpetas

---

## 🧠 Creación

Latimosaomente no se puede automatizar directamente el despliegue al bucket s3 debido a problemas de roles con LabRole, sin embargo, aún así podemos crear el bucket con permisos de consulta publica si es que no lo tenemos aún para luego desde la consola de AWS subiendo los archivos manualmente de la carpeta "browser":

```powershell
# deploy.ps1
Write-Host "🔧 Compilando Angular... :"
ng build --configuration production

Write-Host "☁️ Creando el bucket S3... :"

aws s3api create-bucket `
  --bucket lustre-gleam-web `
  --region us-east-1 `
  --object-ownership BucketOwnerPreferred

Write-Host "☁️ Configurar el hosting de pagina web estática:"

aws s3 website s3://lustre-gleam-web/ `
  --index-document index.html `
  --error-document index.html

Write-Host "Por si necesitas borrar el bucker:"

aws s3 rb s3://lustre-gleam-web --force

Write-Host "✅ Despliegue completado"
```

---

¡Listo! Así mantienes tu frontend actualizado en S3 de forma rápida y segura. ✨

Puedes revisar la página desplegada en linea visitando el siguiente enlace:

```link
http://lustre-glam.s3-website-us-east-1.amazonaws.com
```
