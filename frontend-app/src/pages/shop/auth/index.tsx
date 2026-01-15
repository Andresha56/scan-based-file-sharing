import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, AuthSchema } from "./auth-schema";
import { useCallback, useState } from "react";
import { TextBox } from "@components/Text-box";
import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";
import { LabelInfo } from "@components/label-info";
import { logIn, registerShop } from "@query/index";
import { authStore } from "@store/auth.store";

enum AuthMode {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
}

const SignUp = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.SIGN_UP);
  const { setAuth } = authStore();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  const onSignUpOrSignIn: SubmitHandler<AuthFormData> = useCallback(
    async (data: AuthFormData) => {
      if (mode === AuthMode.SIGN_UP) {
        try {
          const response = await registerShop(data);

          if (response.accessToken) {
            setAuth(response.accessToken, response.shop);
          }
          navigate("/shop/dashboard");
        } catch (error: any) {
          alert(
            error?.response?.data?.message ||
            "Failed to sign up. Please try again."
          );
        }
      }
      else {
        try {
          const response = await logIn(data);
          if (response) {
            setAuth(response.accessToken, response.shop);
            navigate("/shop/dashboard");
          }
        }
        catch (error: any) {
          alert(
            error?.response?.data?.message ||
            "Failed to sign In. Please try again."
          );
        }
      }
    },
    [navigate, mode]
  );

  const handleAuthModeChange = (nextMode: AuthMode) => {
    setMode(nextMode);
    reset();
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="bg-[#eceff1] p-[30px] rounded-md shadow-sm">
        <div className="text-left mb-[10px]">
          <h1 className="font-semibold text-gray-800 mb-[5px]">
            {mode === AuthMode.SIGN_UP ? "Welcome" : "Welcome back"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === AuthMode.SIGN_UP
              ? "Create your shop to start receiving files securely"
              : "Sign in to access your shop dashboard"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSignUpOrSignIn)} className="space-y-5">
          <LabelInfo text="Shop Name" />
          <Controller
            control={control}
            name="shopName"
            render={({ field }) => (
              <TextBox
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter shop name"
                containerClassName="mb-[10px]"
              />
            )}
          />
          {errors.shopName && (
            <p className="error mb-[10px]">{errors.shopName.message}</p>
          )}

          <LabelInfo text="Password" />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextBox
                onChange={field.onChange}
                value={field.value}
                placeholder="Enter your password"
                type="password"
                containerClassName="mb-[10px]"
              />
            )}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <Button variant="primary" type="submit" className="mt-[10px]">
            {mode === AuthMode.SIGN_UP ? "Sign Up" : "Sign In"}
          </Button>

          <div className="text-center">
            {mode === AuthMode.SIGN_UP ? (
              <div className="flex mt-[10px]">
                <p className="text-sm text-gray-600">Already have an account?</p>
                <Button
                  type="button"
                  variant="transparent"
                  size="small"
                  className="ml-[5px]"
                  onClick={() => handleAuthModeChange(AuthMode.SIGN_IN)}
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <div className="flex mt-[10px]">
                <p className="text-sm text-gray-600">Don’t have an account?</p>
                <Button
                  type="button"
                  variant="transparent"
                  size="small"
                  className="ml-[5px]"
                  onClick={() => handleAuthModeChange(AuthMode.SIGN_UP)}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;