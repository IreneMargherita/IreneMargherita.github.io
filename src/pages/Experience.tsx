import { usePageTitle } from '../hooks/usePageTitle';
import { experience } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import Timeline from '../components/Timeline';

export default function Experience() {
  usePageTitle('Experience');

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading
          code="03. experience"
          title="Where I've built"
          lead="Roles, responsibilities, and the measurable difference I made in each — most recent first."
        />
        <div className="max-w-3xl">
          <Timeline items={experience} />
        </div>
      </div>
    </section>
  );
}
