import React, { useEffect, useState } from 'react';

const backgroundImage = "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop')";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  const [motionLib, setMotionLib] = useState(null);

  useEffect(() => {
    let isMounted = true;

    import(/* @vite-ignore */ 'https://esm.sh/framer-motion@11.18.2?bundle')
      .then((module) => {
        if (isMounted) {
          setMotionLib(module);
        }
      })
      .catch(() => {
        setMotionLib(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const motion = motionLib?.motion;
  const MotionSection = motion ? motion.section : 'section';
  const MotionBackground = motion ? motion.div : 'div';
  const MotionContent = motion ? motion.div : 'div';
  const MotionText = motion ? motion.p : 'p';
  const MotionHeading = motion ? motion.h1 : 'h1';

  return (
    <MotionSection
      className="relative w-full min-h-screen flex items-center overflow-hidden pt-20"
      initial={motion ? { opacity: 0 } : undefined}
      animate={motion ? { opacity: 1 } : undefined}
      transition={motion ? { duration: 0.8, ease: 'easeOut' } : undefined}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full z-[-1]">
        <MotionBackground
          className="absolute inset-0 bg-cover bg-[center_20%]"
          style={{ backgroundImage }}
          initial={motion ? { scale: 1.1, y: 10 } : undefined}
          animate={motion ? { scale: 1, y: 0 } : undefined}
          transition={motion ? { duration: 1.6, ease: [0.22, 1, 0.36, 1] } : undefined}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10 md:from-[#140b0a]/70 md:via-[#140b0a]/40 md:to-transparent"></div>

        <MotionBackground
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(194,163,107,0.32),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(94,11,21,0.22),transparent_35%)]"
          animate={motion ? { opacity: [0.3, 0.5, 0.3] } : undefined}
          transition={motion ? { duration: 6, ease: 'easeInOut', repeat: Infinity } : undefined}
        />
      </div>

      <div className="container-custom relative z-10 w-full">
        <MotionContent
          className="max-w-xl md:-mt-10"
          variants={motion ? containerVariants : undefined}
          initial={motion ? 'hidden' : undefined}
          animate={motion ? 'visible' : undefined}
        >
          <MotionText
            className="text-brand-gold text-sm tracking-[3px] uppercase mb-4 font-semibold"
            variants={motion ? itemVariants : undefined}
          >
            NEW ARRIVALS 2024
          </MotionText>

          <MotionHeading
            className="font-serif text-white text-5xl md:text-7xl leading-tight mb-6 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
            variants={motion ? itemVariants : undefined}
          >
            The Crochet<br />Chronicles
          </MotionHeading>

          <MotionText
            className="text-white/85 text-lg mb-10 max-w-md"
            variants={motion ? itemVariants : undefined}
          >
            Weaving a modern aesthetic with timeless tradition.
            Our pieces are more than just garments—they are heirlooms for the soul.
          </MotionText>

          <MotionContent
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
            variants={motion ? itemVariants : undefined}
          >
            <button className="btn-primary shadow-[0_12px_30px_rgba(94,11,21,0.4)] hover:shadow-[0_14px_38px_rgba(94,11,21,0.5)]">
              SHOP NEW ARRIVALS
            </button>
            <a href="#lookbook" className="text-brand-gold font-serif text-sm tracking-[2px] border-b border-brand-gold pb-1 hover:text-white hover:border-white transition-colors">
              VIEW LOOKBOOK
            </a>
          </MotionContent>
        </MotionContent>
      </div>
    </MotionSection>
  );
};

export default Hero;
