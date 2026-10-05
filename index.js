//el servidor de fakestoreapi.com no funciona por error 521 de modo que en la terminal saldra unexpected token '<', "<!DOCTYPE "not valid JSON"//


console.log ("Inicio de programa");

const URL_BASE = "https://fakestoreapi.com";
const args = process.argv.slice(2);
const [comando, ruta, ...datos] = args;

async function obtenerProductos(ruta) {
    try {
        const response = await fetch(`${URL_BASE}/${ruta}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error al obtener productos:", error.message);
    }
}

async function crearProducto(producto) {
    try {
        const response = await fetch(`${URL_BASE}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al crear el producto:", error.message);
    }
}

async function eliminarProducto(ruta) {
    try {
        const response = await fetch(`${URL_BASE}/${ruta}`, {
            method: "DELETE"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al eliminar el producto:", error.message);
    }
}

switch (comando) {
    case "GET":
        if (ruta && ruta.startsWith("products")) {
            const productos = await obtenerProductos(ruta);
            console.log(productos);
        } else {
            console.log("Comando incorrecto");
        }
        break;

    case "POST":
        const [title, price, category] = datos;

        if (ruta === "products" && title && price && category) {
            const nuevoProducto = {  title, price: Number(price), category };
            const resultado = await crearProducto(nuevoProducto);

            console.log({ ...resultado, mensaje: "Producto creado" });
        } else {
            console.log("Comando incompleto o incorrecto");
        }
        break;

    case "DELETE":
        if(ruta && ruta.startsWith("products/") && ruta.length > 9) {
            const respuesta = await eliminarProducto(ruta);
            console.log("Producto eliminado:", respuesta);
        } else {
            console.log("Comando incompleto o incorrecto");
        }
        break;

        default:
            console.log("Comando incorrecto");
}