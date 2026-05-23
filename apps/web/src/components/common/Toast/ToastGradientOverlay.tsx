type ToastGradientOverlayProps = {
  isVisible: boolean;
};

function ToastGradientOverlay({ isVisible }: ToastGradientOverlayProps) {
  return (
    <div
      className={`pointer-events-none w-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        height: '84.291px',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
      }}
    />
  );
}

export default ToastGradientOverlay;
