import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | הספר - אומנות הקשר",
    default: "הספר ״אומנות הקשר״",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
