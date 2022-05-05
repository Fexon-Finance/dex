import type { ReactNode } from 'react';

type LayoutProps = {
  readonly id: string;
  readonly children: ReactNode;
};

export function SectionTemplate({ id, children }: LayoutProps) {
  return (
    <section id={id} className="h-full max-w-6xl mx-auto">
      {children}
    </section>
  );
}
