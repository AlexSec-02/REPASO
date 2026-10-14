# Catálogo de productos

Laboratorio Angular standalone que consulta un JSON público mediante HTTP GET:

`https://careli2021.github.io/api_examen/api/productos.json`

## Ejecutar

```bash
npm install
npm start
```

Abre `http://localhost:4200/` y revisa la pestaña **Network** del navegador para observar la solicitud `GET` a `productos.json`. El botón **Recargar** vuelve a solicitar el archivo; la búsqueda por nombre y el filtro de stock se ejecutan localmente.

El recurso es un archivo JSON estático: solo permite lectura mediante GET. No hay un backend ni operaciones para insertar, editar o eliminar productos.

## Relación con una API GET de Spring Boot

Desde Angular, las piezas principales son las mismas: configurar `HttpClient`, encapsular la petición en un servicio, recibir un `Observable<Producto[]>` y suscribirse para mostrar el resultado y manejar errores. Cambia la dirección y quién responde: aquí se entrega un archivo estático de GitHub Pages; con Spring Boot respondería un endpoint del servidor y podría obtener sus datos de una base de datos.
