interface TypographyProps {
  children: React.ReactNode;
}

function Typography({ children }: TypographyProps) {
  return (
    <div>
      <h1 className="text-lg font-semibold leading-7">{children}</h1>
    </div>
  );
}
export default Typography;
