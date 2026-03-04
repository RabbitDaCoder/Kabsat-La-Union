import { Toaster as Sonner } from "sonner";

/**
 * Toast notification component using Sonner
 * Styled for luxury resort aesthetic
 */
const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-ocean-950 group-[.toaster]:border-ocean-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-ocean-600",
          actionButton: "group-[.toast]:bg-ocean-950 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-ocean-100 group-[.toast]:text-ocean-600",
          success:
            "group-[.toaster]:border-green-200 group-[.toaster]:bg-green-50",
          error: "group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
