Munoa
=====

`Munoa` es el nombre en clave de la aplicación para moviles y tablets del municipio de 
[Zarautz](http://zarautz.org).

Angular.js y Phonegap
---------------------

`Munoa` se basa en los estandares web (HTML, JS y CSS), funciona sobre el framework `Angular.js` y
la plataforma para aplicaciónes moviles `Phonegap`. Para consultar la documentación:

  - Angular.js: [http://angularjs.org](http://angularjs.org)
  - Phonegap: [http://phonegap.com](http://phonegap.com)

Yeoman
------

Para ejecutar el servidor de pruebas, crear los builds para moviles, etc. es necesario
instalar `Yeoman`: [http://yeoman.io](http://yeoman.io)

### Bower

Instalar dependencias:

```
$ bower install
```

Actualizar dependencias:

```
$ bower update
```

### Grunt

Iniciar el servidor de pruebas:

```
$ grunt server
```

Verificar que el código javascript es correcto:

```
$ grunt jshint:all
```

Hacer un build via [`Phonegap Build`](http://build.phonegap.com):

```
$ grunt phonegap --force
```

Deploy
------

En caso de querer probar la aplicación en un servidor HTTP, editar el script `deploy_staging.sh` y
luego ejecutar:

```
$ ./deploy_staging.sh
```

Para el servidor es suficiente un alojamiento "estatico" (incluso puede servir Dropbox o Google 
Drive). Recuerda que hay disponible una representación de la aplicación en la carpeta
`preview`. Ejemplo: `http://munoa.example.com/preview`.
