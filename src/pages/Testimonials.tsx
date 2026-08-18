import { usePageTitle } from '../hooks/usePageTitle';
import { testimonials } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import TestimonialCard from '../components/TestimonialCard';

export default function Testimonials() {
  usePageTitle('Testimonials');

  return (
    <section className="section">
      <div className="container-content">
        <SectionHeading code="06. testimonials" title="In their words" lead={testimonials.intro} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.items.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
