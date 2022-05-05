type ButtonProps = {
  children: string;
  type: 'primary' | 'secondary';
  href: string,
};

export function Anchor({ children, type, href }: ButtonProps) {
  if (type === 'primary') {
    return (
      <a
        href={href}
        className="inline-block px-8 py-3 md:text-lg border border-transparent text-base font-medium rounded-md text-teal-100 bg-teal-700 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="inline-block px-8 py-3 md:text-lg border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      {children}
    </a>
  );
}
