import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
};

const inputStyling = "border-2 border-primary rounded-sm p-2 w-full placeholder:italic";


function FormEmail() {

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs>({
    mode: "onChange",
    criteriaMode: "all"
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch(`/api/contact`, {
      method: 'post',
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    reset({ name: '', email: '', phone: '', subject: '', message: '' });
  }, [isSubmitSuccessful]);

  return (
    <div>
      <h1 className='w-full mb-4'>TEXT ME IN A FORM BELOW!</h1>
      <p className='mb-4'>Address: 53 Dimitri Uznadze St, Tbilisi 0163</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start w-full">
        <div className='grid grid-cols-2 gap-4 mb-4 w-full'>
          <div className='relative'>
            <input className={inputStyling} placeholder={'Name'} {...register("name", { required: true })} />
            {errors.name && <span className='absolute top-0 left-[14px]'>This field is required</span>}
          </div>
          <input className={inputStyling} placeholder='Email' {...register("email", { required: true })} />
          <input className={inputStyling} placeholder='Phone' {...register("phone", {
            required: true,
            pattern: {
              value: /\d+/,
              message: "This input is number only."
            }
          })} />
          <input className={inputStyling} placeholder='Subject' {...register("subject", { required: true })} />
        </div>
        <textarea className={`${inputStyling} mb-4 w-full h-[100px]`} placeholder='Message' {...register("message", { required: true })} />
        <button type="submit" className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center font-regular">SEND MESSAGE</button>
      </form>
    </div>
  )
}

export default FormEmail


