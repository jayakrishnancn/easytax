interface DescriptionProps {
  title: string;
  details?: string;
}
function Description(props: DescriptionProps) {
  const { title, details } = props;
  return (
    <div>
      <div>{title}</div>
      <div className="text-gray-400 text-xs">{details}</div>
    </div>
  );
}

export default Description;
