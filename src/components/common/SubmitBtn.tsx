import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type SubmitBtnType = {
  name: string;
  pending: boolean;
};

const SubmitBtn = ({ pending, name, ...props }: SubmitBtnType) => {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          {name}...
        </>
      ) : (
        name
      )}
    </Button>
  );
};

export default SubmitBtn;
