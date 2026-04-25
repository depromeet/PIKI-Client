'use client';

import Matter from 'matter-js';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { MockProductT } from '@/consts/mockProducts';

const ITEM_SIZE = 81.421;

type PositionT = {
  x: number;
  y: number;
};

type FloatingProductsProps = {
  products: MockProductT[];
};

export default function FloatingProducts({ products }: FloatingProductsProps) {
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

    // 벽 생성 — radius만큼 안쪽에 배치해 아이템이 경계에 걸쳐 잘리지 않도록 함
    const walls = [
      Matter.Bodies.rectangle(width / 2, radius - wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height - radius + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(radius - wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Matter.Bodies.rectangle(width - radius + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ];

    // 상품 원형 바디 생성 (벽을 radius만큼 안쪽으로 배치해 클리핑 방지)
    const bodies = products.map((_, i) => {
      const angle = (i / products.length) * Math.PI * 2;
      const x = width / 2 + Math.cos(angle) * (width / 4);
      const y = height / 2 + Math.sin(angle) * (height / 4);
      const body = Matter.Bodies.circle(x, y, radius, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
      });
      const speed = 1.5;
      const dir = (Math.random() - 0.5 > 0 ? 1 : -1);
      Matter.Body.setVelocity(body, {
        x: dir * speed * (0.5 + Math.random() * 0.5),
        y: (Math.random() - 0.5) * speed * 2,
      });
      return body;
    });

    Matter.World.add(engine.world, [...walls, ...bodies]);

    // 초기 위치 설정
    setPositions(bodies.map((b) => ({ x: b.position.x - radius, y: b.position.y - radius })));

    const MIN_SPEED = 1.1;
    const tick = () => {
      Matter.Engine.update(engine, 1000 / 60);

      // 에너지 손실로 멈추지 않도록 최소 속도 유지
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

      setPositions(bodies.map((b) => ({ x: b.position.x - radius, y: b.position.y - radius })));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
    };
  }, [products]);

  return (
    <div ref={containerRef} className="relative flex-1 overflow-hidden">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="absolute overflow-hidden"
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            borderRadius: '16.284px',
            border: '3.257px solid #FFF',
            boxShadow: '0 0 6.514px 0 rgba(0, 0, 0, 0.24)',
            left: positions[i]?.x ?? 0,
            top: positions[i]?.y ?? 0,
          }}
        >
          <Image
            src={product.imageUrl}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
