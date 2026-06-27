import React, { useContext, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout, { TranslationContext } from '@/Layouts/PublicLayout';
import GalleryHero from './Components/GalleryHero';
import GalleryGrid from './Components/GalleryGrid';
import Lightbox from './Components/Lightbox';

export default function PublicIndex({ images = [] }) {
    const { locale } = useContext(TranslationContext);
    
    // Lightbox State
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Adapt backend data to match the modular component props
    const mappedImages = images.map(img => ({
        id: img.id,
        type: img.media_type || 'photo',
        url: img.media_url, 
        thumbnail: img.thumbnail, // Kept for video previews
        caption: img.title || '',
        category: 'Visuals' // Temporary default since category isn't in current DB schema
    }));

    return (
        <PublicLayout>
            <Head title={locale === 'id' ? 'Galeri Visual - Humas Intern Unmul' : 'Visual Gallery - Humas Intern Unmul'} />

            <GalleryHero locale={locale} />
            
            <div className="bg-[#050505] w-full">
                {mappedImages.length > 0 && (
                    <GalleryGrid 
                        items={mappedImages} 
                        onOpenLightbox={setLightboxIndex} 
                    />
                )}
            </div>

            <Lightbox 
                items={mappedImages} 
                activeIndex={lightboxIndex} 
                onClose={() => setLightboxIndex(null)} 
            />
        </PublicLayout>
    );
}
