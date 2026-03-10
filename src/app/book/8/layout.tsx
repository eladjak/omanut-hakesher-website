import { AccessGate } from "@/components/book/AccessGate";

export default function Chapter8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccessGate>{children}</AccessGate>;
}
