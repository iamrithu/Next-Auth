import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "./card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! something went wrong"
      backButtonlabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}>
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive text-md" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
