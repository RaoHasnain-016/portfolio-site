import { PortfolioPage } from "@/components/PortfolioPage";
import { getSiteProfile, getSiteProjects } from "@/lib/site-data";

export default async function Home() {
  const [profile, projects] = await Promise.all([getSiteProfile(), getSiteProjects()]);

  return <PortfolioPage initialProfile={profile} initialProjects={projects} />;
}
