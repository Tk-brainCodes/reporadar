"use client";

import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import styles from "./Footer.module.css";

const BUDDIES = [
  { name: "smiling face", emoji: "😊", left: "2%", bottom: "4%", size: "clamp(76px, 10vw, 148px)" },
  { name: "heart", emoji: "❤️", left: "15%", bottom: "0%", size: "clamp(60px, 7.8vw, 112px)" },
  { name: "rocket", emoji: "🚀", left: "27%", bottom: "6%", size: "clamp(74px, 9vw, 132px)" },
  { name: "sparkles", emoji: "✨", left: "39%", bottom: "1%", size: "clamp(62px, 8vw, 118px)" },
  { name: "robot", emoji: "🤖", left: "50%", bottom: "4%", size: "clamp(86px, 11vw, 160px)" },
  { name: "party popper", emoji: "🎉", left: "63%", bottom: "0%", size: "clamp(68px, 8.5vw, 126px)" },
  { name: "star", emoji: "🌟", left: "75%", bottom: "5%", size: "clamp(68px, 9vw, 132px)" },
  { name: "heart eyes", emoji: "😍", left: "87%", bottom: "1%", size: "clamp(76px, 10vw, 148px)" },
  { name: "alien", emoji: "👾", left: "8%", bottom: "43%", size: "clamp(58px, 7vw, 102px)" },
  { name: "computer", emoji: "💻", left: "34%", bottom: "44%", size: "clamp(60px, 7.5vw, 110px)" },
  { name: "dizzy", emoji: "😵‍💫", left: "68%", bottom: "42%", size: "clamp(62px, 7.5vw, 112px)" },
  { name: "disco ball", emoji: "🪩", left: "91%", bottom: "44%", size: "clamp(60px, 7.5vw, 110px)" },
];

function FooterBuddy({ buddy, index, boundsRef, mouseX, mouseY, reduceMotion }) {
  const x = useSpring(0, { stiffness: 260, damping: 22 });
  const y = useSpring(0, { stiffness: 260, damping: 22 });
  const depth = 0.65 + index * 0.15;
  const followX = useSpring(useTransform(mouseX, [-1, 1], [-16 * depth, 16 * depth]), { stiffness: 70, damping: 20 });
  const followY = useSpring(useTransform(mouseY, [-1, 1], [-12 * depth, 12 * depth]), { stiffness: 70, damping: 20 });

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
      aria-label={`Drag ${buddy.name} RepoRadar character. Use arrow keys to move it.`}
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
          <span className={styles.buddyEmoji} aria-hidden="true">{buddy.emoji}</span>
        </m.span>
      </m.span>
    </m.button>
  );
}

export function FooterPlayground() {
  const boundsRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function updatePointer(event) {
    if (reduceMotion || event.pointerType === "touch" || !boundsRef.current) return;
    const bounds = boundsRef.current.getBoundingClientRect();
    mouseX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    mouseY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  }

  function resetPointer() {
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
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
