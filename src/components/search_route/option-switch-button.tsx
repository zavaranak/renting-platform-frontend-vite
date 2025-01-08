import clsx from 'clsx';

interface OptionSwitchButtonProps {
  children: React.ReactNode;
  active: boolean;
  index: number;
  trigger: () => void;
}

export default function OptionSwitchButton({
  children,
  active,
  index,
  trigger,
}: OptionSwitchButtonProps) {
  return (
    <div
      data-index={index}
      onClick={() => trigger()}
      className={clsx(
        'border-2 border-neutral_brown w-full text-center hover:bg-neutral_brown hover:text-white z-10 pt-1 pb-2 cursor-pointer',
        active || 'border-b-2 mb-[5px] bg-neutral_grey',
        active && 'border-b-0 -mb-[2px] bg-background'
      )}
    >
      {children}
    </div>
  );
}
