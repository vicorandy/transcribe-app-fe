import Image from "next/image";
import { FormEvent, useState } from "react";
import { useCreateNewUser } from "@/libs/hooks/userHooks";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import LoadingSpinner from "@/componets/loadingSpinner";

interface FormData {
  // Step 1
  firstName?: string;
  lastName?: string;
  transcriptionUse?: string;
  // Step 2
  dob?: string;
  email?: string;
  // Step 3
  password?: string;
  confirmPassword?: string;
}

// Create a reusable Progress component
const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
    <article className="flex flex-row items-center justify-center space-x-2 sm:space-x-16">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center space-x-2 sm:space-x-16">
          <menu
            className={`w-[56px] sm:w-[70px] h-[56px] sm:h-[70px] ${
              step <= currentStep ? "bg-[#101828]" : "bg-[#CFD1D4]"
            } text-white flex items-center justify-center rounded-full font-extrabold text-[28px]`}
          >
            {step}
          </menu>
          {step < 3 && (
            <div className="relative w-[66px] sm:w-[82px] h-[16px]">
              <Image
                src={step < currentStep ? "/icon-arrow-16-dark.svg" : "/icon-arrow-17-gray.svg"}
                alt={`icon-arrow-${step < currentStep ? "16-dark" : "17-gray"}`}
                fill
                className="object-contain"
                sizes="(min-width: 360px) 100vw"
              />
            </div>
          )}
        </div>
      ))}
    </article>
  );

export const SignUpFlow1 = ({
  onSubmit,
  initialData
}: {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formValues: FormData = {};
    formData.forEach((value, key) => {
      formValues[key as keyof FormData] = value.toString();
    });
    onSubmit(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-around w-full max-w-[800px] min-h-screen h-full py-4 bg-white"
    >
      <ProgressIndicator currentStep={1} />
      <article className="w-[330px] sm:w-[626px] h-[388px] sm:h-[485px] flex flex-col justify-around items-start">
        <p className="font-semibold text-[18px] sm:text-[34px]">
          Can you Tell us a little about yourself?
        </p>
        <aside className="flex flex-col justify-center items-start h-[95px] w-full">
          <label htmlFor="firstName" className="font-medium text-[18px] sm:text-[20px] text-[#101828]">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={initialData.firstName}
            placeholder="Enter Your First Name"
            className="h-[59px] rounded-[5px] border border-[#686868] w-full pl-2 font-normal text-[16px] sm:text-[18px]"
            required
          />
        </aside>
        <aside className="flex flex-col justify-center items-start h-[95px] w-full">
          <label htmlFor="lastName" className="font-medium text-[18px] sm:text-[20px] text-[#101828]">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={initialData.lastName}
            placeholder="Enter Your Last Name"
            className="h-[59px] rounded-[5px] border border-[#686868] w-full pl-2 font-normal text-[16px] sm:text-[18px]"
            required
          />
        </aside>
        <aside className="flex flex-col justify-center items-start h-[95px] w-full">
          <label htmlFor="transcriptionUse" className="font-medium text-[18px] sm:text-[20px] text-[#101828]">
            What will you primarily use the transcription app for?
          </label>
          <input
            type="text"
            id="transcriptionUse"
            name="transcriptionUse"
            defaultValue={initialData.transcriptionUse}
            placeholder="Enter Your transcription use"
            className="h-[59px] rounded-[5px] border border-[#686868] w-full pl-2 font-normal text-[16px] sm:text-[18px]"
            required
          />
        </aside>
      </article>
      <button
        type="submit"
        className="bg-[#101828] hover:bg-[#344054] transition-colors duration-200 cursor-pointer text-white w-[330px] sm:w-[626px] h-[52px] rounded-[12px] flex items-center justify-center font-bold text-[20px] sm:text-[24px]"
      >
        Continue
      </button>
    </form>
  );
};

export const SignUpFlow2 = ({
  onSubmit,
  initialData
}: {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formValues: FormData = {};
    formData.forEach((value, key) => {
      formValues[key as keyof FormData] = value.toString();
    });
    onSubmit(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-around w-full max-w-[800px] min-h-screen h-full py-4 bg-white"
    >
      <ProgressIndicator currentStep={2} />
      <article className="w-[330px] sm:w-[626px] h-[388px] sm:h-[485px] flex flex-col justify-around items-start">
        <p className="font-semibold text-[18px] sm:text-[34px]">
          Let us know your DOB and Email
        </p>
        <aside className="flex flex-col justify-center items-start h-[95px] w-full">
          <label htmlFor="dob" className="font-medium text-[18px] sm:text-[20px] text-[#101828]">
            What is your Date of Birth?
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            defaultValue={initialData.dob}
            className="h-[59px] rounded-[5px] border border-[#686868] w-full pl-2 font-normal text-[16px] sm:text-[18px]"
            required
          />
        </aside>
        <aside className="flex flex-col justify-center items-start h-[95px] w-full">
          <label htmlFor="email" className="font-medium text-[18px] sm:text-[20px] text-[#101828]">
            What is your Email Address?
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={initialData.email}
            placeholder="Email address?"
            className="h-[59px] rounded-[5px] border border-[#686868] w-full pl-2 font-normal text-[16px] sm:text-[18px]"
            required
          />
        </aside>
      </article>
      <button
        type="submit"
        className="bg-[#101828] hover:bg-[#344054] transition-colors duration-200 cursor-pointer text-white w-[330px] sm:w-[626px] h-[52px] rounded-[12px] flex items-center justify-center font-bold text-[20px] sm:text-[24px]"
      >
        Continue
      </button>
    </form>
  );
};

export const SignUpFlow3 = ({
  onSubmit,
  initialData
}: {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}) => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formValues: FormData = {};
    formData.forEach((value, key) => {
      formValues[key as keyof FormData] = value.toString();
    });
    
    // Validate passwords match
    if (formValues.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    onSubmit(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-around w-full max-w-[800px] min-h-screen h-full py-4 bg-white"
    >
      <ProgressIndicator currentStep={3} />
      <article className="w-[330px] sm:w-[626px] h-[388px] sm:h-[485px] flex flex-col justify-around items-start">
        <p className="font-semibold text-[18px] sm:text-[34px]">
          Can you Tell us about Slide three?
        </p>
        <aside className="flex flex-col justify-center items-start h-[95px] w-full">
          <label htmlFor="password" className="font-medium text-[18px] sm:text-[20px] text-[#101828]">
            Please enter your Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={initialData.password}
            minLength={8}
            placeholder="Your Password?"
            className="h-[59px] rounded-[5px] border border-[#686868] w-full pl-2 font-normal text-[16px] sm:text-[18px]"
            required
          />
        </aside>
        <aside className="flex flex-col justify-center items-start h-[95px] w-full">
          <label htmlFor="confirmPassword" className="font-medium text-[18px] sm:text-[20px] text-[#101828]">
            Confirm your Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            defaultValue={initialData.confirmPassword}
            minLength={8}
            placeholder="Confirm Password"
            className="h-[59px] rounded-[5px] border border-[#686868] w-full pl-2 font-normal text-[16px] sm:text-[18px]"
            required
          />
        </aside>
      </article>
      <button
        type="submit"
        className="bg-[#101828] hover:bg-[#344054] transition-colors duration-200 cursor-pointer text-white w-[330px] sm:w-[626px] h-[52px] rounded-[12px] flex items-center justify-center font-bold text-[20px] sm:text-[24px]"
      >
        Complete Sign Up
      </button>
    </form>
  );
};

export default function SignUpFlow123() {

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [showLoadingSpinner,setShowLoadingSpinner] = useState<boolean>(false)
  const mutation = useCreateNewUser()
  const router = useRouter()

  const handleFormSubmit = async (stepData: FormData) => {
    try {
      const updatedFormData = { ...formData, ...stepData };
      setFormData(updatedFormData);
  
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowLoadingSpinner(true)
         const {token} = await mutation.mutateAsync(updatedFormData)
         Cookies.set('usertoken',token , {secure: true ,sameSite: 'None'});
         if(token) router.push('/dashboard')
    
        // Here you would typically send the data to your backend
      }
    } catch (error:any) {
      if(error.message){
         toast.error(error.message)
      }
    }finally{
      setShowLoadingSpinner(false)
    }
   
  };

  return (
    <section className="min-h-screen h-full w-full max-w-[1440px] flex flex-col justify-center items-center mx-auto">
      <LoadingSpinner showLoadingSpinner={showLoadingSpinner} />
      {currentStep === 1 && <SignUpFlow1 onSubmit={handleFormSubmit} initialData={formData} />}
      {currentStep === 2 && <SignUpFlow2 onSubmit={handleFormSubmit} initialData={formData} />}
      {currentStep === 3 && <SignUpFlow3 onSubmit={handleFormSubmit} initialData={formData} />}
    </section>
  );
}