vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({
      href,
      children,
    }: {
      href: string;
      children: React.ReactNode;
    }) => <a href={href}>{children}</a>,
  };
});
