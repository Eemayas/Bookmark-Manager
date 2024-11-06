"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import {
  showDeleteModal,
  showStatusModal,
} from "@/components/Modals/store/modalReducer";
import { deletePersonalWebsite } from "@/app/(home)/slices/personalWebsiteSlices";
import { deletePopularLink } from "@/app/popular/store/popularLinksSlice";
import { useEffect } from "react";

export default function DeleteModal() {
  const deletemodalState = useSelector(
    (state: RootState) => state.modalState.deletemodal,
  );
  const personalWebsiteState = useSelector(
    (state: RootState) => state.personalWebsite,
  );
  const addWebsiteModalState = useSelector(
    (state: RootState) => state.modalState.addWebsiteModal,
  );
  const popularLinkState = useSelector(
    (state: RootState) => state.popularLinks,
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
    if (deletemodalState.section === "Personal_Website") {
      store.dispatch(deletePersonalWebsite(deletemodalState._id));
    }

    if (deletemodalState.section === "Popular_Links") {
      store.dispatch(
        deletePopularLink({
          category: addWebsiteModalState.category,
          _id: deletemodalState._id,
        }),
      );
    }
  };

  useEffect(() => {
    if (personalWebsiteState.error) {
      store.dispatch(
        showStatusModal({
          status: "error",
          isShow: true,
          title: "Error",
          description: personalWebsiteState.error,
        }),
      );
    }

    if (personalWebsiteState.successMessage) {
      store.dispatch(
        showStatusModal({
          status: "success",
          isShow: true,
          title: "Success",
          description: personalWebsiteState.successMessage,
        }),
      );
      closeDeleteModal();
    }
    if (popularLinkState.error) {
      store.dispatch(
        showStatusModal({
          status: "error",
          isShow: true,
          title: "Error",
          description: popularLinkState.error,
        }),
      );
    }

    if (popularLinkState.successMessage) {
      store.dispatch(
        showStatusModal({
          status: "success",
          isShow: true,
          title: "Success",
          description: popularLinkState.successMessage,
        }),
      );
      closeDeleteModal();
    }
  }, [personalWebsiteState, popularLinkState]);

  return (
    <Dialog
      open={deletemodalState.isShow}
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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Delete Website
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this website? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleDeleteClicked()}
                className="inline-flex w-full justify-center rounded-sm bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => closeDeleteModal()}
                className="mt-3 inline-flex w-full justify-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
