import nodemailer from "nodemailer";

const emailRegistro = async (datos) =>{
    const  transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:  process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {email, nombre, token } = datos;

      // Enviar el email

      const info = await transporter.sendMail({
        from: "APV- Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reestablece su password',
        text: 'Reestablece su password',
        html: `<p>Hola: ${nombre}, has solicitado reestablecer tu password.</p>

            <p>Sigue el siguient enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `
      });

      console.log("Mensaje enviado: %s", info.messageId)
};

export default emailRegistro;