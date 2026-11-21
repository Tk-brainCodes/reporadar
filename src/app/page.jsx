import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { RepositoryExplorer } from "@/components/RepositoryExplorer";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { UseCases } from "@/components/UseCases";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <RepositoryExplorer />
      <HowItWorks />
      <Features />
      <UseCases />
      <FinalCTA />
    </>
  );
}
