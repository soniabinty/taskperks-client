import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_image_hosting_apikey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateProfileUser } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const coins = data.role === "Worker" ? 10 : 50;

    try {
      const emailExistsResponse = await axiosPublic.post("/users/check-email", {
        email: data.email,
      });

      if (emailExistsResponse.data.exists) {
        alert("Email already exists. Please use a different email.");
        return;
      }

      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;

      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgUploadResponse = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imgUploadResponse.data.success) {
        const photoURL = imgUploadResponse.data.data.display_url;

        await updateProfileUser(data.name, photoURL);

        const userInfo = {
          name: data.name,
          email: data.email,
          role: data.role,
          coins: parseInt(coins),
          photo: photoURL,
        };

        await axiosPublic.post("/users", userInfo);
        reset();
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000); 
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="px-6 py-32 mx-auto w-11/12 text-center">
      <h2 className="text-2xl font-semibold">Let's create your account!</h2>
      <p>
        Already have an account?
        <Link className="text-green-500" to={"/login"}>
          Login!
        </Link>
      </p>
      <div className="card bg-base-100 w-full max-w-xl mx-auto text-start">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          {/* Role Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              defaultValue="default"
              {...register("role", { required: "Please select a role." })}
              className="input input-bordered"
            >
              <option disabled value="default">
                Select Role
              </option>
              <option value="Worker">Worker</option>
              <option value="Buyer">Buyer</option>
            </select>
            {errors.role && <span className="pl-1 text-red-600">{errors.role.message}</span>}
          </div>

          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required." })}
              type="text"
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && <span className="pl-1 text-red-600">{errors.name.message}</span>}
          </div>

          {/* Photo Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              {...register("image", { required: "Photo is required." })}
              type="file"
              className="file-input file-input-bordered file-input-success w-full lg:w-auto"
            />
            {errors.image && <span className="pl-1 text-red-600">{errors.image.message}</span>}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              type="email"
              placeholder="Email"
              className="input input-bordered"
            />
            {errors.email && <span className="pl-1 text-red-600">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character.",
                },
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered"
            />
            {errors.password && (
              <span className="pl-1 text-red-600">{errors.password.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn hover:bg-green-500 bg-green-500 text-white">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
