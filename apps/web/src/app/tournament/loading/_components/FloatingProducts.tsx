'use client';

import Matter from 'matter-js';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const ITEM_SIZE = 81.421;
const MIN_SPEED = 1.1;
const INITIAL_SPEED = 1.5;
const WALL_THICKNESS = 50;

type PositionT = {
  x: number;
  y: number;
};

export type FloatingItemT = {
  id: string;
  imageUrl?: string;
  emoji?: string;
};

type FloatingProductsProps = {
  items: FloatingItemT[];
};

function FloatingProducts({ items }: FloatingProductsProps) {
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

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
    engineRef.current = engine;

    const walls = [
      Matter.Bodies.rectangle(width / 2, radius - WALL_THICKNESS / 2, width, WALL_THICKNESS, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(
        width / 2,
        height - radius + WALL_THICKNESS / 2,
        width,
        WALL_THICKNESS,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(radius - WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(
        width - radius + WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
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
      const dir = Math.random() - 0.5 > 0 ? 1 : -1;
      Matter.Body.setVelocity(body, {
        x: dir * INITIAL_SPEED * (0.5 + Math.random() * 0.5),
        y: (Math.random() - 0.5) * INITIAL_SPEED * 2,
      });
      return body;
    });

    Matter.World.add(engine.world, [...walls, ...bodies]);

    setPositions(bodies.map(b => ({ x: b.position.x - radius, y: b.position.y - radius })));

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
          className="absolute flex size-[81px] items-center justify-center overflow-hidden rounded-2xl border-[3px] border-white bg-bg-layer-default shadow-[0_0_8px_0_rgba(0,0,0,0.16)]"
          style={{
            left: positions[i]?.x ?? 0,
            top: positions[i]?.y ?? 0,
          }}
        >
          {item.imageUrl ? (
            <Image src={item.imageUrl} alt="" fill sizes="81px" className="object-cover" />
          ) : (
            <span className="text-[58px] leading-none">{item.emoji}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default FloatingProducts;
