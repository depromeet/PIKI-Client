'use client';

import Matter from 'matter-js';
import { useEffect, useRef, useState } from 'react';

const ITEM_SIZE = 81.421;

type PositionT = {
  x: number;
  y: number;
};

export type FloatingItemT = {
  id: string;
  emoji?: string;
  imageUrl?: string;
};

type FloatingProductsProps = {
  items: FloatingItemT[];
};

export default function FloatingProducts({ items }: FloatingProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<PositionT[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const radius = ITEM_SIZE / 2;
    const wallThickness = 50;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
    engineRef.current = engine;

    const walls = [
      Matter.Bodies.rectangle(width / 2, radius - wallThickness / 2, width, wallThickness, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(
        width / 2,
        height - radius + wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(radius - wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(
        width - radius + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true }
      ),
    ];

    const bodies = items.map((_, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      const x = width / 2 + Math.cos(angle) * (width / 4);
      const y = height / 2 + Math.sin(angle) * (height / 4);
      const body = Matter.Bodies.circle(x, y, radius, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
      });
      const speed = 1.5;
      const dir = Math.random() - 0.5 > 0 ? 1 : -1;
      Matter.Body.setVelocity(body, {
        x: dir * speed * (0.5 + Math.random() * 0.5),
        y: (Math.random() - 0.5) * speed * 2,
      });
      return body;
    });

    Matter.World.add(engine.world, [...walls, ...bodies]);

    setPositions(bodies.map(b => ({ x: b.position.x - radius, y: b.position.y - radius })));

    const MIN_SPEED = 1.1;
    const tick = () => {
      Matter.Engine.update(engine, 1000 / 60);

      bodies.forEach(body => {
        const { x: vx, y: vy } = body.velocity;
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed < MIN_SPEED && speed > 0) {
          Matter.Body.setVelocity(body, {
            x: (vx / speed) * MIN_SPEED,
            y: (vy / speed) * MIN_SPEED,
          });
        } else if (speed === 0) {
          const angle = Math.random() * Math.PI * 2;
          Matter.Body.setVelocity(body, {
            x: Math.cos(angle) * MIN_SPEED,
            y: Math.sin(angle) * MIN_SPEED,
          });
        }
      });

      setPositions(bodies.map(b => ({ x: b.position.x - radius, y: b.position.y - radius })));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative flex-1 overflow-hidden">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="absolute flex items-center justify-center overflow-hidden bg-white"
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            borderRadius: '16px',
            border: '3px solid #FFF',
            boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.16)',
            left: positions[i]?.x ?? 0,
            top: positions[i]?.y ?? 0,
          }}
        >
          <span className="text-[58px] leading-none">{item.emoji}</span>
        </div>
      ))}
    </div>
  );
}
