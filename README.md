# TestPagos360

Este proyecto fue creado utlizando la versión de Angular 16.2.0.

Se utilizaron las siguientes librerias:

- Angular Material
- Flex Layout
- Json-Server
- Moment
- sweetalert2

## Levantar el proyecto

- npm install
- json-server --watch dataBase/db.json
- ng serve -o

## Información de prueba

Usuario:

- Correo: admin@pagos360.com

- Contraseña: admin123

Pueden encontrar dos usuarios más en la carpeta dataBase/db.json, pueden modificar los datos a voluntad para las pruebas.

## Detalles sobre el desarrollo y toma de decisiones

La estructura de carpetas fue pensada para una aplicación con un futuro crecimiento y que no quedaria en solo algunas pantallas.

Se creo una pantalla de Login como metodo de autenticacion para que ciertos usuarios puedan acceder a la aplicación, para el logeo se utiliza Json-Server para simular un backend y un archivo Json como base de datos, vale aclarar que este metodo no es de lo más seguro pero sirve para los fines de este Proyecto.

Ademas se agregaron verificaciones de autenticaciones (guards) para evitar que usuarios no logeados puedan acceder al contenido de la aplicación, ademas se guarda un Token en la sesionStorage con el id semi encriptado del usuario (él cual es usado para recuperar su informacíon nuevamente cuando es necesario), lo ideal seria hacerlo mediante JWT u otra validacion mediante backend, pero esta manera sirve para ejemplificar alguna medida de seguridad

Una vez autenticado y logeado, navegamos a la pantalla de Cobranzas, donde vamos a encontrar un seleccionador de Fechas, el cual va a generar la consulta de los reportes de cobro de ese día. Los cuales seran mostrado en una tabla desplegable, pudiendo acceder a toda su información.

Al navegar a una ruta incorrecta, el usuario es llevado a una página de error, con la posibilida de volver al inicio, (en caso de estar logueado, a la pagina de cobranzas, en el caso de no estarlo, al login).

Se agrego a modo de complemento un header con la opción de deslogueo y ademas rutas que navegana a una pantalla de “proximamente”.

Se creó un unico servicio llamado AppService, la lógica podria haberse divido en 2 o más servicios, pero al no ser demasiada, no me pareció mal utilizar un solo.

La aplicación no es responsive pero se ve bien en dimensiones superiores a 960x540, de ser necesario puedo trabajar más en ello.

## Mejoras

Se implento en una rama aparte una mejora en el manejo de las Signals, ademas de un Interceptor.
