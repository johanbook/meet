import { FC, useEffect } from "react";
import { useNavigate } from "react-router";

import { captureException } from "@sentry/react";

import { logOut } from "src/api/auth";
import { LoadingView } from "src/views/LoadingView";

export const LogOut: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogOut = async () => {
      try {
        await logOut();
      } catch (error) {
        captureException(error);
      } finally {
        navigate("/login");
      }
    };

    handleLogOut();
  }, [navigate]);

  return <LoadingView />;
};
