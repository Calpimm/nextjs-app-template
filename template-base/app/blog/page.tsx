'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

/* 
  A "Back to Top" button that appears when scrolled beyond a certain threshold.
  We also add anchor-based navigation for sections using a table of contents. 
*/
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      className="
        fixed 
        bottom-8 right-8 
        z-50 
        rounded-full 
        bg-pink-500 
        px-4 py-3 
        text-white 
        shadow-lg 
        hover:bg-pink-400
      "
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
      transition={{ duration: 0.4 }}
      onClick={handleScrollTop}
    >
      ↑ Top
    </motion.button>
  );
}

export default function BlogPage() {
  /* 
    For a "table of contents," we'll create anchors for each major section. 
    We'll also use some Framer Motion animations for each section to fade in.
  */

  // Refs for sections:
  // 1) Remove "| null" from useRef<HTMLElement>(null).
  // This ensures each ref is of type RefObject<HTMLElement>, matching useInView.
  const sectionRefs = {
    overview: useRef<HTMLElement>(null),
    advancedNext: useRef<HTMLElement>(null),
    advancedTailwind: useRef<HTMLElement>(null),
    advancedTS: useRef<HTMLElement>(null),
    bigExample: useRef<HTMLElement>(null),
    conclusion: useRef<HTMLElement>(null),
  };

  // We'll add some small fade-in from bottom for each section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Hooks that check if each section is in view
  const overviewInView = useInView(sectionRefs.overview, { margin: '-50px' });
  const advancedNextInView = useInView(sectionRefs.advancedNext, { margin: '-50px' });
  const advancedTailwindInView = useInView(sectionRefs.advancedTailwind, { margin: '-50px' });
  const advancedTSInView = useInView(sectionRefs.advancedTS, { margin: '-50px' });
  const bigExampleInView = useInView(sectionRefs.bigExample, { margin: '-50px' });
  const conclusionInView = useInView(sectionRefs.conclusion, { margin: '-50px' });

  // Scroll to any section by anchor link
  const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen w-full bg-black font-sans text-gray-200">
      {/* Sticky top bar with "Return to Page" and Table of Contents */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-black/70 p-4 backdrop-blur-sm">
        <Link
          href="/"
          className="
            inline-block rounded-full border border-pink-500/60 
            px-4 py-2 text-sm text-pink-300 
            transition hover:border-pink-500 hover:bg-pink-500/10
          "
        >
          ← Return to Page
        </Link>

        {/* Table of Contents */}
        <div className="hidden sm:flex gap-4 text-sm text-gray-400">
          <button
            onClick={() => scrollToRef(sectionRefs.overview)}
            className={`${
              overviewInView ? 'text-pink-400' : ''
            } hover:text-pink-300 transition`}
          >
            Overview
          </button>
          <button
            onClick={() => scrollToRef(sectionRefs.advancedNext)}
            className={`${
              advancedNextInView ? 'text-pink-400' : ''
            } hover:text-pink-300 transition`}
          >
            Next.js
          </button>
          <button
            onClick={() => scrollToRef(sectionRefs.advancedTailwind)}
            className={`${
              advancedTailwindInView ? 'text-pink-400' : ''
            } hover:text-pink-300 transition`}
          >
            Tailwind
          </button>
          <button
            onClick={() => scrollToRef(sectionRefs.advancedTS)}
            className={`${
              advancedTSInView ? 'text-pink-400' : ''
            } hover:text-pink-300 transition`}
          >
            TypeScript
          </button>
          <button
            onClick={() => scrollToRef(sectionRefs.bigExample)}
            className={`${
              bigExampleInView ? 'text-pink-400' : ''
            } hover:text-pink-300 transition`}
          >
            Big Example
          </button>
          <button
            onClick={() => scrollToRef(sectionRefs.conclusion)}
            className={`${
              conclusionInView ? 'text-pink-400' : ''
            } hover:text-pink-300 transition`}
          >
            Conclusion
          </button>
        </div>
      </div>

      {/* Actual blog content */}
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-16">
        {/* 1) Overview Section */}
        <motion.section
          ref={sectionRefs.overview}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="overview"
        >
          <h1 className="mb-6 text-4xl font-bold text-pink-400">Modern Web Dev Stack</h1>
          <p className="mb-4 text-lg leading-relaxed">
            In this extended blog, we&apos;ll dive deeper into{' '}
            <span className="text-green-300">Next.js</span>,{' '}
            <span className="text-cyan-300">Tailwind CSS</span>, and{' '}
            <span className="text-yellow-300">TypeScript</span>—three pillars for building high-performance,
            developer-friendly applications. Our focus: advanced usage, tips, and a big example app you can adapt to
            your needs.
          </p>
          <p className="mb-6">
            We&apos;ll also highlight new features from Next.js 13+ (App Router, Layouts, etc.), show you how
            to customize Tailwind to your brand, and illustrate TypeScript best practices for **scalable** code.
          </p>
        </motion.section>

        {/* 2) Next.js Advanced Section */}
        <motion.section
          ref={sectionRefs.advancedNext}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="nextjs"
        >
          <h2 className="mb-4 text-3xl font-semibold text-blue-400">Advanced Next.js Features</h2>
          <p className="mb-4 text-md leading-relaxed">
            Next.js provides everything from SSR to static generation. In the new <span className="text-pink-300">App Router</span>, 
            you can define multiple <code className="bg-gray-800 px-1 py-0.5 rounded text-sm text-blue-200">layout.tsx</code> files 
            to nest layouts, apply intercepting routes, and more. Additionally:
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2 text-sm">
            <li>
              <span className="text-green-300">Route Groups</span>: group routes together without affecting the URL path.
            </li>
            <li>
              <span className="text-cyan-300">Middleware</span>: run custom logic (e.g., auth checks) before rendering.
            </li>
            <li>
              <span className="text-yellow-300">Server Actions</span>: an upcoming experimental feature that helps handle
              server-side logic without an API route.
            </li>
          </ul>
          <div className="mb-4 bg-gray-800 p-4 rounded text-gray-200 text-sm leading-relaxed">
            <pre>{`// app/dashboard/page.tsx (example)
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      {/* Display dynamic data or run a server action */}
    </div>
  );
}`}</pre>
          </div>
          <p className="mb-4">
            Check out the{' '}
            <a
              href="https://nextjs.org/docs/app"
              className="underline text-pink-400 hover:text-pink-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              official Next.js docs
            </a>{' '}
            for more advanced patterns with the **App Router**.
          </p>
        </motion.section>

        {/* 3) Tailwind CSS Advanced Section */}
        <motion.section
          ref={sectionRefs.advancedTailwind}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="tailwind"
        >
          <h2 className="mb-4 text-3xl font-semibold text-cyan-400">Tailwind Customization & Tricks</h2>
          <p className="mb-4 text-md leading-relaxed">
            Tailwind is a utility-first framework that you can customize extensively. 
            In <code className="bg-gray-800 px-1 py-0.5 rounded text-sm text-blue-200">tailwind.config.js</code>, 
            you can define brand colors, custom fonts, breakpoints, and more. 
          </p>
          <p className="mb-2">
            Example snippet:
          </p>
          <div className="mb-4 bg-gray-800 p-4 rounded text-gray-100 text-sm leading-relaxed">
            <pre>{`// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#C7FFD8",
          DEFAULT: "#88FFB8",
          dark: "#4AEF97",
        },
      },
    },
  },
  plugins: [],
};`}</pre>
          </div>
          <p className="mb-4">
            Once defined, use your custom color in classes like <code className="text-pink-300">bg-brand-dark</code> or{' '}
            <code className="text-pink-300">text-brand</code>. Add additional plugins for forms, typography, or line-clamp 
            to further streamline your dev workflow. For more:
          </p>
          <p className="mb-6">
            <a
              href="https://tailwindcss.com/docs"
              className="underline text-pink-400 hover:text-pink-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              official Tailwind docs
            </a>
          </p>
        </motion.section>

        {/* 4) TypeScript Advanced Section */}
        <motion.section
          ref={sectionRefs.advancedTS}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="typescript"
        >
          <h2 className="mb-4 text-3xl font-semibold text-yellow-400">TypeScript Best Practices</h2>
          <p className="mb-4 leading-relaxed">
            <span className="text-blue-300">TypeScript</span> can massively reduce runtime errors and self-document
            your code. For large Next.js apps, consider using:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2 text-sm">
            <li>
              <span className="text-green-300">Absolute Imports & Paths</span> using the{' '}
              <code className="bg-gray-800 px-1 py-0.5 rounded text-blue-200">baseUrl</code> &{' '}
              <code className="bg-gray-800 px-1 py-0.5 rounded text-blue-200">paths</code> in tsconfig.
            </li>
            <li>
              <span className="text-purple-300">Interfaces vs. Types</span>: be consistent to maintain clarity.
            </li>
            <li>Enable <span className="text-pink-300">strict</span>, <span className="text-cyan-300">noImplicitAny</span>, etc.</li>
          </ul>
          <p className="mb-2">
            A minimal <code className="text-pink-300">tsconfig.json</code> snippet:
          </p>
          <div className="mb-6 bg-gray-800 p-4 rounded text-gray-100 text-sm leading-relaxed">
            <pre>{`{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noImplicitAny": true,
    "moduleResolution": "Node",
    "baseUrl": ".",
    "paths": {
      "@components/*": ["app/components/*"],
      "@utils/*": ["app/utils/*"]
    },
    // ...
  },
  "include": ["app/**/*", "next-env.d.ts"],
  "exclude": ["node_modules"]
}`}</pre>
          </div>
          <p className="mb-4">
            Learn more from the{' '}
            <a
              href="https://www.typescriptlang.org/docs/"
              className="underline text-pink-400 hover:text-pink-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              official TypeScript docs
            </a>.
          </p>
        </motion.section>

        {/* 5) Big Example Section */}
        <motion.section
          ref={sectionRefs.bigExample}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="bigExample"
        >
          <h2 className="mb-4 text-3xl font-semibold text-pink-300">Putting It All Together: A Big Example</h2>
          <p className="mb-4 leading-relaxed">
            Below is a simplified Next.js 15 project structure that merges all three technologies. We assume you&apos;ve 
            already created the base with 
            <code className="bg-gray-800 px-1 py-0.5 rounded mx-1 text-blue-200">npx create-next-app@latest --typescript</code> 
            and installed <code className="bg-gray-800 px-1 py-0.5 rounded text-blue-200">tailwindcss</code>.
          </p>
          <div className="mb-4 bg-gray-800 p-4 rounded text-gray-100 text-sm overflow-auto leading-relaxed">
            <pre>{`my-project/
├─ app/
│  ├─ layout.tsx        // your main layout
│  ├─ page.tsx          // home page
│  ├─ blog/
│  │  └─ page.tsx       // blog page
│  └─ components/       // shared UI components
│
├─ tailwind.config.js   // custom theme, brand colors
├─ tsconfig.json        // strict TypeScript settings
├─ package.json
└─ ...
`}</pre>
          </div>
          <p className="mb-4">
            From here, you can add more routes, data fetching logic, or authentication. Combine{' '}
            <span className="text-cyan-300">Tailwind classes</span> for rapid styling, and harness{' '}
            <span className="text-yellow-300">TypeScript</span> for stable, maintainable code. 
            The new <span className="text-green-300">App Router</span> in Next.js 13+ further organizes your pages and layouts.
          </p>
        </motion.section>

        {/* 6) Conclusion */}
        <motion.section
          ref={sectionRefs.conclusion}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="conclusion"
        >
          <h2 className="mb-4 text-3xl font-semibold text-purple-400">Conclusion</h2>
          <p className="mb-4 text-lg leading-relaxed">
            By leveraging <span className="text-blue-300">Next.js</span> for routing & SSR, 
            <span className="text-cyan-300">Tailwind CSS</span> for design, and <span className="text-yellow-300">TypeScript</span> 
            for type safety, you can rapidly build a modern, robust, and high-performing web application. 
            With advanced Next.js features like layouts and route groups, plus the custom Tailwind config 
            and strict TypeScript rules, your codebase will remain **maintainable** as it grows.
          </p>
          <p className="mb-6">
            We hope this extended blog clarifies advanced usage, provides a big example to get started, 
            and encourages you to push your projects to production-level quality. 
            Happy coding!
          </p>
          <footer className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Calpim - All rights reserved.
          </footer>
        </motion.section>
      </div>

      {/* "Back to Top" floating button */}
      <BackToTopButton />
    </main>
  );
}