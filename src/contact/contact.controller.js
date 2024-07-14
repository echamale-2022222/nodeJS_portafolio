import Contact from "./contact.model.js";
import nodemailer from 'nodemailer';

export const createContact = async (req, res) => {
    try {
        const { email, asunto, mensaje } = req.body;
        const contact = new Contact({ email, asunto, mensaje });
        await contact.save();

        const config = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        };

        const transport = nodemailer.createTransport(config);

        const mensajeEnviar = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Gracias por contactarme',
            subject: 'Gracias por contactarme',
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>¡Gracias por contactarme!</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            text-align: center;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            font-size: 18px;
                            line-height: 1.6;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>¡Gracias por visitar mi portafolio!</h1>
                        <p>Me alegra que te hayas tomado el tiempo de explorar mi trabajo.</p>
                        <div class="contact-info">
                            <p>Teléfono: +502 47968-665</p>
                            <p>Correo electrónico: echamale018@gmail.com</p>
                            <p>Correo electrónico: echamale-2022222@kinal.edu.gt</p>
                            <p>Me pondre en contacto contigo lo mas pronto posible!!</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        }

        const info = await transport.sendMail(mensajeEnviar);

        res.status(200).json({ message: 'OK'});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}