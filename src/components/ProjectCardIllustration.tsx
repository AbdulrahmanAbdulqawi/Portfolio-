import React, { useMemo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { ProjectIllustrationKind } from '../types';

const svgNs = { xmlns: 'http://www.w3.org/2000/svg' as const };

type IllustrationMotionProps = {
  reduce: boolean;
  active: boolean;
};

const loopEase = 'easeInOut' as const;

function IllustrationNeural({ reduce, active }: IllustrationMotionProps) {
  const nodes: [number, number, number][] = [
    [40, 22, 7],
    [100, 14, 7],
    [160, 22, 7],
    [52, 52, 7],
    [100, 52, 8],
    [148, 52, 7],
    [70, 84, 7],
    [130, 84, 7],
  ];
  const connections = (
    <path
      d="M40 28l12 18M100 21v24M160 28l-12 18M46 28l6 18M154 28l-6 18M47 58h46M107 58h34M58 58L70 78M100 60v16M142 58l-12 22M76 58l-6 20M124 58l6 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      opacity={0.4}
    />
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      {reduce || !active ? (
        <>
          {nodes.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={2.25} />
          ))}
          {connections}
        </>
      ) : (
        <>
          {nodes.map(([cx, cy, r], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{
                duration: 2.4 + i * 0.08,
                repeat: Infinity,
                ease: loopEase,
                delay: i * 0.12,
              }}
            />
          ))}
          <motion.path
            d="M40 28l12 18M100 21v24M160 28l-12 18M46 28l6 18M154 28l-6 18M47 58h46M107 58h34M58 58L70 78M100 60v16M142 58l-12 22M76 58l-6 20M124 58l6 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            opacity={0.4}
            animate={{ opacity: [0.22, 0.48, 0.22] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: loopEase }}
          />
        </>
      )}
    </svg>
  );
}

function IllustrationEducationWeb({ reduce, active }: IllustrationMotionProps) {
  const frame = (
    <>
      <rect x="28" y="20" width="144" height="64" rx="8" fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeWidth={2.25} />
      <path d="M28 34h144" stroke="currentColor" strokeWidth={2} opacity={0.35} />
      <rect x="40" y="26" width="72" height="5" rx="2" fill="currentColor" fillOpacity={0.2} />
    </>
  );
  const playGroup = (
    <>
      <path
        d="M100 48l-18 22h36z"
        fill="currentColor"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx="100" cy="56" r="5" fill="none" stroke="currentColor" strokeWidth={2} />
      <path d="M88 70h24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.4} />
    </>
  );
  const side = (
    <>
      <rect x="152" y="44" width="20" height="20" rx="3" fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={1.75} />
      <path d="M157 52h10M162 47v10" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" opacity={0.55} />
    </>
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      {frame}
      {reduce || !active ? <g>{playGroup}</g> : (
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: loopEase }}
          style={{ transformOrigin: '100px 58px' }}
        >
          {playGroup}
        </motion.g>
      )}
      {side}
    </svg>
  );
}

function IllustrationArcadeGame({ reduce, active }: IllustrationMotionProps) {
  const cabinet = (
    <path
      d="M24 78V42h32v36M56 42h40M96 42h40v16M136 58h40v20M24 78h160"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      opacity={0.38}
    />
  );
  const joystickBase = <circle cx="118" cy="52" r="14" fill="none" stroke="currentColor" strokeWidth={2.25} />;
  const stick = <path d="M118 52l14-7M118 52l14 7" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />;
  const buttons = (
    <>
      <circle cx="148" cy="52" r="2.75" fill="currentColor" />
      <circle cx="162" cy="52" r="2.75" fill="currentColor" />
      <circle cx="176" cy="52" r="2.75" fill="currentColor" />
    </>
  );
  const pads = (
    <>
      <rect x="36" y="52" width="10" height="10" rx="2" fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeWidth={1.5} />
      <rect x="52" y="52" width="10" height="10" rx="2" fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeWidth={1.5} />
    </>
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      {cabinet}
      {joystickBase}
      {reduce || !active ? stick : (
        <motion.g
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: loopEase }}
          style={{ transformOrigin: '118px 52px' }}
        >
          {stick}
        </motion.g>
      )}
      {reduce || !active ? (
        buttons
      ) : (
        <g>
          {[
            { cx: 148, delay: 0 },
            { cx: 162, delay: 0.18 },
            { cx: 176, delay: 0.36 },
          ].map(({ cx, delay }) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={52}
              r={2.75}
              fill="currentColor"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: loopEase, delay }}
            />
          ))}
        </g>
      )}
      {pads}
    </svg>
  );
}

function IllustrationCloudPipeline({ reduce, active }: IllustrationMotionProps) {
  const lines = (
    <>
      <path d="M128 48h52M128 56h40M128 64h48" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" opacity={0.42} />
      <path d="M44 78h32M88 78h32M132 78h32" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" opacity={0.32} />
    </>
  );
  const boxes = (
    <>
      <rect x="70" y="72" width="18" height="10" rx="2" fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeWidth={1.5} />
      <rect x="112" y="72" width="18" height="10" rx="2" fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeWidth={1.5} />
    </>
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      {reduce || !active ? (
        <path
          d="M52 62c0-10 8-18 18-18 2-14 14-24 28-24 12 0 22 8 26 18 10 2 18 10 18 20 0 12-10 22-22 22H58c-10 0-18-8-18-18z"
          fill="currentColor"
          fillOpacity={0.1}
          stroke="currentColor"
          strokeWidth={2.25}
          strokeLinejoin="round"
        />
      ) : (
        <motion.path
          d="M52 62c0-10 8-18 18-18 2-14 14-24 28-24 12 0 22 8 26 18 10 2 18 10 18 20 0 12-10 22-22 22H58c-10 0-18-8-18-18z"
          fill="currentColor"
          fillOpacity={0.1}
          stroke="currentColor"
          strokeWidth={2.25}
          strokeLinejoin="round"
          animate={{ scale: [1, 1.02, 1] }}
          style={{ transformOrigin: '90px 48px' }}
          transition={{ duration: 3.5, repeat: Infinity, ease: loopEase }}
        />
      )}
      {lines}
      {reduce || !active ? (
        <>
          <circle cx="138" cy="48" r="4" fill="currentColor" fillOpacity={0.45} />
          <circle cx="152" cy="56" r="4" fill="currentColor" fillOpacity={0.45} />
          <circle cx="166" cy="64" r="4" fill="currentColor" fillOpacity={0.45} />
        </>
      ) : (
        <g>
          {[
            { cx: 138, cy: 48, shift: 5 },
            { cx: 152, cy: 56, shift: 0 },
            { cx: 166, cy: 64, shift: -5 },
          ].map(({ cx, cy, shift }, i) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={4}
              fill="currentColor"
              fillOpacity={0.45}
              animate={{ cx: [cx, cx + shift, cx], opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: loopEase, delay: i * 0.25 }}
            />
          ))}
        </g>
      )}
      {boxes}
    </svg>
  );
}

function IllustrationMultiLayer({ reduce, active }: IllustrationMotionProps) {
  const connector = (
    <path d="M100 18v12M100 58v12" stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 4" opacity={0.35} />
  );

  if (reduce || !active) {
    return (
      <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
        <rect x="28" y="64" width="144" height="14" rx="3" fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={2} />
        <rect x="42" y="44" width="116" height="14" rx="3" fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={2} />
        <rect x="56" y="24" width="88" height="14" rx="3" fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeWidth={2} />
        {connector}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: loopEase, delay: 0.4 }}
      >
        <rect x="28" y="64" width="144" height="14" rx="3" fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={2} />
      </motion.g>
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: loopEase, delay: 0.2 }}
      >
        <rect x="42" y="44" width="116" height="14" rx="3" fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={2} />
      </motion.g>
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: loopEase, delay: 0 }}
      >
        <rect x="56" y="24" width="88" height="14" rx="3" fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeWidth={2} />
      </motion.g>
      {connector}
    </svg>
  );
}

function IllustrationPrototypeIdeas({ reduce, active }: IllustrationMotionProps) {
  const leftRect = (
    <rect
      x="32"
      y="28"
      width="36"
      height="44"
      rx="4"
      fill="currentColor"
      fillOpacity={0.08}
      stroke="currentColor"
      strokeWidth={2}
      transform="rotate(-6 50 50)"
    />
  );
  const centerRect = (
    <rect x="82" y="22" width="40" height="48" rx="4" fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={2} />
  );
  const rightRect = (
    <rect
      x="130"
      y="30"
      width="38"
      height="42"
      rx="4"
      fill="currentColor"
      fillOpacity={0.07}
      stroke="currentColor"
      strokeWidth={2}
      transform="rotate(8 149 51)"
    />
  );
  const bottom = (
    <>
      <circle cx="100" cy="82" r="5" fill="none" stroke="currentColor" strokeWidth={2} />
      <path d="M76 82h48" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" opacity={0.35} />
    </>
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      {reduce || !active ? (
        <>
          {leftRect}
          {centerRect}
          {rightRect}
          {bottom}
        </>
      ) : (
        <>
          <motion.rect
            x="32"
            y="28"
            width="36"
            height="44"
            rx="4"
            fill="currentColor"
            fillOpacity={0.08}
            stroke="currentColor"
            strokeWidth={2}
            style={{ transformOrigin: '50px 50px', transformBox: 'fill-box' }}
            initial={{ rotate: -6 }}
            animate={{ rotate: [-7.5, -4.5, -7.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: loopEase }}
          />
          <motion.rect
            x="82"
            y="22"
            width="40"
            height="48"
            rx="4"
            fill="currentColor"
            fillOpacity={0.1}
            stroke="currentColor"
            strokeWidth={2}
            animate={{ opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: loopEase }}
          />
          <motion.rect
            x="130"
            y="30"
            width="38"
            height="42"
            rx="4"
            fill="currentColor"
            fillOpacity={0.07}
            stroke="currentColor"
            strokeWidth={2}
            style={{ transformOrigin: '149px 51px', transformBox: 'fill-box' }}
            initial={{ rotate: 8 }}
            animate={{ rotate: [6.5, 10.5, 6.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: loopEase }}
          />
          <motion.g
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: loopEase, delay: 0.3 }}
          >
            {bottom}
          </motion.g>
        </>
      )}
    </svg>
  );
}

function IllustrationAgent({ reduce, active }: IllustrationMotionProps) {
  const signal = (
    <>
      <path d="M132 28c12 4 20 12 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.35} />
      <path d="M142 22c18 6 30 18 36 36" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" opacity={0.25} />
    </>
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <rect x="50" y="30" width="78" height="48" rx="10" fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={2.25} />
      <path d="M89 30V18M78 18h22" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.55} />
      <circle cx="75" cy="53" r="5" fill="currentColor" fillOpacity={0.5} />
      <circle cx="103" cy="53" r="5" fill="currentColor" fillOpacity={0.5} />
      <path d="M76 66h26" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.45} />
      <path d="M128 44h26l14 16h-30l-10 8z" fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
      {reduce || !active ? signal : (
        <motion.g animate={{ opacity: [0.35, 0.85, 0.35] }} transition={{ duration: 2.2, repeat: Infinity, ease: loopEase }}>
          {signal}
        </motion.g>
      )}
    </svg>
  );
}

function IllustrationAiTraining({ reduce, active }: IllustrationMotionProps) {
  const rows = [28, 40, 52, 64];
  const nodes: [number, number][] = [
    [112, 34],
    [146, 26],
    [154, 58],
    [120, 70],
  ];

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <rect x="26" y="22" width="70" height="56" rx="7" fill="currentColor" fillOpacity={0.07} stroke="currentColor" strokeWidth={2} />
      {rows.map((y, i) => (
        <path key={y} d={`M40 ${y}h36`} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.28 + i * 0.08} />
      ))}
      <path d="M96 50h18" stroke="currentColor" strokeWidth={1.75} strokeDasharray="4 4" opacity={0.45} />
      <path d="M112 34l34-8 8 32-34 12zM112 34l42 24M146 26l-26 44" fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.34} />
      {nodes.map(([cx, cy], i) => (
        reduce || !active ? (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={5} fill="none" stroke="currentColor" strokeWidth={2} />
        ) : (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={5}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2, repeat: Infinity, ease: loopEase, delay: i * 0.15 }}
          />
        )
      ))}
      <path d="M132 82a18 18 0 0 0 32 0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.45} />
    </svg>
  );
}

function IllustrationRealEstate({ reduce, active }: IllustrationMotionProps) {
  const key = (
    <g>
      <circle cx="132" cy="36" r="8" fill="none" stroke="currentColor" strokeWidth={2} />
      <path d="M139 42l22 22M153 56l-6 6M159 62l-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <path d="M24 78h152" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.35} />
      <rect x="34" y="38" width="34" height="40" rx="3" fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={2} />
      <rect x="78" y="26" width="38" height="52" rx="3" fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={2} />
      <rect x="126" y="48" width="30" height="30" rx="3" fill="currentColor" fillOpacity={0.07} stroke="currentColor" strokeWidth={2} />
      {[46, 58, 90, 104].map((x) => (
        <path key={x} d={`M${x} 48v18`} stroke="currentColor" strokeWidth={1.5} opacity={0.35} />
      ))}
      {reduce || !active ? key : (
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: loopEase }}>
          {key}
        </motion.g>
      )}
    </svg>
  );
}

function IllustrationCodeGraph({ reduce, active }: IllustrationMotionProps) {
  const nodes: [number, number, number][] = [
    [54, 30, 8],
    [104, 22, 8],
    [146, 46, 8],
    [88, 72, 8],
  ];
  const edges = <path d="M62 29l34-5M111 27l28 16M140 51l-44 17M58 38l25 28M104 30L90 64" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" opacity={0.4} />;

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      {reduce || !active ? edges : (
        <motion.g animate={{ opacity: [0.28, 0.55, 0.28] }} transition={{ duration: 2.6, repeat: Infinity, ease: loopEase }}>
          {edges}
        </motion.g>
      )}
      {nodes.map(([cx, cy, r], i) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={r} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={2} />
          {reduce || !active ? null : (
            <motion.circle
              cx={cx}
              cy={cy}
              r={r + 5}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              opacity={0.18}
              animate={{ scale: [0.9, 1.12, 0.9] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: loopEase, delay: i * 0.16 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          )}
        </g>
      ))}
      <rect x="32" y="82" width="136" height="6" rx="3" fill="currentColor" fillOpacity={0.14} />
    </svg>
  );
}

function IllustrationErp({ reduce, active }: IllustrationMotionProps) {
  const tiles = [
    [44, 22],
    [82, 22],
    [120, 22],
    [44, 48],
    [82, 48],
    [120, 48],
    [44, 74],
    [82, 74],
    [120, 74],
  ];

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <rect x="34" y="14" width="124" height="78" rx="10" fill="currentColor" fillOpacity={0.04} stroke="currentColor" strokeWidth={2} />
      {tiles.map(([x, y], i) => {
        const selected = i === 4;
        const tile = (
          <rect
            x={x}
            y={y}
            width="24"
            height="16"
            rx="4"
            fill="currentColor"
            fillOpacity={selected ? 0.18 : 0.08}
            stroke="currentColor"
            strokeWidth={selected ? 2.25 : 1.5}
          />
        );
        return reduce || !active || !selected ? (
          <g key={`${x}-${y}`}>{tile}</g>
        ) : (
          <motion.g key={`${x}-${y}`} animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: loopEase }} style={{ transformOrigin: `${x + 12}px ${y + 8}px` }}>
            {tile}
          </motion.g>
        );
      })}
      <path d="M68 30h14M106 30h14M68 56h14M106 56h14M68 82h14M106 82h14" stroke="currentColor" strokeWidth={1.25} opacity={0.28} />
    </svg>
  );
}

function IllustrationCommunity({ reduce, active }: IllustrationMotionProps) {
  const people: [number, number][] = [
    [62, 30],
    [122, 30],
    [148, 62],
    [92, 78],
    [36, 62],
  ];

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <circle cx="92" cy="52" r="22" fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeWidth={1.75} strokeDasharray="4 4" opacity={0.45} />
      <path d="M92 42c9 0 16 7 16 16H76c0-9 7-16 16-16z" fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeWidth={2} />
      <circle cx="92" cy="35" r="7" fill="none" stroke="currentColor" strokeWidth={2} />
      {people.map(([cx, cy], i) => (
        reduce || !active ? (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={5} fill="none" stroke="currentColor" strokeWidth={1.75} opacity={0.55} />
            <path d={`M${cx - 8} ${cy + 12}c2-6 14-6 16 0`} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" opacity={0.55} />
          </g>
        ) : (
          <motion.g key={`${cx}-${cy}`} animate={{ opacity: [0.48, 0.9, 0.48] }} transition={{ duration: 2.2, repeat: Infinity, ease: loopEase, delay: i * 0.14 }}>
            <circle cx={cx} cy={cy} r={5} fill="none" stroke="currentColor" strokeWidth={1.75} />
            <path d={`M${cx - 8} ${cy + 12}c2-6 14-6 16 0`} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
          </motion.g>
        )
      ))}
    </svg>
  );
}

function IllustrationRefugee({ reduce, active }: IllustrationMotionProps) {
  const route = <path d="M44 68c18-20 42-10 58-28 14-16 34-14 52 4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeDasharray="5 5" opacity={0.45} />;

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <circle cx="72" cy="48" r="30" fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeWidth={2} />
      <path d="M44 48h56M72 18c-10 12-10 48 0 60M72 18c10 12 10 48 0 60" fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.35} />
      {reduce || !active ? route : (
        <motion.g animate={{ opacity: [0.3, 0.65, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, ease: loopEase }}>
          {route}
        </motion.g>
      )}
      <path d="M122 66c6-8 18-8 24 0M134 52v20M146 66c6-8 18-8 24 0M158 52v20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.65} />
      <circle cx="134" cy="45" r="6" fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx="158" cy="45" r="6" fill="none" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function IllustrationReel({ reduce, active }: IllustrationMotionProps) {
  const sprockets = (
    <>
      {[44, 60, 76, 92, 108, 124, 140, 156].map((x) => (
        <rect key={`top-${x}`} x={x} y={22} width="8" height="6" rx="1.5" fill="currentColor" fillOpacity={0.5} />
      ))}
      {[44, 60, 76, 92, 108, 124, 140, 156].map((x) => (
        <rect key={`bot-${x}`} x={x} y={72} width="8" height="6" rx="1.5" fill="currentColor" fillOpacity={0.5} />
      ))}
    </>
  );
  const playTriangle = (
    <path d="M92 42l24 14-24 14z" fill="currentColor" fillOpacity={0.18} stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
  );
  const clockArc = <path d="M150 36a18 18 0 1 1-13 30" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.5} />;
  const clockHand = <path d="M150 56v-12M150 56l9 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />;

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <rect x="32" y="30" width="140" height="40" rx="4" fill="currentColor" fillOpacity={0.06} stroke="currentColor" strokeWidth={2} />
      {sprockets}
      {reduce || !active ? playTriangle : (
        <motion.g animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.2, repeat: Infinity, ease: loopEase }}>
          {playTriangle}
        </motion.g>
      )}
      <circle cx="150" cy="56" r="14" fill="currentColor" fillOpacity={0.08} stroke="currentColor" strokeWidth={2} />
      {clockArc}
      {reduce || !active ? clockHand : (
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '150px 56px' }}
        >
          {clockHand}
        </motion.g>
      )}
    </svg>
  );
}

function IllustrationTicket({ reduce, active }: IllustrationMotionProps) {
  const barcode = (
    <>
      {[70, 76, 84, 94, 102, 110].map((x, i) => (
        <path key={x} d={`M${x} 54v16`} stroke="currentColor" strokeWidth={i % 2 === 0 ? 2 : 1.25} opacity={0.5} />
      ))}
    </>
  );

  return (
    <svg viewBox="0 0 200 100" aria-hidden {...svgNs}>
      <path
        d="M36 32h128v15a10 10 0 0 0 0 20v15H36V67a10 10 0 0 0 0-20z"
        fill="currentColor"
        fillOpacity={0.08}
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinejoin="round"
      />
      <path d="M126 36v42" stroke="currentColor" strokeWidth={1.75} strokeDasharray="4 5" opacity={0.45} />
      <path d="M58 44h48" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.45} />
      {reduce || !active ? barcode : (
        <motion.g animate={{ opacity: [0.35, 0.85, 0.35] }} transition={{ duration: 1.8, repeat: Infinity, ease: loopEase }}>
          {barcode}
        </motion.g>
      )}
      <circle cx="146" cy="57" r="9" fill="none" stroke="currentColor" strokeWidth={2} opacity={0.5} />
    </svg>
  );
}

export interface ProjectCardIllustrationProps {
  kind: ProjectIllustrationKind;
  className?: string;
}

export const ProjectCardIllustration: React.FC<ProjectCardIllustrationProps> = ({ kind, className }) => {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });
  const active = !reduce && isInView;

  const svg = useMemo(() => {
    switch (kind) {
      case 'neural':
        return <IllustrationNeural reduce={reduce} active={active} />;
      case 'educationWeb':
        return <IllustrationEducationWeb reduce={reduce} active={active} />;
      case 'arcadeGame':
        return <IllustrationArcadeGame reduce={reduce} active={active} />;
      case 'cloudPipeline':
        return <IllustrationCloudPipeline reduce={reduce} active={active} />;
      case 'multiLayerApp':
        return <IllustrationMultiLayer reduce={reduce} active={active} />;
      case 'prototypeIdeas':
        return <IllustrationPrototypeIdeas reduce={reduce} active={active} />;
      case 'agent':
        return <IllustrationAgent reduce={reduce} active={active} />;
      case 'aiTraining':
        return <IllustrationAiTraining reduce={reduce} active={active} />;
      case 'realEstate':
        return <IllustrationRealEstate reduce={reduce} active={active} />;
      case 'codeGraph':
        return <IllustrationCodeGraph reduce={reduce} active={active} />;
      case 'erp':
        return <IllustrationErp reduce={reduce} active={active} />;
      case 'community':
        return <IllustrationCommunity reduce={reduce} active={active} />;
      case 'refugee':
        return <IllustrationRefugee reduce={reduce} active={active} />;
      case 'ticket':
        return <IllustrationTicket reduce={reduce} active={active} />;
      case 'reel':
        return <IllustrationReel reduce={reduce} active={active} />;
      default: {
        const _exhaustive: never = kind;
        return _exhaustive;
      }
    }
  }, [kind, reduce, active]);

  return (
    <div ref={ref} className={className ?? ''} role="img" aria-hidden>
      {svg}
    </div>
  );
};
