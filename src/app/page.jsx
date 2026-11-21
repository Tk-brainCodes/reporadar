import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { RepositoryExplorer } from "@/components/RepositoryExplorer";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { UseCases } from "@/components/UseCases";
import { Methodology } from "@/components/Methodology";
import { FinalCTA } from "@/components/FinalCTA";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollReveal><Stats /></ScrollReveal>
      <ScrollReveal><RepositoryExplorer /></ScrollReveal>
      <ScrollReveal><HowItWorks /></ScrollReveal>
      <ScrollReveal><Features /></ScrollReveal>
      <ScrollReveal><UseCases /></ScrollReveal>
      <ScrollReveal><Methodology /></ScrollReveal>
      <ScrollReveal><FinalCTA /></ScrollReveal>
    </>
  );
}
