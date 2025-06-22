"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import FileUpload from "../file-upload";
import { Axis3DIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import AppRouteRouteModule from "next/dist/server/route-modules/app-route/module";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "SEVRER REQUIRED!!!!",
  }),
  imageUrl: z.string().min(1, {
    message: "IMAGE url REQUIRED!!!!",
  }),
});

const CreateServerModal = () => {
  const { type, onClose, isOpen } = useModal();

  const isModalOpen = isOpen && type === "createServer";

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isloading = form.formState.isSubmitting;

  const onSubm = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    console.log("on CLOSE ");

    form.reset();
    router.refresh();
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="text-black bg-white overflow-hidden">
        <DialogHeader className="">
          <DialogTitle className="text-center text-bold text-2xl">
            CUSTOMIZE server
          </DialogTitle>
          <DialogDescription className="text-zinc-600">
            ... bla bla bla ...
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubm)} className="space-y-8">
            <div className="space-y-8 px-6 ">
              <div className="flex justify-center items-center text-center">
                TODO : IMAGE URL
              </div>

              <div className="flex justify-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        disabled={false}
                        placeholder="enter server name"
                        className=" focus-visible:ring-0 bg-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <DialogFooter>
              <Button variant="primary" type="submit" disabled={false}>
                CREATE
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
