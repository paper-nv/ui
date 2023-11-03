// import Google from "../../assets/icons/Google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "animate.css";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authServices from "../../services/auth/authServices";
import PaperIcon from "../../assets/logo/paperIcon.jsx";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { Button, Card } from "antd";
import Google from "../../assets/icons/Google";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [gLoading, setgLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Must be a valid email"
      )
      .min(3, "Email must be at least 3 characters")
      .max(255)
      .required("Email address is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isLoading, mutate } = useMutation(
    (payload) => authServices.signin(payload),
    {
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "something went wrong. Please wait awhile and try again"
        );
      },
      onSuccess: (response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response?.data?.token);
          location?.state
            ? navigate(location?.state?.ref)
            : navigate("../accounts/dashboard");
        } else {
          toast.error("something went wrong. Please wait awhile and try again");
        }
      },
    }
  );

  const mutation = useMutation((payload) => authServices.google(payload), {
    onError: (error) => {
      toast.error(
        error.response.data.message ||
          "something went wrong. Please wait awhile and try again"
      );
    },
    onSuccess: ({ status, data }) => {
      console.log(data);
      if (status === 200) {
        localStorage.setItem("token", data?.token);
        location?.state
          ? navigate(location?.state?.ref)
          : navigate("../accounts/dashboard");
      } else {
        toast.error("something went wrong. Please wait awhile and try again");
      }
    },
  });

  const handleAuthWithGoogle = useGoogleLogin({
    onSuccess: (response) => mutation.mutate(response),
  });

  return (
    <>
      <title>Sign in | Payper</title>

      <div className="lg:grid  grid-cols-3  justify-center  ">
        <div className="col-span-1"></div>
        <div className="col-span-1 py-10  xl:px-10 3xl:px-24">
          <form
            onSubmit={handleSubmit((payload) => mutate(payload))}
            className="animate__animated animate__slideInUp p-4"
          >
            <Card className="bg-white p-4 auth__card rounded-2xl text-slate-700 ">
              <div className="">
                <Link to="../" className="flex items-center gap-2">
                  <PaperIcon className="text-blue-600" height="40" />
                </Link>
                <h3 className="text-2xl font-semibold text-slate-700 mt-5">
                  Log In
                </h3>
                <p className="text-slate-500 text-sm mb-10">
                  Enter your credentials to access your account
                </p>
              </div>

              <Button
                onClick={() => {
                  setgLoading(true);
                  handleAuthWithGoogle();
                }}
                className="w-full h-10 flex items-center justify-center"
                icon={<Google height={14} />}
              >
                {gLoading ? <LoadingOutlined /> : "Continue with Google"}
              </Button>

              <p className="py-6 text-slate-400 text-center font-thin">OR</p>

              <div className="form-group">
                <label className="">Email address</label>
                <input
                  placeholder="Enter email address"
                  {...register("email")}
                />
                {<h2 className="error-message">{errors?.email?.message}</h2>}
              </div>

              <div className="form-group ">
                <label className="">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  {...register("password")}
                  placeholder="password"
                  {...register("password")}
                />
                <div className="pl-[90%]">
                  <span
                    className="text-base muted hover:text-blue-800 absolute mt-[-34px]"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <EyeInvisibleOutlined />
                    ) : (
                      <EyeOutlined />
                    )}
                  </span>
                </div>
                {<h2 className="error-message">{errors?.password?.message}</h2>}
              </div>

              <div className="mt-5 flex justify-end">
                {isLoading ? (
                  <Button
                    type="primary"
                    htmlType="button"
                    className="primary w-full h-10 "
                  >
                    {" "}
                    <LoadingOutlined />{" "}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-10"
                  >
                    Sign in
                  </Button>
                )}
              </div>
              <p className="mt-[20px]">
                Don&apos;t have an account?{" "}
                <Link className="text-sm" to="/sign-up">
                  Sign up
                </Link>
              </p>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
