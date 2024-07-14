import Contact from "./contact.model.js";
import nodemailer from 'nodemailer';

export const createContact = async (req, res) => {
    try {
        const { email} = req.body;
        const contact = new Contact({ email });
        
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
            subject: 'Gracias por visitar mi portafolio',
            html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>¡Gracias por visitar mi portafolio!</title>
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
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    p {
                        font-size: 18px;
                        line-height: 1.6;
                        color: #666;
                        margin-bottom: 20px;
                    }
                    .signature {
                        font-style: italic;
                        font-size: 16px;
                        color: #888;
                    }
                    .image-container {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .image {
                        max-width: 100%;
                        height: auto;
                        border-radius: 50%;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>¡Gracias por visitar mi portafolio!</h1>
                    <p>Es un placer tenerte por aquí. Espero que hayas disfrutado explorando mi trabajo y te haya gustado.</p>
                    <p>Si tienes alguna pregunta o simplemente quieres charlar, no dudes en ponerte en contacto conmigo.</p>
                    <a href="https://api.whatsapp.com/send/?phone=47968665&text&type=phone_number&app_absent=0">Mi whatsapp</a>
                    <p class="signature">¡Hasta pronto 🤗🤗🤗!</p>
                    <div class="image-container">
                        <img src="https://media1.tenor.com/m/1ZMQ6_PMf9MAAAAd/raccoon-rave.gif" alt="Gracias" class="image">
                    </div>
                </div>
            </body>
            </html>
            
            `
        }

        const info = await transport.sendMail(mensajeEnviar);

        res.status(200).json({ message: 'OK'} );

    } catch (error) {
        res.status(400).json({ message: 'Error', error });
    }
}