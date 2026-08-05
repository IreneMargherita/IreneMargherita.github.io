interface Props {
  /** mono kicker rendered like a code comment, e.g. "01. about" */
  code: string;
  title: string;
  lead?: string;
}

export default function SectionHeading({ code, title, lead }: Props) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 font-mono text-sm text-sunshine-500">
        <span className="text-sunshine-700">{'//'}</span> {code}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-mist-100 sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 text-[15px] leading-relaxed text-mist-400">{lead}</p>}
    </div>
  );
}
