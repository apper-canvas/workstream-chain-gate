import { useEffect } from "react";

const PromptPassword = () => {
  useEffect(() => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showPromptPassword("#authentication-prompt-password");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div id="authentication-prompt-password" className="bg-white mx-auto w-[400px] max-w-full p-10 rounded-2xl shadow-card"></div>
    </div>
  );
};

export default PromptPassword;