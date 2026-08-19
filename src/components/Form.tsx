import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser'
import { motion, useReducedMotion } from 'framer-motion';


interface FormData {
    user_name: string,
    user_email: string,
    message: string,
}


const Form: React.FC = () => {

    const { register, handleSubmit } = useForm<FormData>();

    const [loading, setLoading] = useState<boolean>(false);

    const form = useRef<HTMLFormElement>(null);

    const shouldReduceMotion = useReducedMotion();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
        },
    };

    const fieldVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

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

    return (
        <>
            <motion.form
                ref={form}
                onSubmit={handleSubmit(onSubmit)}
                className='container-contact-form'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className='container-input-contact-form' style={{ position: 'relative' }} variants={fieldVariants}>
                    <input type="text" {...register('user_name', {required: true})} id="name" placeholder=" "/>
                    <label htmlFor="name" className="label-input">Nombre</label>
                </motion.div>
                <motion.div className='container-input-contact-form' style={{ position: 'relative' }} variants={fieldVariants}>
                    <input type="email" {...register("user_email", {required: "Campo obligatorio", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "El email no es válido"}})} id="email" placeholder=" "/>
                    <label htmlFor="email" className="label-input">Email</label>                    
                </motion.div>
                <motion.div className='container-input-contact-form' style={{ position: 'relative' }} variants={fieldVariants}>
                    <textarea className='textarea-contact-form' {...register('message', {required: true})} id="message" placeholder=" "></textarea>
                    <label htmlFor="message" className="label-textarea">Escribe tu mensaje</label>
                </motion.div>
                <motion.div className='container-input-contact-form' style={{ position: 'relative' }} variants={fieldVariants}>
                    {
                    loading ? (
                        <button className='loading-contact-form' disabled={true}>
                            <div className='spinner-contact-form'/>
                        </button>
                    )
                    :
                    (
                        <motion.button
                            type="submit"
                            className="loading-contact-form"
                            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            Enviar
                        </motion.button>
                    )
                    }
                </motion.div>
            </motion.form>
            <ToastContainer />
        </>
    )
}

export default Form
