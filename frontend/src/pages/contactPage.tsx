import ResponsiveNavBar from "../components/responsiveNavBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosConfig } from "../misc/axiosConfig";
import { ContactForm } from "../types";
import { PageContainer } from "../components/pageContainer";
import { H2Tags } from "../components/headers";
import { LoadingAnimation } from "../components/svg";
import { toastify } from "../components/toastify";

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();
  const submitForm: SubmitHandler<ContactForm> = (data) => {
    axiosConfig
      .post("/contact", data)
      .then((response) => {
        if (response.status === 200) {
          toastify({ type: "success", text: "Message sent successfully" });
        }
      })
      .catch(() => {
        toastify({
          type: "success",
          text: "An Error occuued while trying to send your message. Please retry",
        });
      });
  };
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="h-screen mt-auto flex justify-center items-center">
        <div className=" xxs:w-[90%] md:w-[60%] lg:w-[40%] bg-slate-50 shadow-lg p-5">
          <div className="w-3/4 h-full mr-auto ml-auto">
            <H2Tags text="Contact Us" />
            <div className="mt-10">
              <form
                method="post"
                action="#"
                onSubmit={handleSubmit(submitForm)}
              >
                <div className="mb-3">
                  <input
                    {...register("name", {
                      required: "This field is required",
                    })}
                    type="text"
                    placeholder="Names"
                    className="bg-slate-50 w-full p-2 rounded-none border-2 border-offBlue active:border-0 focus:border-0 focus:outline focus:outline-green-200"
                    name="name"
                  ></input>
                  {errors.name && (
                    <div className="text-red-500 text-sm">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    {...register("email", {
                      required: "This field is required",
                      validate: (mail) => {
                        return (
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                            mail
                          ) || "Email is invalid"
                        );
                      },
                    })}
                    type="email"
                    placeholder="Email address"
                    className="bg-slate-50 w-full p-2 rounded-none border-2 border-offBlue active:border-0 focus:border-0 focus:outline focus:outline-green-200 text-black"
                    name="email"
                  ></input>
                  {errors.email && (
                    <div className="text-red-500 text-sm">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    {...register("summary", {
                      required: "Please provide a summary of your complaint",
                    })}
                    type="text"
                    placeholder="Complaint Summary"
                    className="bg-slate-50 w-full p-2 rounded-none border-2 border-offBlue active:border-0 focus:border-0 focus:outline focus:outline-green-200"
                    name="summary"
                  ></input>
                  {errors.summary && (
                    <div className="text-red-500 text-sm">
                      {errors.summary.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <textarea
                    {...register("message", {
                      required: "Please provide a detailed message",
                    })}
                    placeholder="How can we be of help?"
                    className="bg-slate-50 w-full p-2 rounded-none border-2 border-offBlue active:border-0 focus:border-0 focus:outline focus:outline-green-200"
                    name="message"
                  ></textarea>
                  {errors.message && (
                    <div className="text-red-500 text-sm">
                      {errors.message.message}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-deepBlue hover:bg-blue-400 transition-all duration-500 p-2 text-slate-50 w-full inline-block rounded-none text-center"
                >
                  {isSubmitting ? <LoadingAnimation /> : "Send"}
                </button>
              </form>
            </div>
            <div className="mt-10">
              <p className="text-black text-base text-center raleway">
                Sometimes, you just want to talk to a human. We get it. We're
                here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
