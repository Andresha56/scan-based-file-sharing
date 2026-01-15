import { FC, useCallback } from "react";
import "./user-identifier.scss";
import FileImage from "@assets/file.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { TextBox } from "@components/Text-box";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserSchema, UserSchematype } from "./userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/Button";
import { registerUser } from "@query/index";
import { useMutation } from "@tanstack/react-query";

const UserIdentifierForm: FC = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<UserSchematype>({
    defaultValues: { name: "" },
    resolver: zodResolver(UserSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
  });
  const onSubmit: SubmitHandler<UserSchematype> = useCallback(
    async ({ name }) => {
      if (!shopId) return;
      try {
        const { room ,_id } = await mutateAsync({ name, shopId });
        navigate(
          `/user/dashboard?senderId=${_id}&receiverId=${shopId}&roomId=${room?._id}`
        );
      } catch (error: any) {
        if (error?.response?.status === 409) {
          setError("name", { message: "User with this name already exists" });
        }
      }
    },
    [shopId, navigate, mutateAsync, setError]
  );


  return (
    <section className="user-identifier-wrapper">
      <div className="file-image-wrapper">
        <img src={FileImage} alt="File" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextBox
                placeholder="Enter name"
                label="Name"
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>

        {errors.name && <p className="error mt-10">{errors.name.message}</p>}
      </form>
    </section>
  );
};

export default UserIdentifierForm;
