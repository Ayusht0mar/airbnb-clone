"use client"
import { FC } from "react"
import { signIn } from "next-auth/react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Modal from "./Modal"
import Heading from "@/components/Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "@/components/ui/Button"
import useAuthModal from "@/app/hooks/useAuthModal"
import { useRouter } from "next/navigation"


const AuthModal = ({}) => {
  const router = useRouter()

  const authModal = useAuthModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success("Logged in")
        router.refresh()
        authModal.onClose()
      }
      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input type="email" id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div
      className="
      flex flex-col gap-4 mt-3
    "
    >
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn("github")} />
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={authModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={authModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default AuthModal