import { AuditTeaser } from "@/components/AuditTeaser";
import { BlogTeaser } from "@/components/BlogTeaser";
import { LensCta } from "@/components/LensCta";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Marquee } from "@/components/Marquee";
import { Packages } from "@/components/Packages";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Statement } from "@/components/Statement";
import { Works } from "@/components/Works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Statement />
      <Works />
      <Industries />
      <Packages />
      <Process />
      <AuditTeaser />
      <BlogTeaser />
      <LensCta />
    </>
  );
}
