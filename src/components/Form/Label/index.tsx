interface LabelProps {
  htmlFor: string;
  text: string;
}

export function Label({ text, htmlFor }: LabelProps) {
  return (
    <label className='font-semibold text-sm' htmlFor={htmlFor}>
      {text}
    </label>
  );
}
