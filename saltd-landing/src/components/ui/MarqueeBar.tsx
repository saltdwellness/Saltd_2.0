export function MarqueeBar({
  text,
  bg = 'bg-saltd-lime',
  textColor = 'text-saltd-black',
}: {
  text: string;
  bg?: string;
  textColor?: string;
}) {
  const repeated = Array(8).fill(text).join('   ·   ');
  return (
    <div className={`${bg} ${textColor} h-full flex items-center overflow-hidden text-sm font-semibold font-body`}>
      <div className="flex whitespace-nowrap animate-marquee">
        <span>{repeated}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span aria-hidden="true">{repeated}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
