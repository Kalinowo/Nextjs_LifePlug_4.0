import Header from "@/components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Header />
      {children}
    </div>
  );
}
