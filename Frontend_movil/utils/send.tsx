import axios from 'axios';

const sendEmailNotification = async (email, subject, message) => {
  try {
    const response = await axios.post('http://<TU_BACKEND_URL>/api/send-email/', {
      email,
      subject,
      message,
    });
    if (response.data.success) {
      alert('Correo enviado exitosamente');
    }
  } catch (error) {
    alert('Error al enviar el correo: ' + error.message);
  }
};
