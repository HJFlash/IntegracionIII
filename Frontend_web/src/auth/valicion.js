  //Validar datos RUT
  const validarRut = (rut) => {
    const vRut = /^[0-9]+$/;

    if (!vRut.test(rut)) {
      return 'El rut debe tener entre 7 a 8 digitos del 0 al 9, seguido del digito verificador, en caso de ser k, cambiar por un 0 '
    }

    if(rut.length < 7 || rut.length > 9 ) {
      return 'El rut debe tener entre 7 a 9 digitos'
    }
    return
  };

  //validar Nombre
  const validarNombre = (nombres) => {
    const vNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombres.trim() === ''){
        return 'Datos sin completar';
    }

    if (!vNombre.test(nombres)){
        return 'El nombre no puede tener caracteres'
    }

  }

    //validar Nombre
    const validarApellidos = (apellidos) => {
        const vApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    
        if (apellidos.trim() === ''){
            return 'Datos sin completar';
        }
    
        if (!vApellidos.test(apellidos)){
            return 'El apellido no puede tener caracteres'
        }
    
      }


  //validar correo
  const validarEmail = (email) => {
    const vEmail = /^[a-zA-Z0-9._%+-]+@outlook\.(com|cl)$/;
  
    if (!vEmail.test(email)) {
      return 'El correo electrónico debe ser una dirección de Outlook (ejemplo@outlook.cl o ejemplo@outlook.com )';
    }
  
    return;
  };


  //Validar Numero de tenelofo

  const validarTel = (tel) => {
    const vTel = /^[0-9]+$/;
    const cleanedTel = tel.replace(/^\+56/, '').trim();

    if (!vTel.test(cleanedTel)) {
      return 'El numero de telefono solo puede tener carracteres del 0 al 9'
    }

    if(tel.length !== 9 ) {
      return 'El tel debe tener 9 caracteres iniciando con 9'
    }
    return
  };


export {validarRut, validarNombre, validarApellidos, validarTel, validarEmail}