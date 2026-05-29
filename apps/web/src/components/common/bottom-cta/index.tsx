type BottomCtaProps = {
  children: React.ReactNode;
};

function BottomCta({ children }: BottomCtaProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 mx-auto flex w-full max-w-120 items-center gap-2.5 px-5 pt-3 pb-5">
      {children}
    </div>
  );
}

export default BottomCta;
