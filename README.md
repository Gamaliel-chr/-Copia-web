README – Explicación del archivo `assets/css/styles.css`

Este documento explica el archivo `assets/css/styles.css` del proyecto.
La idea es mostrar qué hace cada parte del CSS y por qué se usó, para que se entienda cómo funciona el diseño de la página y el menú interactivo.

Archivo que se explica
assets/css/styles.css

Propósito del CSS
Este archivo se encarga del diseño visual de la página. Aquí se definen los colores, la fuente, la forma de las tarjetas, el diseño del encabezado, el menú de navegación y cómo se adapta la página cuando se usa en celular o tablet.

El diseño se hizo con una apariencia moderna y limpia para que sea fácil de leer para estudiantes de informática o ingeniería.

---

1. Importación de la fuente

Se usa esta línea:

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

Esto sirve para importar la fuente **Inter** desde Google Fonts.
Se eligió porque es una fuente muy clara y se usa mucho en interfaces modernas.

---

2. Variables de colores

En la parte `:root` se definieron varios colores que se usan en toda la página.

Ejemplo:

--bg-100
--card
--accent
--accent-2
--text
--muted

Estas variables permiten usar siempre los mismos colores sin tener que escribirlos muchas veces.
Si en algún momento se quiere cambiar la paleta del sitio, solo se cambia aquí.

---

3. Box sizing global

Se usa:

*{box-sizing:border-box}

Esto hace que el padding y el borde se incluyan dentro del tamaño del elemento.
Se usa para evitar problemas cuando se calculan los tamaños de los elementos en el diseño.

---

4. Estilos generales del body

Aquí se define el estilo principal de la página.

Se eliminan los márgenes que trae el navegador por defecto, se define la fuente principal y se coloca un fondo con un pequeño degradado para que la página no se vea tan plana.

También se usa **flexbox** para ordenar el contenido verticalmente y centrarlo en la página.

---

5. Encabezado (Header)

La clase `.site-header` controla el encabezado de la página.

Aquí se organiza el logo, el nombre del sitio y el menú de navegación.

Se usa `display:flex` para acomodar los elementos en una sola línea y separar el contenido entre la izquierda y la derecha.

---

6. Marca del sitio

Las clases `.brand`, `.brand-logo`, `.brand-name` y `.brand-link` sirven para mostrar el logo y el nombre del sitio.

El logo tiene un tamaño fijo para que no se vea demasiado grande y se le aplica un pequeño borde redondeado para que se vea más moderno.

---

7. Botón hamburguesa

La clase `.hamburger` corresponde al botón que abre el menú cuando se está en pantallas pequeñas.

Este botón tiene:

cursor:pointer
padding
border-radius

También tiene estilos de **focus** para que se vea cuando una persona navega usando el teclado.

Esto mejora la accesibilidad de la página.

---

8. Menú de navegación

La clase `.nav-list` contiene los enlaces del menú.

En pantallas grandes los enlaces se muestran uno al lado del otro usando `display:flex`.

Los enlaces tienen un estilo tipo botón con bordes redondeados y un fondo suave para que se vean claramente como elementos interactivos.

También se agregan efectos de **hover** y **focus** para que el usuario tenga una respuesta visual cuando pasa el mouse o navega con teclado.

---

9. Contenido principal

La sección `main#app` se usa como contenedor principal de la aplicación.

Tiene un ancho máximo para que el contenido no se vea demasiado ancho en pantallas grandes.

También se usan tarjetas con la clase `.card`.
Estas tarjetas tienen fondo blanco, padding, bordes redondeados y una sombra ligera para separar visualmente el contenido.

---

10. Footer

El footer usa la clase `.site-footer`.

Aquí se coloca información adicional del sitio y se usa un color de texto más suave para que no llame demasiado la atención.

---

11. Diseño responsive (adaptación a celulares)

Dentro del `@media (max-width:800px)` se cambian algunos estilos para que la página funcione mejor en pantallas pequeñas.

En este caso el menú deja de mostrarse horizontalmente y pasa a mostrarse como un panel que aparece desde la derecha.

Este panel se muestra cuando el elemento `<nav>` tiene la clase `open`.

Ejemplo:

nav class="nav open"



Cuando esa clase se activa, el menú aparece usando una animación con `transform` y `opacity`.

También se usan propiedades como:

visibility:hidden
pointer-events:none

para evitar que el usuario interactúe con el menú cuando está cerrado.

---

12. Reducción de animaciones

Se usa:

@media (prefers-reduced-motion: reduce)

Esto detecta si el usuario tiene activada la opción de reducir animaciones en su sistema.

Si está activada, se eliminan las transiciones para que la experiencia sea más cómoda para personas sensibles al movimiento.

---

13. Clases utilitarias

Se agregan algunas clases pequeñas que ayudan en diferentes partes del sitio.

Por ejemplo:

.center → centra el texto
.muted → cambia el color del texto a uno más suave

También se ajustan estilos básicos para etiquetas como `label`, `input`, `textarea` y `button`.

---

Funcionamiento del menú interactivo

El botón hamburguesa se controla con JavaScript.

Cuando el usuario hace clic en el botón:

1. Se cambia el atributo `aria-expanded`
2. Se agrega o quita la clase `open` en el elemento `<nav>`

Cuando la clase `open` está presente, el CSS muestra el menú en la versión móvil.

Esto permite separar el comportamiento (JavaScript) del diseño (CSS), lo cual es una buena práctica en desarrollo web.

---

Resumen

El archivo `styles.css` define todo el diseño visual del proyecto:

• Colores del sitio
• Tipografía
• Encabezado y navegación
• Tarjetas de contenido
• Footer
• Adaptación para celulares
• Accesibilidad básica

Además incluye un menú responsive que funciona con un botón hamburguesa y una clase `open` que activa el menú en pantallas pequeñas.
