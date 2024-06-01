import { cn } from "@/lib/utils"; // style class 를 병합할 때 사용
import { cva, type VariantProps } from "class-variance-authority"; // 스피너가 props 로 전달 받은 값에 따라 다양한 색상, 크기로 랜더링
import { Loader } from "lucide-react"; // lucide-react 에서 제공하는 스피너 아이콘

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
    defaultVariants: {
      size: "default",
    },
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};
