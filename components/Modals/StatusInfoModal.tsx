"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { showStatusModal } from "@/components/Modals/store/modalReducer";
import { clearPersonalWebisteMessages } from "@/app/(home)/slices/personalWebsiteSlices";
import { clearPeronalLinksMessages } from "@/app/popular/store/popularLinksSlice";

export default function StatusInfoModal() {
  const statusModalState = useSelector(
    (state: RootState) => state.modalState.statusModal,
  );

  const closeStatusInfoModal = () => {
    store.dispatch(
      showStatusModal({
        isShow: false,
        status: "success",
        title: "Success",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, consequatur.",
      }),
    );
    store.dispatch(clearPersonalWebisteMessages());
    store.dispatch(clearPeronalLinksMessages());
  };

  return (
    <Dialog
      open={statusModalState.isShow}
      onClose={() => closeStatusInfoModal()}
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
            className="relative transform overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5">
              {statusModalState.status === "success" ? (
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <CheckCircledIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
              ) : (
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
              )}
              <div className="mt-3 text-center">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {statusModalState.title}
                </DialogTitle>

                <p className="mt-2 text-sm text-gray-500">
                  {statusModalState.description}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => closeStatusInfoModal()}
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
