import { usePageTitle } from '../hooks/usePageTitle';
import { projects, projectsNote } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  usePageTitle('Projects');

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading
          code="02. projects"
          title="Original contributions"
          lead="The systems that make up my proprietary trading platform, plus supporting tools. Each card lists the outcome that matters, not just the tech."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <p className="mt-10 max-w-2xl rounded-xl2 border border-sunshine-900 bg-sunshine-900/20 p-4 font-mono text-[13px] leading-relaxed text-mist-300">
          <span className="text-sunshine-500">note:</span> {projectsNote}
        </p>
      </div>
    </section>
  );
}
