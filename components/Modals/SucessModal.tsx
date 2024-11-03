"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckCircledIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { showDeleteModal } from "@/store/slices/modalReducer";
import { deletePersonalWebsite } from "@/app/(home)/slices/personalWebsiteSlices";

export default function SucessModal() {
  const deletemodalState = useSelector(
    (state: RootState) => state.modalState.deletemodal,
  );

  const closeDeleteModal = () => {
    store.dispatch(
      showDeleteModal({
        isShow: false,
        _id: "",
        section: "Personal_Website",
      }),
    );
  };
  const handleDeleteClicked = () => {
    store.dispatch(deletePersonalWebsite(deletemodalState._id));
    closeDeleteModal();
  };

  return (
    <Dialog
      open={true}
      onClose={() => closeDeleteModal()}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in p-5 sm:my-8 sm:w-full sm:max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <CheckCircledIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-green-600"
                />
              </div>
              <div className="mt-3 text-center">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Payment Sucessfull
                </DialogTitle>

                <p className="mt-2 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur amet labore.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => closeDeleteModal()}
                className="mt-3 inline-flex w-full justify-center rounded-sm bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0"
              >
                Go back
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
