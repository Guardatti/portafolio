import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser'
import '../styles/form.css'
import ScrollReveal from 'scrollreveal';


interface FormData {
    user_name: string,
    user_email: string,
    message: string,
}


const Form: React.FC = () => {

    const { register, handleSubmit } = useForm<FormData>();

    const [loading, setLoading] = useState<boolean>(false);

    const form = useRef<HTMLFormElement>(null);

    const onSubmit = () => {

        setLoading(true);

        if (!form.current) return;

        emailjs
        .sendForm('service_9c9qnia', 'template_n7mvs14', form.current, {
            publicKey: '4J18PYcgaGGgyLwvL',
        })
        .then(
            () => {
            toast.success('Mensaje enviado con éxito', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            form.current?.reset();
            setLoading(false);
            },
            () => {
                toast.error('Error al enviar el mensaje', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
            },
        );
    };

    useEffect(() => {

        if (typeof window !== "undefined") {
            import("scrollreveal").then((ScrollRevealModule) => {
            const sr = ScrollRevealModule.default({
                distance: "30px",
                duration: 800,
                easing: "ease-out",
                origin: "bottom",
            });

            sr.reveal(".container-contact-form, .container-input-contact-form", {
                interval: 0,
            });
            });
        }

    }, []);
    
    return (
        <>
            <form ref={form} onSubmit={handleSubmit(onSubmit)} className='container-contact-form'>
                <div className='container-input-contact-form'>
                    <input type="text" {...register('user_name', {required: true})} id="name" placeholder=" "/>
                    <label htmlFor="name" className="label-input">Nombre</label>
                </div>
                <div className='container-input-contact-form'>
                    <input type="email" {...register("user_email", {required: "Campo obligatorio", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "El email no es válido"}})} id="email" placeholder=" "/>
                    <label htmlFor="email" className="label-input">Email</label>                    
                </div>
                <div className='container-input-contact-form'>
                    <textarea className='textarea-contact-form' {...register('message', {required: true})} id="message" placeholder=" "></textarea>
                    <label htmlFor="message" className="label-textarea">Escribe tu mensaje</label>
                </div>
                <div className='container-input-contact-form'>
                    {
                    loading ? (
                        <button className='loading-contact-form' disabled={true}>
                            <div className='spinner-contact-form'/>
                        </button>
                    )
                    :
                    (
                        <button type="submit" className="loading-contact-form">Enviar</button>
                    )
                    }
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default Form
