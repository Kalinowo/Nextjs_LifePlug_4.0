import Header from "@/components/header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}
