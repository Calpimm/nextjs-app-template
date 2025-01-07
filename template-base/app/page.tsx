'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useSpring, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/** 
 * Example logos. We use relative paths as if they're in `/public` folder:
 */
const LOGOS = [
  { src: 'nextjs-app-template/nodejs.svg', alt: 'Node.js' },
  { src: 'nextjs-app-template/react.svg', alt: 'React' },
  { src: 'nextjs-app-template/nextjs.svg', alt: 'Next.js' },
  { src: 'nextjs-app-template/typescript.svg', alt: 'TypeScript' },
  { src: 'nextjs-app-template/tailwindcss.svg', alt: 'Tailwind CSS' },
];

const GITHUB_LOGO = '/github-mark-white.svg';

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
      delayChildren: 0.2,
      staggerChildren: 0.3,
    },
  },
};

const childVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export default function LandingPage() {
  // For the glow effect
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const xSpring = useSpring(mouseX, { stiffness: 20, damping: 10 });
  const ySpring = useSpring(mouseY, { stiffness: 20, damping: 10 });

  const factor = 0.1;
  const glowX = useTransform(xSpring, (val) => val * factor);
  const glowY = useTransform(ySpring, (val) => val * factor);

  // GSAP Marquee
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const container = marqueeRef.current;
    const itemWidth = container.scrollWidth;
    gsap.fromTo(
      container,
      { x: window.innerWidth },
      {
        x: -itemWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
      }
    );
  }, []);

  return (
    <main className="relative h-screen w-screen bg-black font-sans">
      {/* Glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          z-50
          h-[50rem] w-[50rem]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-gradient-to-r from-green-400 to-blue-500
          opacity-70
          blur-3xl
          mix-blend-screen
        "
        style={{ x: glowX, y: glowY }}
      />

      {/* Blog Button */}
      <div className="absolute top-4 right-4 z-50">
        <Link
          href="/blog"
          className="
            group relative inline-block
            rounded-full border border-pink-500/60
            px-5 py-2 text-sm font-semibold text-pink-200
            transition-all duration-300
            hover:border-pink-500 hover:text-pink-100
            focus:outline-none focus:ring-2 focus:ring-pink-500
          "
        >
          <span
            className="
              absolute inset-0 -z-10
              rounded-full
              bg-gradient-to-r from-pink-500 to-purple-500
              opacity-0 transition-opacity duration-300
              group-hover:opacity-20
            "
          />
          Read Our Blog
        </Link>
      </div>

      {/* Marquee */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-24
          z-40
          bg-black/50
          backdrop-blur-sm
          overflow-hidden
          flex
          items-center
        "
      >
        <div ref={marqueeRef} className="flex items-center h-full">
          {LOGOS.map((logo, idx) => (
            <LogoItem key={idx} logo={logo} />
          ))}
        </div>
      </div>

      {/* Center content */}
      <section className="relative z-30 flex h-full w-full flex-col items-center justify-center p-4">
        <motion.div
          className="
            rounded-xl
            border border-white/60
            p-8 text-center
            sm:p-10 md:p-12
            bg-transparent
          "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold text-white sm:text-5xl"
            variants={childVariants}
          >
            Next.js 15 Template
          </motion.h1>

          <motion.p
            className="mt-3 text-sm text-gray-300 sm:mt-4 sm:text-base md:text-lg"
            variants={childVariants}
          >
            Experience eye-catching animations, real-time magic, and modern frameworks.
          </motion.p>

          <motion.div
            className="mt-6 flex justify-center"
            variants={childVariants}
          >
            <Link
              href="https://github.com/Calpimm/nextjs-app-template"
              target="_blank"
              className="
                flex items-center gap-2
                rounded-full bg-gray-800
                px-5 py-2
                text-sm text-white
                transition
                hover:bg-gray-700
                hover:scale-105
              "
            >
              <Image
                src={GITHUB_LOGO}
                alt="GitHub Logo"
                width={20}
                height={20}
                unoptimized
              />
              <span>View on GitHub</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

function LogoItem({ logo }: { logo: { src: string; alt: string } }) {
  return (
    <motion.div
      className="relative mx-16 flex items-center justify-center"
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 150, damping: 10 }}
    >
      {/* Important: `unoptimized` plus the direct `/nodejs.svg` path */}
      <Image
        src={logo.src}
        alt={logo.alt}
        width={60}
        height={60}
        unoptimized
      />
    </motion.div>
  );
}