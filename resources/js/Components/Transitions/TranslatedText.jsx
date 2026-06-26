import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TranslatedText({ children, locale, className = '', as: Component = 'span', ...props }) {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);
        
        const listener = (e) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    const variants = {
        initial: { 
            opacity: 0, 
            y: reducedMotion ? 0 : 16, 
            filter: reducedMotion ? 'blur(0px)' : 'blur(2px)' 
        },
        animate: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)' 
        },
        exit: { 
            opacity: 0, 
            y: reducedMotion ? 0 : -16, 
            filter: reducedMotion ? 'blur(0px)' : 'blur(2px)' 
        }
    };

    return (
        <Component className={`inline-block relative whitespace-pre-wrap ${className}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={locale}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block w-full"
                    dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
                >
                    {!props.dangerouslySetInnerHTML && children}
                </motion.div>
            </AnimatePresence>
        </Component>
    );
}
