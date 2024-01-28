"use client";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useFormStatus } from "react-dom";
import { type VariantProps } from "class-variance-authority";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  defaultName: string;
  onLoadingName: string;
}

// type SubmitBtnType = {
//   defaultName: string;
//   onLoadingName: string;
// };

// const SubmitBtn = ({ defaultName, onLoadingName, ...props }: SubmitBtnType) => {
//   const { pending } = useFormStatus();

//   return (
//     <Button type="submit" disabled={pending} {...props}>
//       {pending ? (
//         <>
//           <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//           {onLoadingName}
//         </>
//       ) : (
//         defaultName
//       )}
//     </Button>
//   );
// };

const SubmitBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ defaultName, onLoadingName, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <Button ref={ref} type="submit" disabled={pending} {...props}>
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            {onLoadingName}
          </>
        ) : (
          defaultName
        )}
      </Button>
    );
  }
);

export default SubmitBtn;
