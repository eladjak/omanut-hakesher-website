import { AccessGate } from "@/components/book/AccessGate";

export default function Chapter6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccessGate>{children}</AccessGate>;
}
