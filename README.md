# Evolución Dramática de la Temperatura de la Tierra 1880-2018

![alt text](https://raw.githubusercontent.com/ansegura7/Evolucion-Temperatura-Global/master/img/main-banner.jpg)

- Estudiante: Andres Segura Tinoco
- Código: 201711582
- Curso: Visual Analytics
- Bono para el Parcial 1
- Fecha: 09/10/2018
- Licencia: MIT

## Datos del Proyecto – What
Los datos que se usaron para este proyecto son propiedad de la NASA, y están compuestos por varios dataset del tipo Temporal, que contiene las siguientes variables (attributes):

- Year: ordered, quantitative, sequencial (no existen fechas menores a 1880).
- Temperuture: ordered, quantitative, divergent.

Nota: Entre las distintas variables de tipo Temperatura usadas están: Glob, NHem, SHem, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov y Dec.

A continuación, se listan específicamente los dataset usados en el proyecto:

### Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies (Land-Ocean Temperature Index, LOTI):
- Global-mean monthly, seasonal, and annual means, 1880-present, updated through most recent month: https://data.giss.nasa.gov/gistemp/tabledata_v3/GLB.Ts+dSST.txt
- Zonal annual means, 1880-present, updated through most recent complete year: https://data.giss.nasa.gov/gistemp/tabledata_v3/ZonAnn.Ts+dSST.txt

### Global Mean Estimates Based on Land-Surface Air Temperature Anomalies Only (Meteorological Station Data, dTs):
- Global-mean monthly, seasonal, and annual means, 1880-present, updated through most recent month: https://data.giss.nasa.gov/gistemp/tabledata_v3/GLB.Ts.txt
- Zonal annual means, 1880-present, updated through most recent complete year: https://data.giss.nasa.gov/gistemp/tabledata_v3/ZonAnn.Ts.txt

### Citation

When referencing the GISTEMP data provided here, please cite both this webpage and also our most recent scholarly publication about the data. In citing the webpage, be sure to include the date of access.

- GISTEMP Team, 2018: GISS Surface Temperature Analysis (GISTEMP). NASA Goddard Institute for Space Studies. Dataset accessed 20YY-MM-DD at https://data.giss.nasa.gov/gistemp/.
- Hansen, J., R. Ruedy, M. Sato, and K. Lo, 2010: Global surface temperature change, Rev. Geophys., 48, RG4004, doi:10.1029/2010RG000345.

## Objetivos del Proyecto - Why
Tarea Principal: Crear una visualización web que presente (present) la tendencia (trend) de la temperatura de la tierra a través del tiempo (1880-2018), para impactar y concientizar a las personas del Calentamiento Global.

Además, crear una Viz que permita comparar (compare) entre sí, las tendencias (trends) de la temperatura promedio, por hemisferios y zonas, a través del tiempo.

También, que la Viz permita identificar (identify) anomalías (outliers) que existe en la temperatura promedio de la tierra, por hemisferio y zonas, así como por años o meses.

Por último, que la Viz permita identificar (identify) la distribución (distribution) de la temperatura promedio por mes para un año en específico (Gráfico 3).

## Marcas y Canales – How
En los 3 gráficos de tipo Line, se usaron como marcas puntos unidos por líneas para describir la variación de la temperatura. Tanto los datos del eje X como los del eje Y están ordenados secuencialmente. En cada gráfico se usó la escala de colores de D3, para ayudar al usuario a diferenciar (separate) claramente las series a través del Color Hue. Los años fueron ordenados en el eje X de izquierda a derecha, para respetar el principio de expresividad de los datos.

Con respecto al gráfico de barras, se usaron como marcas líneas verticales ordenadas tanto en el eje Y (para expresar la cantidad de la temperatura), como en el eje X (secuencialmente por mes) para mayor entendimiento de los datos.

En todos los gráficos se usó la posición vertical, para mostrar el tamaño del valor que se deseaba graficar. Además, también se usó en cada gráfico un título y un subtítulo descriptivo, para ayudar al usuario a entender la información que se está visualizando.

La visualización cuenta con múltiples filtros (por tipos de datos, cantidad de datos, año de análisis) para reducir los datos y ayudar al usuario a realizar un mejor análisis.

Por último, pero no menos importante, se usó como encabezado de la Visualización un título descriptivo con imagen que llamara la atención del usuario.

## Insights
- La temperatura global promedio de la tierra está en constante aumento, tanto en el hemisferio norte como en el sur. Este es el fenómeno conocido como: Calentamiento Global.
- A partir de 1992 la temperatura promedio de la tierra ha aumentado más, que desde 1880 (año en que empezó la medición) hasta 1991.
- Aunque inicialmente la temperatura promedio del hemisferio norte era más baja que la del hemisferio sur, a partir de 1900 la tendencia se invirtió. Esto se puede validar en el gráfico 1 y especialmente, en el gráfico 2, en donde la temperatura se discrimina por zonas de latitud.
- De 1989 a 1992, la temperatura promedio de la tierra disminuyó considerablemente, lo cual coincide con la caída del muro de Berlín y el fin de la Guerra Fría.
- A partir de 1992 aproximadamente, la temperatura de los 2 hemisferios ha mantenido la misma pendiente y proporción.

## Tecnologías Usadas
Para el desarrollo del proyecto se usaron las siguientes tecnologías:
- Se usó Sublime Text 3 y Notepad++ como IDEs de desarrollo.
HTML y CSS para maquetar el sitio web.
- Javascript y el framework D3.js para crear los gráficos (de barras y de líneas) y la respectiva interacción con ellos.
- JQuery para crear la tabla con la información de las zonas de latitud.
- GitHub para almacenar el código de la Viz, y de los datos usados. A continuación, el enlace a dicho repositorio principal del proyecto: https://github.com/ansegura7/Evolucion-Temperatura-Global

## Prerrequisitos
El proyecto depende del acceso a los datos almacenados en el repositorio https://github.com/ansegura7/Evolucion-Temperatura-Global y a la disponibilidad del servicio de GitHub Pages, que permite el acceso por medio de un Navegador a la página principal proyecto.

Además, al usar los frameworks D3.js y JQuery, depende de que dichas librerías estén disponibles para ser usadas on-line.

## Uso
- La visualización se cargará completa al ingresar su URL en un navegador web.
- Se puede seleccionar el tipo de dato que se desea usar, en el combo-box Tipo de Dato.
- Se puede seleccionar la cantidad de datos que se desean visualizar, en el combo-box Ver últimos N años.
- Para el gráfico 3 (temperatura mensual), se puede seleccionar el año de los datos, en el combo-box Año de análisis.
- Para el gráfico 3 (temperatura mensual), se puede seleccionar el tipo de gráfico entre Line y Bar, en el combo-box Tipo de Gráfico.

## Autores
El autor de los datos es la NASA. Los datos van desde 1880 hasta el 2018.

El autor de la visualización es Andrés Segura Tinoco, CE 201711582.

## Screenshot
A continuación, se presentan unos pantallazo del proyecto:

![alt text](https://raw.githubusercontent.com/ansegura7/Evolucion-Temperatura-Global/master/screenshot/Figura1.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/Evolucion-Temperatura-Global/master/screenshot/Figura2.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/Evolucion-Temperatura-Global/master/screenshot/Figura3.PNG)

## Links de Interés
- Video de Youtube: https://youtu.be/ezkcyjspbyY
- Tweet: https://twitter.com/SeguraAndres7/status/1049729210607173632
##
