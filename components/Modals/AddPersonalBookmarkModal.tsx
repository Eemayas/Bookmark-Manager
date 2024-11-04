"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon, PlusIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import {
  showAddWebsiteModal,
  showDeleteModal,
  showStatusModal,
} from "@/components/Modals/store/modalReducer";
import {
  createPersonalWebsite,
  deletePersonalWebsite,
  updatePersonalWebsite,
} from "@/app/(home)/slices/personalWebsiteSlices";
import { AddIcon } from "../social-icons/icons";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { InputField, TextAreaField } from "../CustomsInputs";

export default function AddPersonalBookmarkModal() {
  const personalWebsiteState = useSelector(
    (state: RootState) => state.personalWebsite,
  );
  const addWebsiteModalState = useSelector(
    (state: RootState) => state.modalState.addWebsiteModal,
  );

  const closeAddWebsiteModal = () => {
    store.dispatch(
      showAddWebsiteModal({
        isShow: false,
        section: "Personal_Website",
      }),
    );
  };

  const { user } = useUser();
  const { _id, description, folder_path, link, name, tags } =
    addWebsiteModalState.data;
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    link: "",
    tags: "",
    folder_path: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    if (!user) {
      console.error("User not found");
      store.dispatch(
        showStatusModal({
          status: "error",
          isShow: true,
          title: "Error",
          description: "User not found",
        }),
      );
      return;
    }
    if (!addWebsiteModalState.isEdit) {
      store.dispatch(
        createPersonalWebsite({
          name: formData.name,
          url: formData.link,
          tags: formData.tags.split(","), // Split tags by comma
          categories: formData.folder_path,
          email_address: user?.nickname || "",
        }),
      );
    } else {
      store.dispatch(
        updatePersonalWebsite({
          _id: formData._id,
          name: formData.name,
          url: formData.link,
          tags: formData.tags.split(","),
          categories: formData.folder_path,
          description: formData.description,
          email_address: user?.nickname || "",
        }),
      );
    }

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
      closeAddWebsiteModal();
    }

    console.log({ personalWebsiteState });
  };

  useEffect(() => {
    if (addWebsiteModalState.isEdit) {
      setFormData({
        _id,
        name,
        link,
        tags: tags.join(","),
        folder_path,
        description,
      });
    }
  }, [addWebsiteModalState]);

  return (
    <Dialog
      open={addWebsiteModalState.isShow}
      onClose={() => closeAddWebsiteModal()}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-[#24233b] px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:pb-4 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <DialogTitle
              as="h2"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              <div className="flex flex-row items-center gap-5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                  <PlusIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-green-600"
                  />
                </div>{" "}
                {addWebsiteModalState.isEdit ? "Edit" : "Add New"}{" "}
                {addWebsiteModalState.section === "Personal_Website"
                  ? "Personal Bookmark"
                  : "Popular Bookmark"}
              </div>
            </DialogTitle>

            <form className="mt-4" onSubmit={handleFormSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  name="name"
                  placeholder="Type product name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Link"
                  name="link"
                  placeholder="Type product link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Tags"
                  name="tags"
                  placeholder="Type product tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Folder Path"
                  name="folder_path"
                  placeholder="Type folder path"
                  value={formData.folder_path}
                  onChange={handleInputChange}
                />
                <TextAreaField
                  label="Product Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-sm bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:hover:bg-blue-800 sm:ml-3 sm:w-auto"
                >
                  {addWebsiteModalState.isEdit ? "Edit" : "Add new"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => closeAddWebsiteModal()}
                  className="mt-3 inline-flex w-full justify-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
