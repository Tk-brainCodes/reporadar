"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import styles from "./Footer.module.css";

const BUDDIES = [
  { name: "smiling face", src: "/assets/smiling-face-with-smiling-eyes.webp", left: "2%", bottom: "37%", size: "clamp(76px, 10vw, 148px)" },
  { name: "heart eyes", src: "/assets/smiling-face-with-heart-eyes.webp", left: "15%", bottom: "34%", size: "clamp(60px, 7.8vw, 112px)" },
  { name: "party popper", src: "/assets/party-popper.webp", left: "27%", bottom: "39%", size: "clamp(74px, 9vw, 132px)" },
  { name: "sparkles", src: "/assets/sparkles.webp", left: "39%", bottom: "32%", size: "clamp(62px, 8vw, 118px)" },
  { name: "halo smile", src: "/assets/smiling-face-with-halo.webp", left: "50%", bottom: "38%", size: "clamp(86px, 11vw, 160px)" },
  { name: "sunglasses smile", src: "/assets/smiling-face-with-sunglasses.webp", left: "63%", bottom: "34%", size: "clamp(68px, 8.5vw, 126px)" },
  { name: "laughing cat", src: "/assets/cat-with-tears-of-joy.webp", left: "75%", bottom: "40%", size: "clamp(68px, 9vw, 132px)" },
  { name: "grinning face", src: "/assets/grinning-face-with-smiling-eyes.webp", left: "87%", bottom: "33%", size: "clamp(76px, 10vw, 148px)" },
  { name: "magic wand", src: "/assets/magic-wand.webp", left: "8%", bottom: "46%", size: "clamp(58px, 7vw, 102px)" },
  { name: "trophy", src: "/assets/trophy.webp", left: "34%", bottom: "44%", size: "clamp(60px, 7.5vw, 110px)" },
  { name: "confetti", src: "/assets/confetti-ball.webp", left: "68%", bottom: "46%", size: "clamp(62px, 7.5vw, 112px)" },
  { name: "celebration", src: "/assets/fireworks.webp", left: "91%", bottom: "44%", size: "clamp(60px, 7.5vw, 110px)" },
];

function FooterBuddy({ buddy, index, boundsRef, buddyRefs, activeIndex, mouseX, mouseY, reduceMotion }) {
  const x = useSpring(0, { stiffness: 260, damping: 22 });
  const y = useSpring(0, { stiffness: 260, damping: 22 });
  const depth = 0.65 + index * 0.15;
  const active = activeIndex === index;
  const followX = useSpring(useTransform(mouseX, [-1, 1], active ? [-48 * depth, 48 * depth] : [0, 0]), { stiffness: 70, damping: 20 });
  const followY = useSpring(useTransform(mouseY, [-1, 1], active ? [-38 * depth, 38 * depth] : [0, 0]), { stiffness: 70, damping: 20 });

  function handleKeyDown(event) {
    const step = event.shiftKey ? 32 : 16;
    const xLimit = Math.min((boundsRef.current?.clientWidth || 1000) * 0.08, 110);
    const yLimit = Math.min((boundsRef.current?.clientHeight || 400) * 0.2, 70);
    const directions = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };

    if (directions[event.key]) {
      event.preventDefault();
      const [dx, dy] = directions[event.key];
      x.set(Math.max(-xLimit, Math.min(xLimit, x.get() + dx)));
      y.set(Math.max(-yLimit, Math.min(yLimit, y.get() + dy)));
    }
  }

  function bounceOnActivate() {
    if (reduceMotion) return;
    const restingY = y.get();
    y.set(restingY - 20);
    requestAnimationFrame(() => y.set(restingY));
  }

  return (
    <m.button
      type="button"
      className={styles.buddyButton}
      ref={(node) => { buddyRefs.current[index] = node; }}
      style={{ left: buddy.left, bottom: buddy.bottom, "--buddy-size": buddy.size, x, y }}
      drag
      dragConstraints={boundsRef}
      dragElastic={reduceMotion ? 0.12 : 0.48}
      dragMomentum={!reduceMotion}
      dragTransition={{ bounceStiffness: 280, bounceDamping: 16 }}
      whileDrag={reduceMotion ? undefined : { scale: 1.07, zIndex: 5 }}
      whileHover={reduceMotion ? undefined : { scale: 1.035 }}
      onKeyDown={handleKeyDown}
      onClick={bounceOnActivate}
      aria-label={`Drag the ${buddy.name} emoji. Use arrow keys to move it.`}
    >
      <m.span
        className={styles.buddyDrop}
        initial={reduceMotion ? false : { y: -360, opacity: 0, rotate: index % 2 === 0 ? -18 : 16 }}
        whileInView={{ y: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={reduceMotion ? { duration: 0 } : {
          type: "spring",
          stiffness: 112,
          damping: 11,
          mass: 0.9,
          delay: 0.12 + index * 0.13,
        }}
      >
        <m.span className={styles.buddyFollow} style={{ x: followX, y: followY }}>
          <Image className={styles.buddyEmoji} src={buddy.src} alt="" aria-hidden="true" draggable={false} width={320} height={320} loading="lazy" />
        </m.span>
      </m.span>
    </m.button>
  );
}

export function FooterPlayground() {
  const boundsRef = useRef(null);
  const buddyRefs = useRef([]);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function updatePointer(event) {
    if (reduceMotion || event.pointerType === "touch" || !boundsRef.current) return;
    const bounds = boundsRef.current.getBoundingClientRect();
    let nearestIndex = null;
    let nearestDistance = Infinity;

    buddyRefs.current.forEach((buddyRef, index) => {
      if (!buddyRef || !buddyRef.isConnected) return;
      const rect = buddyRef.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = dx * dx + dy * dy;
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex((current) => current === nearestIndex ? current : nearestIndex);
    const target = buddyRefs.current[nearestIndex]?.getBoundingClientRect();
    if (!target) return;
    const maxFollowX = Math.max(1, Math.min(80, bounds.width * 0.055));
    const maxFollowY = Math.max(1, Math.min(64, bounds.height * 0.16));
    mouseX.set(Math.max(-1, Math.min(1, (event.clientX - (target.left + target.width / 2)) / maxFollowX)));
    mouseY.set(Math.max(-1, Math.min(1, (event.clientY - (target.top + target.height / 2)) / maxFollowY)));
  }

  function resetPointer() {
    setActiveIndex(null);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      className={styles.playground}
      role="group"
      aria-label="Interactive RepoRadar wordmark. Drag or use arrow keys to move the characters."
      ref={boundsRef}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <p className={styles.playgroundHint}>Drag a signal around</p>
      <div className={styles.wordmark} aria-hidden="true">RepoRadar</div>
      {BUDDIES.map((buddy, index) => (
        <FooterBuddy
          key={buddy.name}
          buddy={buddy}
          index={index}
          boundsRef={boundsRef}
          buddyRefs={buddyRefs}
          activeIndex={activeIndex}
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
