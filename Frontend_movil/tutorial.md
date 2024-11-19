# Implementación de app a Android
Mediante varios pasos se implementará la aplicación a una versión de prueba en movil mediante apk
el cual se construye(build) mediante procesos que **expo** ya incluye.
## En Primer lugar, Inicio en el EAS
Se pide que en la terminal se encuentre en el proyecto, la carpeta donde está presente el frontend_movil.

**RECORDAR** instalar los paquetes del frontend movil

**npm install**

En la pagina de expo tambien deben crearse una cuenta

Una vez listos, deben ejecutar el comando para iniciar sesion

**npx expo login**

## En segundo lugar, Build el Proyecto

**npx eas build**
**npx eas build -p android --profile preview**

Si no funciona el eas, ejecute **npm install eas-cli**

el ultimo comando comenzara a construir(build) el proyecto, cabe destacar que puede haber problemas con un limite alcanzado debido a la cuenta. 

por ahora queda pendiente las pruebas debido a lo ultimo

## En tercer lugar

Se pedira la opcion de hacer build para All(Ambos), Android e IOS. Par IOS se necesita una cuenta de Apple por el momento queda pendiente o se omitirá la build para IOS.

