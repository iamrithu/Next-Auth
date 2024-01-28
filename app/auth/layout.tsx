interface authLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: authLayoutProps) => {
  return (
    <div className="h-full  flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-50 to-sky-400 justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
