"use client";

import { type CSSProperties, type MouseEvent, type ReactNode } from "react";

type Props = {
  action: (formData: FormData) => Promise<void> | void;
  confirmText: string;
  children: ReactNode;
  style?: CSSProperties;
};

export function ConfirmActionButton({
  action,
  confirmText,
  children,
  style,
}: Props) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!window.confirm(confirmText)) {
      event.preventDefault();
    }
  };

  return (
    <form action={action}>
      <button type="submit" style={style} onClick={handleClick}>
        {children}
      </button>
    </form>
  );
}
